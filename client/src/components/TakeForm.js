import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './FormBuilder.css';

function TakeForm() {
    const [value, setValue] = useState('');
    const [formName, setFormName] = useState('');
    const [formDesc, setFormDesc] = useState('');
    const [prompts, setPrompts] = useState([]);
    const { user, isAuthenticated } = useAuth0();

    const handleChange = (event) => {
      setValue(event.target.value);
    }

    const handleResponse = (event, index) => {
        let temp_prompts = [...prompts]
        temp_prompts[index][2] = event.target.value
        setPrompts(temp_prompts)
        console.log(prompts)
    }

    const handleSubmitResponse = async (event) => {
        event.preventDefault();
        console.log('form')
        console.log(prompts)
        let email = ""
        let name = ""
        if (isAuthenticated) {
            email = user.email
            name = user.name
        }

        fetch('http://localhost:7000/formsubmit', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ prompts: JSON.stringify(prompts), code: value, responder: user.email, responder_name: user.name}),
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data)
        })

    }
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("value" + value)
        fetch('http://localhost:7000/formget', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ "code": value}),
        }).then(function (response) {
            return response.json()

        }).then(function (data) {
            console.log(eval(data[0].form))

            const data_cleaned = eval(data[0].form)
            const temp_prompts = []
            setFormName(data_cleaned[0].title)
            setFormDesc(data_cleaned[0].description)

            for (let i = 0; i < data_cleaned.length; i++) {
                temp_prompts.push([data_cleaned[i].prompt, data_cleaned[i].responses.split(","), ""])
            }

            setPrompts(temp_prompts)
            console.log(formName)
            console.log(formDesc)
            console.log(temp_prompts)
        })

    }

    return (
        <div className="form-builder">
            <form onSubmit={handleSubmit}>
            <label>
                Enter Code
                <input type="text" value={value} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>
            <p>---------</p>
            <form>
                <h1>{formName}</h1>
                <p>{formDesc}</p>
                <p>---------</p>
                {prompts.map((prompt, index) => {
                        return (
                            <div key={index} className="field">
                            <label>{prompt[0]}</label>
                            <input
                                name='response'
                                placeholder={prompt[1].toString()}
                                value={prompt[2]}
                                onChange={event => handleResponse(event, index)}
                            />
                            </div>
                        )
                })}
                <button onClick={handleSubmitResponse}>Submit Response</button>
            </form>
        </div>
    );

}

export default TakeForm;