const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('../models/person')

app.use(cors())
app.use(express.json())
app.use(morgan('postFormat'))
app.use(express.static('build'))

morgan.token('post', (request) => {
    if (request.method === 'POST') return JSON.stringify(request.body)
    else return ''
})

morgan.format(
    'postFormat',
    ':method :url :status :res[content-length] - :response-time ms :post'
)

let persons = [
    {
        name: 'Bobby Poppendieck',
        number: '39-23-6423122',
        id: 4,
    },
    {
        name: 'jojo',
        number: '13413',
        date: '2021-06-03T14:37:31.242Z',
        id: 10,
    },
    {
        name: 'Roberto',
        number: '13413',
        date: '2021-06-03T14:39:47.507Z',
        id: 11,
    },
    {
        name: 'Lea',
        number: '134134123',
        date: '2021-06-03T14:40:19.280Z',
        id: 12,
    },
    {
        name: 'Julia',
        number: '43013241',
        date: '2021-06-03T14:44:07.324Z',
        id: 13,
    },
]

app.get('/info', (request, response) => {
    response.send(
        `<div><p>Phonebook has info about ${
            persons.length
        } people</p><p>${new Date().toString()}</p></div>`
    )
})

// app.get('/api/persons', (request, response) => {
//   response.json(persons);
// });

app.get('/api/persons', (request, response) => {
    Person.find({}).then((person) => {
        response.json(person)
    })
})

// app.get('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id);
//   const person = persons.find((person) => person.id === id);

//   if (person) {
//     response.json(person);
//   } else {
//     response.status(404).end();
//   }
// });

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then((person) => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch((error) => next(error))
})

// app.delete('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter((person) => person.id !== id);

//   response.status(204).end();
// });

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then((result) => {
            response.status(204).end()
        })
        .catch((error) => next(error))
})

const generateId = () => {
    return Math.floor(Math.random() * 10 ** 3)
};

// app.post('/api/persons', (request, response) => {
//   const body = request.body;
//   const names = persons.map((person) => person.name);
//   if (!body.name || !body.number) {
//     return response.status(400).json({
//       error: 'name or number missing',
//     });
//   } else if (names.includes(body.name)) {
//     return response.status(400).json({
//       error: 'name already exists in phonebook',
//     });
//   }

//   const person = {
//     name: body.name,
//     number: body.number,
//     id: generateId(),
//     date: new Date(),
//   };
//   persons = persons.concat(person);
//   response.json(person);
// });

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId(),
    })

    person
        .save()
        .then((savedPerson) => {
            res.json(savedPerson.toJSON())
        })
        .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const note = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, note, { new: true })
        .then((updatedPerson) => {
            response.json(updatedPerson)
        })
        .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
