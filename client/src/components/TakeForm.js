import React, { useState } from 'react';

function TakeForm() {
    const [value, setValue] = useState('');
  
    const handleChange = (event) => {
      setValue(event.target.value);
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(value)
        fetch('http://localhost:7000/formget', {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ "code": value}),
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data)
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
        </div>
    );
}

export default TakeForm;