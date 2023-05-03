import React from 'react';
import './CreatorPage.css';
import Navbar from '../components/NavbarC';
import DisplaySurveys from '../components/DisplaySurveys';

//import CardDisplay from '../compenents/CardDisplay';
function CreatorPage() {
  return (
    <div className="App">
      <Navbar />
      <DisplaySurveys></DisplaySurveys>
    </div>
  );
}

export default CreatorPage;