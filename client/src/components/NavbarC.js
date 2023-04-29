import React from 'react';
import './NavbarC.css';
import { Link } from 'react-router-dom';
import LogoutButton from './logout';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="buttons-left">
        
        <Link to="/taker"><button className='bar-btn' >Switch to Taker</button></Link>
        <Link to="/survey"><button className='bar-btn'>Create Survey</button></Link>
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