import React, { useState } from 'react';

function useForm() {
    const [fields, setFields] = useState([{prompt: ''}])

    return [fields, setFields]
}

function FormBuilder() {
    const [fields, setFields] = useForm()

    const handleChange = (event, index) => {
        let form = [...fields]
        form[index][event.target.name] = event.target.value
        setFields(form)
    }

    const submit = (event) => {
        event.preventDefault()
        console.log(fields)
    }

    const addFields = () => {
        let field = {prompt: ''}

        setFields([...fields, field])
    }

    const removeFields = (index) => {
        let form = [...fields]
        form.splice(index, 1)
        setFields(form)
    }

    return (
        <div>
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

export default FormBuilder;
