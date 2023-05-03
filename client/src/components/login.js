import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import './UserType.css';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return <button className="surveyor-button" onClick={() => loginWithRedirect()}>Log In</button>;
    }
};

export default LoginButton;
