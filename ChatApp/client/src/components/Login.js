import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [])
    
    const handleLogin = () => {
        console.log(email, password);
        axios.post("http://localhost:5000/login", {
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
            localStorage.setItem('user', JSON.stringify({ email, password }))
            navigate('/')
        }).catch(function (error) {
            console.error('Error occurred:', error);
            // Handle errors
        });

    }

    return (
        <div className="form">
            <h2>Registration</h2>
            <div className="form-body">
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
                <button type="submit" onClick={handleLogin} className="btn">Signin</button>
            </div>
        </div>
    )
}

export default Login;