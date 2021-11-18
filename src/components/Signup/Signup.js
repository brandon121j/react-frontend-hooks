import axios from "axios";
import { useEffect } from "react";
import {useNavigate} from'react-router-dom'

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import EmailHooks from "../hooks/EmailHooks";
import FirstNameHooks from "../hooks/FirstNameHooks";
import LastNameHooks from "../hooks/LastNameHooks";
import PasswordHooks from "../hooks/PasswordHooks";
import ConfirmPasswordHooks from "../hooks/ConfirmPasswordHooks";
import UsernameHooks from "../hooks/UsernameHooks";
import CheckToken from "../hooks/CheckToken";

const { checkJwtToken } = CheckToken()

// export const SignUp = () => {
function SignUp(){

    const notifySuccess = () => toast.success('User successfully created!', {
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

        let navigate = useNavigate()

        useEffect(() => {
            if (checkJwtToken()) {
                navigate('/')
            }
        }, [])

    const [firstName, handleFirstNameOnChange, firstNameError, setFirstNameOnFocus, setFirstNameOnBlur] = FirstNameHooks()
    const [lastName, handleLastNameOnChange, lastNameError, setOnFocus, setOnBlur] = LastNameHooks()
    const [password, handlePasswordOnChange, passwordError, setPasswordOnFocus, setPasswordOnBlur] = PasswordHooks()
    const [confirmPassword, handleConfirmPasswordOnChange, confirmPasswordError, setConfirmPasswordOnFocus, setConfirmPasswordOnBlur] = ConfirmPasswordHooks()
    const [username, handleUsernameOnChange, usernameError, setUsernameOnFocus, setUsernameOnBlur] = UsernameHooks()
    const [email, handleEmailOnChange, emailError, setEmailOnFocus, setEmailOnBlur] = EmailHooks()

    async function handleOnSubmit(e) {
        e.preventDefault()
        
        try {
            let payload = await axios.post("http://localhost:3001/users/create-user",
            {
                firstName,
                lastName,
                username,
                email,
                password,
                confirmPassword
            });
            console.log(payload);
            notifySuccess();
            navigate('/sign-in');
        }catch(e){
            let errors = []
            console.log(e.response);
            for (let iterator in e.response.data.error) {
                errors.push(e.response.data.error[iterator])
            }
            if (errors[0].length === 1) {
                notifyFailed(e.response.data.error)
            } else {
                errors.map((item) => {notifyFailed(item)})
            }
        }
    }

    return (
        <div className="signUpContainer">
            <div className="signUpBox">
                <form onSubmit={handleOnSubmit}>
                    <h1 className="signUpHeader">Please sign up</h1>
            
                    <div className="signUpBoxes" >
                        <input
                        style={{border : `1px solid ${firstNameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${firstNameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                        name={firstName} 
                        onChange={handleFirstNameOnChange}
                        onFocus={() => setFirstNameOnFocus(true)} 
                        onBlur={() => setFirstNameOnBlur(true) }
                        type="text"
                        placeholder="First name"
                        />
                    </div>

                    <div className="signUpBoxes">
                        <input
                        style={{border : `1px solid ${lastNameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${lastNameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                        name={lastName} 
                        onChange={handleLastNameOnChange}
                        onFocus={() => setOnFocus(true)} 
                        onBlur={() => setOnBlur(true) }
                        type="text"
                        placeholder="Last name"
                        />
                    </div>

                    <div className="signUpBoxes">
                        <input
                        style={{border : `1px solid ${usernameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${usernameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                        name={username} 
                        onChange={handleUsernameOnChange} 
                        onFocus={() => setUsernameOnFocus(true)} 
                        onBlur={() => setUsernameOnBlur(true)}
                        type="text"
                        placeholder="Username"
                        />
                    </div>
            
                    <div className="signUpBoxes">
                        <input
                        style={{border : `1px solid ${emailError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${emailError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                        name={email} 
                        onChange={handleEmailOnChange}
                        onFocus={()=> setEmailOnFocus(true)} 
                        onBlur={()=> setEmailOnBlur(true)}
                        type="email"
                        placeholder="Email"
                        />
                    </div>

                    <div className="signUpBoxes">
                        <input
                        style={{border : `1px solid ${passwordError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${passwordError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                        type="password"
                        name={password} 
                        onChange={handlePasswordOnChange}
                        onFocus={()=> setPasswordOnFocus(true)} 
                        onBlur={()=> setPasswordOnBlur(true)}
                        placeholder="Password"
                        />
                    </div>

                    
                    <div className="signUpBoxes">
                        <input
                        style={{border : `1px solid ${confirmPasswordError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${confirmPasswordError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                        type="password"
                        name={confirmPassword} 
                        onChange={handleConfirmPasswordOnChange}
                        onFocus={()=> setConfirmPasswordOnFocus(true)} 
                        onBlur={()=> setConfirmPasswordOnBlur(true)}
                        placeholder="Confirm Password"
                        />
                    </div>
            
                    <button type="submit">
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;

