import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import './UserType.css';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <button className="surveyor-button" onClick={() => logout({ logoutParams: { returnTo: "http://localhost:3000/" } })}>
                Log Out
            </button>
        )
    );
};

export default LogoutButton;
