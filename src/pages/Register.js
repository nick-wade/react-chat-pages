import axios from "axios";
import Navbar from "../components/Navbar";
import '../css/Login.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [emptyFieldsError, setEmptyFieldsError] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Check for empty fields
        if (!username || !password) {
            setEmptyFieldsError(true);
            return;
        }
        
        try {
            setUsernameError(false);
            setEmptyFieldsError(false);

            const response = await axios.post('http://localhost:8080/Register', {
                username: username,
                password: password
            });

            console.log('Response:', response.data);
            navigate('/Login')
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data === 'Username already taken') {
                setUsernameError(true);

                // Clear the input fields by resetting state
                setUsername('');
                setPassword('');
            } else {
                console.error('Error during registration:', error.response ? error.response.data : error.message);
            }
        }
    };

    return (
        <div className="register-container">
            <Navbar />
            <div className='text-box'>
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <input 
                        type='text' 
                        placeholder={
                            (emptyFieldsError && !username) ? 'Username required':
                            (usernameError ? 'Username already taken' : 'Username')}
                        className='input' 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            borderColor: (emptyFieldsError && !username) || usernameError ? 'red' : '',
                        }}
                    />
                    <input 
                        type="password" 
                        placeholder={emptyFieldsError && !password ? 'Password required' : 'Password'}
                        className="input" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            borderColor: emptyFieldsError && !password ? 'red' : '' || usernameError ? 'red' : '',
                        }}
                    />
                    <button type="submit" className="button">Create Account</button>
                </form>
                <h4>Or</h4>
                <button type='submit' className='button small' onClick={handleRegister}>Login</button>
            </div>
        </div>
    );
}

export default Register;
