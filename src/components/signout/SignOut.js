import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SignOut({setUser}) {
    let navigate = useNavigate();

    useEffect(() => {
        setUser(null);
        localStorage.removeItem('loginToken');
        navigate('/sign-in')
    }, [])

    return <div></div>
}

export default SignOut;