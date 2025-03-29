import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom'

function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            // navigate('/')
        }
    }, [])

    const collectData = async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Log the values to console
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Password:", password);

        // Make axios POST request
        axios.post("http://localhost:5000/register", {
            name: name,
            email: email,
            password: password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            console.log("Response from server:", response.data);
            // Handle response as needed
            // if(response.data){
            //     navigate('/')
            // }
            localStorage.setItem('user', JSON.stringify({ name, email, password }))
            
            // navigate('/')

        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Server responded with an error:', error.response.status);
                console.error('Error data:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from server:', error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error setting up the request:', error.message);
            }
            // Handle errors (e.g., show error message to user)
        });
        
    }
    return (
        <div className="form">
            <h2>Registration</h2>
            <div className="form-body">
                <div className="username">
                    <label className="form__label" for="firstName">First Name </label>
                    <input className="form__input" onChange={(e) => setName(e.target.value)} type="text" id="firstName" placeholder="First Name" />
                </div>

                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="form__input" placeholder="Email" />
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="Password" />
                </div>

            </div>
            <div className="btn">
                <button type="submit" onClick={collectData} className="btn">Register</button>
            </div>
        </div>
    )
}
export default Signup;