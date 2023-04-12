import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Axios from 'axios';
const md5 = require('md5');

function useForm() {
    const [fields, setFields] = useState([{prompt: '', responses: ''}])
    
    return [fields, setFields]
}

async function axios_insert(name, form) {
    const response = await Axios.post('http://localhost:7000/insert', {
        name: name,
        form: JSON.stringify(form)
    })

    return response.data
}

function FormBuilder() {
    const { isAuthenticated, user, isLoading } = useAuth0()
    const [fields, setFields] = useForm()

    const handleChange = (event, index) => {
        let form = [...fields]
        form[index][event.target.name] = event.target.value
        setFields(form)
    }

    let submit = async (event) => {
        event.preventDefault()
        // Axios.post('http://localhost:7000/insert', {
        //     name: user.name,
        //     form: JSON.stringify(fields)
        // }).then(function (response) {
        //     console.log(response);
        // })

        // const test = await sendForm(user.name, fields)

        // console.log(test)

        // const response = await Axios.post('http://localhost:7000/insert', {
        //     name: user.name,
        //     form: JSON.stringify(fields)
        // })

        // console.log(response.data)

        const md5_hash = md5(JSON.stringify(Date.now()), user.email)

        fetch('http://localhost:7000/insert', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ "name": user.email, "form": JSON.stringify(fields), "code": md5_hash}),
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data)
        })

        console.log(md5_hash)
    }

    const addFields = () => {
        let field = {prompt: '', responses: ''}
        setFields([...fields, field])
    }

    const removeFields = (index) => {
        let form = [...fields]
        form.splice(index, 1)
        setFields(form)
    }

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (isAuthenticated) {
        return (
            <div>
                <p>Form Builder</p>
                <form onSubmit={submit}>
                    {fields.map((form, index) => {
                        return (
                            <div key={index}>
                                <input
                                    name='prompt'
                                    placeholder='Prompt'
                                    onChange={event => handleChange(event, index)}
                                    value={form.prompt}
                                />
                                <input
                                    name='responses'
                                    placeholder='Responses (separate with commas, leave blank for open-ended)'
                                    onChange={event => handleChange(event, index)}
                                    value={form.responses}
                                    style={{width: '100%'}}
                                />
                                <button onClick={() => removeFields(index)}>Remove field</button>
                            </div>
                        )
                    })}
                </form>
                <button onClick={addFields}>New field</button>
                <br></br>
                <button onClick={submit}>Submit</button>
            </div>
        )
    }
}

export default FormBuilder;
