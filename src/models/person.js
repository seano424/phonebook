const uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()

const mongoose = require('mongoose')
// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI
console.log('Connecting to ', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Must be at least 3'],
    },
    number: {
        type: String,
        required: true,
        unique: true,
        minlength: [8, 'Must be at least 8'],
    },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Person', personSchema)
