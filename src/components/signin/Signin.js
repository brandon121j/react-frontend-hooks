import React from 'react';
import { toast } from 'react-toastify';

import axios from 'axios';

import EmailHooks from '../hooks/EmailHooks';
import PasswordHooks from '../hooks/PasswordHooks';


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
		setEmailOnFocus,
		setEmailOnBlur,
	] = EmailHooks();
	const [
		password,
		handlePasswordOnChange,
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
                <div>
                    <button type='submit'>
                        Sign in
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Signin;