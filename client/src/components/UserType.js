import React from 'react';
import './UserType.css';
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, Link } from "react-router-dom";

function HomePage() {
  const { isAuthenticated, user, isLoading } = useAuth0()

  
    if (isLoading) {
      return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
      return (
    <div className="user-type">
      <p>I am a...</p>
          <div className="button-group">
            <Link to="/creator"><button className="surveyor-button">Surveyor</button></Link>
            <Link to="/taker"><button className="taker-button">Taker</button></Link>
        </div>
      
      
      <main>
       
      </main>
      
    </div>
      );
}}
        
export default HomePage;