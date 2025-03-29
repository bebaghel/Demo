import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic (e.g., clear localStorage, etc.)
        localStorage.removeItem('auth'); // Example: clear auth data
        // Redirect to login or homepage after logout
       navigate('/signup'); // Redirect to login page or any other route
    };

    return (
        <div>
            <h2>Logout Page</h2>
            <p>Are you sure you want to logout?</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
