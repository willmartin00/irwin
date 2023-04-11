const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://william:NA2mCsWr05Ae2x3q@cluster0.sfrvsdl.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db