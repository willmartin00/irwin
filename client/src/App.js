import './App.css';
import LoginButton from './components/login';
import LogoutButton from './components/logout';
import Profile from './components/profile';
//import UserType from './pages/UserType';
import FormBuilder from './components/FormBuilder';


function App() {
 
  return (
    <div className="App">
      
      <header className="App-header">
        <br></br>
        <LoginButton>Login</LoginButton>
        <LogoutButton>Logout</LogoutButton>
        <Profile>Profile</Profile>
        <br></br>
        <img src={"irwin-logo.png"} className="App-logo" alt="logo" />
        <br></br>
        <div>
        
       <FormBuilder></FormBuilder>
          
        </div>
        
        <br></br>
      </header>
    </div>
    
  );
}

export default App;
