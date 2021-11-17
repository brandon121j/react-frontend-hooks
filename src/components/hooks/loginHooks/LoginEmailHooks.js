import { useState, useEffect } from 'react';
import { isEmpty } from 'validator';

function EmailHooks() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [onFocus, setOnFocus] = useState(false);
    const [onBlur, setOnBlur] = useState(false);

    useEffect(() => {
        if (onBlur) {
            if (isEmpty(email)) {
                setError('Email cannot be empty');
            } else {
                setError('')
            }
        }
    }, [email, onFocus, onBlur])

    function emailOnChangeHandler(e) {
        setEmail(e.target.value);
    }

    return [email, emailOnChangeHandler, error, setOnFocus, setOnBlur]
} 

export default EmailHooks