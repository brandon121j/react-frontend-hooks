import { useState, useEffect } from 'react';

function PasswordHooks() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [onFocus, setOnFocus] = useState(false);
    const [onBlur, setOnBlur] = useState(false);

    useEffect(() => {
        if (onBlur) {
            if (password.length === 0) {
                setError('Password cannot be empty');
            } else {
                setError('');
            }
        }
    }, [password, onBlur, onFocus]
    )

    function passwordOnChangeHandler(e) {
        setPassword(e.target.value);
    }

    return [password, passwordOnChangeHandler, error, setOnFocus, setOnBlur]
}

export default PasswordHooks;