import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import CheckToken from '../hooks/CheckToken';
import axios from 'axios';

import EmailHooks from '../hooks/EmailHooks';
import PasswordHooks from '../hooks/PasswordHooks';

require('dotenv').config();

function Signin() {
	const success = () =>

		toast.success('Login Success', {
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

	const [
		email,
		handleEmailOnChange,
		emailError,
		setEmailOnFocus,
		setEmailOnBlur,
	] = EmailHooks();
	const [
		password,
		handlePasswordOnChange,
		passwordError,
		setPasswordOnFocus,
		setPasswordOnBlur,
	] = PasswordHooks();

	async function onSubmitHandler(e) {
		e.preventDefault();
		try {
			let payload = await axios.post('http://localhost:3001/users/login', {
				email,
				password,
			});

			success();
		} catch (e) {
			toast.error(e.response.data.error, {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	}

    return (
        <div>
            <div>
                <h1>Sign in</h1>
                <form onChange={onSubmitHandler}>
                <div>
                    <label>Email</label>
                    <input 
                        name={email}
                        onChange={handleEmailOnChange}
                        onFocus={()=> setEmailOnFocus(true)} 
                        onBlur={()=> setEmailOnBlur(true)}
                        type='email'
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        name={password}
                        onChange={handlePasswordOnChange}
                        onFocus={()=> setPasswordOnFocus(true)} 
                        onBlur={()=> setPasswordOnBlur(true)}
                        type='password'
                    />
                </div>
                </form>
            </div>
        </div>
    )
}
