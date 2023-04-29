import React from 'react';
import './NavbarT.css';
import { Link } from 'react-router-dom';
import LogoutButton from './logout';

//<button className='bar-btn'>Log Out</button>

function Navbar() {
  return (
    <nav className="navbar">
      <div className="buttons-left">
        <Link to="/creator"><button className='bar-btn'>Switch to Surveyor</button></Link>
      </div>
      <div className="logo">
        <img src={"irwin-logo.png"} alt="logo" />
      </div>
      <div className="buttons-right">
        <Link to="/"><button className='bar-btn'>Account</button></Link>
        <LogoutButton></LogoutButton>
      </div>
    </nav>
  );
}

export default Navbar;