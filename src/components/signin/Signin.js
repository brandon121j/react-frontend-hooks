import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import LoginEmailHooks from '../hooks/loginHooks/LoginEmailHooks';
import LoginPasswordHooks from '../hooks/loginHooks/LoginPasswordHooks';
import CheckToken from "../hooks/CheckToken";
import { toast } from "react-toastify";
import axios from "axios";
require('dotenv').config();

const { checkJwtToken } = CheckToken();

function SignIn({setUser}) {
    let navigate = useNavigate();

    const notifySuccess = () => toast.success('User successfully signed in!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const notifyFailed = (input) => toast.error(`${input}`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    
    const [email, emailOnChangeHandler, emailError, setEmailOnFocus, setEmailOnBlur] = LoginEmailHooks()
    const [password, passwordOnChangeHandler, passwordError, setPasswordOnFocus, setPasswordOnBlur] = LoginPasswordHooks()

    useEffect(() => {
        if (checkJwtToken()) {
            navigate('/')
        }
    }, [])

    async function handleOnSubmit(e) {
        e.preventDefault()
        try {
            let payload = await axios.post("http://localhost:3001/users/login",{
                email,
                password
            });

            console.log(payload)

            let decodedToken = jwt.verify(payload.data.token, process.env.REACT_APP_JWT_SECRET);

            setUser({
                email: decodedToken.email,
                username: decodedToken.username,
                userID: decodedToken.userID
            });

            localStorage.setItem('loginToken', payload.data.token)

            notifySuccess();
            navigate('/');

            
        }catch(e){
            console.log(e)
            notifyFailed('Invalid login')
        
        }
    }

    return (
        <div className="signinContainer">
            <div className="form-box">
                <form onSubmit={handleOnSubmit}>
                    <h1>Please sign In</h1>
                    <div className="form-signin">
                        <input
                        name={email} 
                        onChange={emailOnChangeHandler}
                        onFocus={()=> setEmailOnFocus(true)} 
                        onBlur={()=> setEmailOnBlur(true)}
                        type="email"
                        placeholder="email"
                        />
                    </div>

                    <div className="form-signin">
                        <input
                        type="password"
                        name={password} 
                        onChange={passwordOnChangeHandler}
                        onFocus={()=> setPasswordOnFocus(true)} 
                        onBlur={()=> setPasswordOnBlur(true)}
                        placeholder="Password"
                        />
                    </div>
            
                    <button style={{ 'padding': '10px', 'cursor': 'pointer' }} type="submit" >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignIn