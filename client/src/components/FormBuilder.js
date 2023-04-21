import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Axios from 'axios';
import './FormBuilder.css';
const md5 = require('md5');

function useForm() {
    const [fields, setFields] = useState([{prompt: '', responses: ''}])
    return [fields, setFields]
}

async function axios_insert(name, form) {
    const formData = new FormData();
  
    formData.append('name', name);
    formData.append('form', JSON.stringify(form));
  
    for (let i = 0; i < form.length; i++) {
      if (form[i].image) {
        formData.append(`image${i}`, dataURItoBlob(form[i].image));
      }
    }
  
    const response = await Axios.post('http://localhost:7000/insert', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  
    return response.data;
  }
  
  function dataURItoBlob(dataURI) {
    // Convert data URI to blob
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
  
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([ab], { type: mimeString });
  }

function FormBuilder() {
    const { isAuthenticated, user, isLoading } = useAuth0()
    const [fields, setFields] = useForm()
    const [fieldsDesc, setFieldsDesc] =useForm()

    const handleChange = (event, index) => {
        let form = [...fields]
        form[index][event.target.name] = event.target.value
        setFields(form)
        
    }
    function convertToBase64(e, index) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const form = [...fields];
          form[index].image = reader.result;
          setFields(form);
        };
        reader.onerror = (error) => {
          console.log("error: ", error);
          
        };
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
            body: JSON.stringify({ "name": user.email,"formDesc":JSON.stringify(fieldsDesc), "form": JSON.stringify(fields), "code": md5_hash}),
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
            <div className="form-builder">
  <p>Form Builder</p>
  <form onSubmit={submit}>
  {fieldsDesc.map((form,index) => {
      return (
                    <div className = "test" >
                        <label>Title</label>
                        <input name = 'title'
                        placeholder='Title'
                        onChange={event => handleChange(event, index)}
                        value={form.title}
                        />
                        <label>Image</label>
                        <input accept = "image/*"
                        type = "file"
                        onChange={(e) => convertToBase64(e, index)}
                        value={form.image}
                        />
                        <label>Description</label>
                        <input name = 'description'
                        placeholder='Description'
                        onChange={event => handleChange(event, index)}
                        value={form.description}
                    />
                    </div>
      )})}
        </form>
  <form onSubmit={submit}>
    {fields.map((form, index) => {
      return (
        
        <div className="field" key={index}>
          <label>Prompt</label>
          <input
            name='prompt'
            placeholder='Prompt'
            onChange={event => handleChange(event, index)}
            value={form.prompt}
          />
          <label>Responses (separate with commas, leave blank for open-ended)</label>
          <textarea
            name='responses'
            placeholder='Responses'
            onChange={event => handleChange(event, index)}
            value={form.responses}
            rows={3}
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
