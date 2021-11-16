import React, { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FirstNameHooks from '../hooks/FirstNameHooks';
import LastNameHooks from '../hooks/LastNameHooks';
import UsernameHooks from '../hooks/UsernameHooks';
import PasswordHooks from '../hooks/PasswordHooks';
import EmailHooks from '../hooks/EmailHooks';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'

function Signup() {
	const [
		firstName,
		handleFirstNameOnChange,
		firstNameError,
		setFirstNameOnFocus,
		setFirstNameOnBlur,
	] = FirstNameHooks();
	
	const [
		lastName,
		handleLastNameOnChange,
		lastNameError,
		setOnFocus,
		setOnBlur,
	] = LastNameHooks();

	const [
		password,
		handlePasswordOnChange,
		passwordError,
		setPasswordOnFocus,
		setPasswordOnBlur,
	] = PasswordHooks();

	const [
		email,
		handleEmailOnChange,
		emailError,
		setEmailOnFocus,
		setEmailOnBlur,
	] = EmailHooks();

	const [
		username,
		handleUsernameOnChange,
		usernameError,
		setUsernameOnFocus,
		setUsernameOnBlur,
	] = UsernameHooks();

	const navigate = useNavigate();

    useEffect(() => {
		let jwtToken = window.localStorage.getItem('jwtToken');

		if (jwtToken) {
			let decodedToken = jwtDecode(jwtToken);

			const currentTime = Date.now() / 1000;

			if (decodedToken.exp < currentTime) {
                window.localStorage.removeItem('jwtToken');
			} else {
                navigate('/')
			}
		}
	}, [])

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			let payload = await axios.post(
				'http://localhost:3001/users/create-user',
				{
					firstName,
					lastName,
					username,
					email,
					password,
				}
			);
			console.log(payload);

			toast.success('Congrats~! now you please sign in', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (e) {
			console.log(e.response.data.error);
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
	};
	return (
		<div className="signUpContainer">
			<form onSubmit={onSubmitHandler}>
				<input
					name={firstName}
					onChange={handleFirstNameOnChange}
					onFocus={() => setFirstNameOnFocus(true)}
					onBlur={() => setFirstNameOnBlur(true)}
					placeholder="First name"
				/>
				<div>{firstNameError && firstNameError}</div>
				<input
					name={lastName}
					onChange={handleLastNameOnChange}
					onFocus={() => setOnFocus(true)}
					onBlur={() => setOnBlur(true)}
					placeholder="Last name"
				/>
				<div>{lastNameError && lastNameError}</div>
				<input
					name={email}
					onChange={handleEmailOnChange}
					onFocus={() => setEmailOnFocus(true)}
					onBlur={() => setEmailOnBlur(true)}
					placeholder="Email"
				/>
				<div>{emailError && emailError}</div>
				<input
					name={username}
					onChange={handleUsernameOnChange}
					onFocus={() => setUsernameOnFocus(true)}
					onBlur={() => setUsernameOnBlur(true)}
					placeholder="Username"
				/>
				<div>{usernameError && usernameError}</div>
				<input
					name={password}
					onChange={handlePasswordOnChange}
					onFocus={() => setPasswordOnFocus(true)}
					onBlur={() => setPasswordOnBlur(true)}
					placeholder="Password"
				/>
				<div>{passwordError && passwordError}</div>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default Signup;