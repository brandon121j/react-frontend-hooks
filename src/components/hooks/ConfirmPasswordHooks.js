import { useState, useEffect } from "react";
import {isStrongPassword} from 'validator'

function ConfirmPasswordHooks(){
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const [onFocus, setOnFocus] = useState(false)
    const [onBlur, setOnBlur] = useState(false)

    useEffect(() => {
        if(onFocus){
            if(isStrongPassword(password)){
                setError("")
            }
        }

        if(onBlur){
            if(password.length === 0){
                setError("Passwords must match")
            }
        }
    }, [password, onBlur, onFocus])

    function handleConfirmPasswordOnChange(e){
        setPassword(e.target.value)
    }

    return [password, handleConfirmPasswordOnChange, error, setOnFocus, setOnBlur]
}

export default ConfirmPasswordHooks