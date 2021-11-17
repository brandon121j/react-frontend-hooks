import React, { useEffect } from "react";
import {useNavigate} from'react-router-dom'
import jwt from 'jsonwebtoken'

import LoginEmailHooks from '../hooks/loginHooks/LoginEmailHooks';
import LoginPasswordHooks from '../hooks/loginHooks/LoginPasswordHooks';

import CheckToken from "../hooks/CheckToken";

import { toast } from "react-toastify";
import axios from "axios";

const { checkJwtToken } = CheckToken();

require('dotenv').config();

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

    useEffect(() => {
        if (checkJwtToken()) {
            navigate('/')
        }
    }, [])
    
    const [email, emailOnChangeHandler, emailError, setEmailOnFocus, setEmailOnBlur] = LoginEmailHooks()
    const [password, passwordOnChangeHandler, passwordError, setPasswordOnFocus, setPasswordOnBlur] = LoginPasswordHooks()

    async function handleOnSubmit(e) {
        e.preventDefault()
        try {
            let payload = await axios.post("http://localhost:3001/users/login",{
                email,
                password
            });

            let decodedToken = jwt.verify(payload.data.token, process.env.REACT_APP_JWT_SECRET);

            setUser({
                email: decodedToken.email,
                username: decodedToken.username,
                userID: decodedToken.id
            });

            localStorage.setItem('loginToken', payload.data.token)

            notifySuccess();
            navigate('/');

            
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className="form-div-signin">
            <main className="form-signin">
                <form onSubmit={handleOnSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign In</h1>
                    <div className="form-floating">
                        <input
                        style={{border : `1px solid ${emailError.length === 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${emailError.length === 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                        name={email} 
                        onChange={emailOnChangeHandler}
                        onFocus={()=> setEmailOnFocus(true)} 
                        onBlur={()=> setEmailOnBlur(true)}
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="email@example.com"
                        />
                        <label htmlFor="floatingInput">{email.length === 0 ? <span style={{color : 'red'}}>Please enter your email</span> : ("Email")}</label>
                    </div>

                    <div className="form-floating">
                        <input
                        style={{border : `1px solid ${passwordError.length === 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${passwordError.length === 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                        type="password"
                        name={password} 
                        onChange={passwordOnChangeHandler}
                        onFocus={()=> setPasswordOnFocus(true)} 
                        onBlur={()=> setPasswordOnBlur(true)}
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        />
                        <label htmlFor="floatingInput">{password.length === 0 ? <span style={{color : 'red'}}>Please enter your password</span>  : ("Password")}</label>
                    </div>
            
                    <button className="w-100 btn btn-lg btn-primary" type="submit">
                        Sign In
                    </button>
                </form>
            </main>
        </div>
    );
}

export default SignIn