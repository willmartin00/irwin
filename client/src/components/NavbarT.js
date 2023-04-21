import React from 'react';
import './NavbarT.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="buttons-left">
        <button className='bar-btn'>Switch to Surveyor</button>
       
      </div>
      <div className="logo">
        <img src={"irwin-logo.png"} alt="logo" />
      </div>
      <div className="buttons-right">
        <button className='bar-btn'>Account</button>
        <button className='bar-btn'>Log Out</button>
      </div>
    </nav>
  );
}

export default Navbar;