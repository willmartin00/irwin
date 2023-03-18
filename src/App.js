import './App.css';
import LoginButton from './components/login';
import LogoutButton from './components/logout';
import Profile from './components/profile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={"irwin-logo.png"} className="App-logo" alt="logo" />
        <div>
          <LoginButton>Login</LoginButton>
          <LogoutButton>Logout</LogoutButton>
        </div>
        <br></br>
        <div>
          <Profile>Profile</Profile>
        </div>
      </header>
    </div>
  );
}

export default App;
