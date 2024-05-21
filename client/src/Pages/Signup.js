import '../App.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext.js';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    function handleChange(e) {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        }
        if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    async function handleClick() {
        try {
            const result = await axios.post(
                `/auth/signup`,
                { email: email, password: password }
            );

            if (result.data.success) {
                // alert(result.data.message);
                setAuth({ ...auth, user: result.data.result.email, token: result.data.result.token });
                localStorage.setItem("user", JSON.stringify({ user: result.data.result.email, token: result.data.result.token }))
                navigate('/');
            }
            else {
                alert(result.data.error);
            }
        }
        catch (err) {
            alert("Browser Error");
        }
    }

    return (
        <div className='signup-form'>
            <input
                name='email'
                type='email'
                placeholder='Enter your email'
                onChange={handleChange}
                value={email}
                className='signup-input'
            />

            <input
                name='password'
                type='text'
                placeholder='Enter you password'
                onChange={handleChange}
                value={password}
                className='signup-input'
            />

            <button className='signup-btn' onClick={handleClick}>Signup</button>

            Already a user? <Link to='/login'>Login</Link>
        </div>
    )
}

export default Signup;