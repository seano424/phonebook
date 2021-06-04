import React from 'react'

export default function Persons({ persons, filteredContent, deleteBtn }) {
    return (
        <>
            <h2>Numbers</h2>
            {persons.map(
                (person, idx) =>
                    person.name.toLowerCase().includes(filteredContent.toLowerCase()) && (
                        <div
                            key={idx}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '24em',
                                margin: '.4em 0',
                            }}
                        >
                            <div>
                                {person.name} {person.number}
                            </div>
                            <button
                                onClick={() => deleteBtn(person)}
                                style={{ marginLeft: '1em' }}
                            >
                                delete
                            </button>
                        </div>
                    )
            )}
        </>
    )
}
