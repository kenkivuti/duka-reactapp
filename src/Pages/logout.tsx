import React from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/dashboard.css'

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // Clearing the local storage
        localStorage.removeItem('Token');
        localStorage.removeItem('isLoggedIn');

        // Navigating to the login page after clearing the local storage
        navigate("/login");
    };
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;