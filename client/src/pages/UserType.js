import React from 'react';
import './UserType.css';
import { useAuth0 } from "@auth0/auth0-react";
import Axios from 'axios';
const md5 = require('md5');

function HomePage() {
  const { isAuthenticated, user, isLoading } = useAuth0()
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
    if (isLoading) {
      return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
      return (
    <div className="user-type">
      <p>I am a...</p>
      <form onSubmit={submit}>
        return(
           <div className="button-group">
          <button className="surveyor-button">Surveyor</button>
          <button className="taker-button">Taker</button>
        </div>
      )
      </form>
      <main>
       
      </main>
      
    </div>
  );
}}
        }
export default HomePage;