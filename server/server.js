const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Form = require('./dataSchema.js')
const MongoClient = require('mongodb').MongoClient;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://william:NA2mCsWr05Ae2x3q@cluster0.sfrvsdl.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

const formResponseSchema = new mongoose.Schema({
    prompts: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    responder: {
        type: String,
        required: false
    },
    responder_name: {
        type: String,
        required: false
    },
});

const formResponse = mongoose.model('formResponse', formResponseSchema);

async function sendForm(form) {
    await form.save().then(formRes => {
        console.log("formRes")
        console.log(formRes)
        return formRes
    })
}

const client = new MongoClient("mongodb+srv://william:NA2mCsWr05Ae2x3q@cluster0.sfrvsdl.mongodb.net/?retryWrites=true&w=majority", { useUnifiedTopology: true });

app.post('/formget', async(req, res) => {
    const code = req.body.code
    console.log(code)

    const data = await client.db().collection('forms').find({code: code}).toArray();
    res.send(data)

});

app.post('/formresponses', async(req, res) => {
    const email = req.body.email

    const data = await client.db().collection('forms').find({name: email}).toArray();

    res.send(data)
});

app.post('/dlresponses', async(req, res) => {
    const code = req.body.code

    const data = await client.db().collection('formresponses').find({code: code}).toArray();

    res.send(data)
});


app.post('/formsubmit', async(req, res) => {
    console.log(req.body)

    const resp = new formResponse({
        prompts: req.body.prompts,
        code: req.body.code,
        responder: req.body.responder,
        responder_name: req.body.responder_name
    })

    console.log(resp)

    try {
        const respRes = await resp.save()
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });
        console.log('test')
        console.log(respRes)
        res.send(respRes)
    }
    catch(err) {
        console.log(err)
    }

});

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