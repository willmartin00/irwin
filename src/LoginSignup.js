import React, { useState } from 'react';
import './LoginSignup.css';
import logo from './Irwin-logo.png';


function LoginSignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // default to login mode

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin); // toggle between login and signup mode
  };

  const handleLogin = () => {
    // code for handling login
  };

  const handleSignup = () => {
    // code for handling signup
  };

  return (
    <div>
      <div>
      <img src={logo} alt="Logo" className="logo" />
    </div>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        {!isLogin && (
          <>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
          </>
        )}
        <button type="button" onClick={isLogin ? handleLogin : handleSignup}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <div className="toggle-mode">
          <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
          <button type="button" onClick={handleToggleMode}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginSignupPage;