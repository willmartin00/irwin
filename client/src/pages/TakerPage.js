import React from 'react';
import './TakerPage.css';
import NavbarT from '../components/NavbarT';
import TakeForm from '../components/TakeForm';
//import CardDisplay from '../compenents/CardDisplay';

function TakerPage() {
  return (
    <div className="App">
      <NavbarT />
      <div>
        <TakeForm />
      </div>
    </div>
  );
}

export default TakerPage;