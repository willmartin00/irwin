import React from 'react';
import './NavbarC.css';

function Navbar() {
  const path = window.location.pathname
  return (
    <nav className="navbar">
      <div className="buttons-left">
        <button className='bar-btn' >Switch to Taker</button>
        <button className='bar-btn'>Create Survey</button>
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