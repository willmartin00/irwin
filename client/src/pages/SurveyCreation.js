import React from 'react';
import './SurveyCreation.css';
import Navbar from '../components/NavbarC';
import FormBuilder from '../components/FormBuilder';

function CreatorPage() {
  return (
    <div className="App">
      <Navbar />
      <FormBuilder></FormBuilder>
    </div>
  );
}

export default CreatorPage;