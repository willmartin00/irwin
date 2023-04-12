const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    form: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

const Form = mongoose.model('Form', ReactFormDataSchema);
module.exports = Form;