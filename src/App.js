import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './controllers/persons'
import { mostLikes } from './utils/list_helper'

const blogs = [
    { title: 'blog 1', totalLikes: 2, author: 'Sean' },
    { title: 'blog 2', totalLikes: 6, author: 'John' },
    { title: 'blog 3', totalLikes: 12, author: 'Sean' },
    { title: 'blog 4', totalLikes: 23, author: 'John' },
    { title: 'blog 5', totalLikes: 27, author: 'Sean' },
]

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filteredContent, setFilteredContent] = useState('')
    const [notification, setNotification] = useState(false)
    const [notificationMsg, setNotificationMsg] = useState('hello')

    useEffect(() => {
        console.log(mostLikes(blogs))
        personService
            .getAll()
            .then((initialPersons) => setPersons(initialPersons))
    }, [])

    const addPerson = (evt) => {
        evt.preventDefault()
        const hasName = persons.map(
            (p) => p.name.toLowerCase() === newName.toLowerCase()
        )
        if (!hasName.includes(true)) {
            const personObject = {
                name: newName,
                number: newNumber,
                date: new Date().toISOString(),
            }
            personService.create(personObject).then((returnedPerson) => {
                if (typeof returnedPerson !== 'undefined') {
                    setPersons([...persons, personObject])
                    setNotification(true)
                    setNotificationMsg(`${personObject.name} has been added`)
                    setTimeout(() => {
                        setNotification(false)
                    }, 2000)
                } else {
                    setNotification(true)
                    setNotificationMsg('Person validation error')
                    setTimeout(() => {
                        setNotification(false)
                    }, 2000)
                }
            })

            setNewNumber('')
            setNewName('')
            setFilteredContent('')
        } else {
            if (
                window.confirm(
                    `${newName} is already added to the phonebook. Change the number with a new one?`
                )
            ) {
                const foundPerson = persons.find(
                    (person) =>
                        person.name.toLowerCase() === newName.toLowerCase()
                )
                const updatedPerson = { ...foundPerson, number: newNumber }
                personService
                    .update(foundPerson.id, updatedPerson)
                    .then((res) => {
                        setPersons(
                            persons.map((person) =>
                                person.id === res.id ? res : person
                            )
                        )
                        setNotification(true)
                        setNotificationMsg(
                            `The number for ${foundPerson.name} has been updated to ${newNumber}`
                        )
                        setTimeout(() => {
                            setNotification(false)
                        }, 2000)
                    })
                    .catch(() => {
                        setNotificationMsg(
                            `${foundPerson.name} was already removed from the phonebook`
                        )
                        setNotification(true)
                        setTimeout(() => {
                            setNotification(false)
                        }, 2000)
                    })

                setNewNumber('')
                setNewName('')
                setFilteredContent('')
            } else {
                console.log('not updating...')
            }
        }
    }

    const handleNameChange = (evt) => {
        setNewName(evt.target.value)
    }

    const handleNumberChange = (evt) => {
        setNewNumber(evt.target.value)
    }

    const handleFilteredContent = (evt) => {
        setFilteredContent(evt.target.value)
    }

    const handleDelete = (person) => {
        personService
            .destroy(person.id)
            .then(() => {
                setPersons(persons.filter((p) => p.id !== person.id))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const notificationStyles = {
        backgroundColor: 'aqua',
        color: 'black',
        padding: '1em',
        margin: '0 auto',
        textAlign: 'center',
    }

    return (
        <div>
            {notification && (
                <h1 style={notificationStyles}>{notificationMsg}</h1>
            )}
            <h2>Phonebook</h2>
            <Filter handleFilteredContent={handleFilteredContent} />
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />
            <Persons
                persons={persons}
                filteredContent={filteredContent}
                deleteBtn={handleDelete}
            />
        </div>
    )
}

export default App
