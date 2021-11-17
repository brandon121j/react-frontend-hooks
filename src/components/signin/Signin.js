import React from "react";

import PasswordHooks from "../hooks/PasswordHooks";
import EmailHooks from "../hooks/EmailHooks";

import { toast } from "react-toastify";
import axios from "axios";


// export const SignIn = () => {
function SignIn(){
    const notifySuccess = () => toast.success('User successfully signed in!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const notifyFailed = (input) => toast.error(`${input}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    
    const [email, handleEmailOnChange, emailError, setEmailOnFocus, setEmailOnBlur] = EmailHooks()
    const [password, handlePassowrdOnChange, passwordError, setPasswordOnFocus, setPasswordOnBlur] = PasswordHooks()

    async function handleOnSubmit(e) {
        e.preventDefault()
        try {
            let payload = await axios.post("http://localhost:3001/users/login",{
                email,
                password
            });
            notifySuccess()
        }catch(e){
            let arr = []
            console.log(e.response)
            for(let key in e.response.data.error) {
                arr.push(e.response.data.error[key])
            }
            console.log(arr)
            if(arr[0].length === 1) {
                notifyFailed(e.response.data.error)
            }else{
                arr.map( error => notifyFailed(error))
            }
        }
    }

    return (
        <div className="form-div-signin">
            <main className="form-signin">
                <form onSubmit={handleOnSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign In</h1>
                    <div className="form-floating">
                        <input
                        style={{border : `1px solid ${email.length === 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${email.length === 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                        name={email} 
                        onChange={handleEmailOnChange}
                        onFocus={()=> setEmailOnFocus(true)} 
                        onBlur={()=> setEmailOnBlur(true)}
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">{email.length === 0 ? <span style={{color : 'red'}}>Please enter your email</span> : ("Email")}</label>
                    </div>

                    <div className="form-floating">
                        <input
                        style={{border : `1px solid ${password.length === 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${password.length === 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                        type="password"
                        name={password} 
                        onChange={handlePassowrdOnChange}
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