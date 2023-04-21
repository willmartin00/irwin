import React from 'react';
import './UserType.css';
import { useAuth0 } from "@auth0/auth0-react";



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
          <button className="surveyor-button">Surveyor</button>
          <button className="taker-button">Taker</button>
        </div>
      
      
      <main>
       
      </main>
      
    </div>
      );
}}
        
export default HomePage;