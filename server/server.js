const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Form = require('./dataSchema.js')

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://william:NA2mCsWr05Ae2x3q@cluster0.sfrvsdl.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

async function sendForm(form) {
    await form.save().then(formRes => {
        console.log("formRes")
        console.log(formRes)
        return formRes
    })
}

app.post('/insert', async(req, res) => {
    const name = req.body.name
    const formDesc = req.body.formDesc
    const image = req.body.image
    const form = req.body.form
    const code = req.body.code

    const formData = new Form({
        name: name,
        formDesc: formDesc,
        image: image,
        form: form,
        code: code
    })

    console.log(formData)

    try {
        const formRes = await sendForm(formData)
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });
        console.log('test')
        console.log(formRes)
        res.send(formRes)
    } catch(err) {
        console.log(err)
    }
});

const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});