import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signout = () => {
    useEffect(() => {
        setUser(null);
        localStorage.removeItem('loginToken');
        useNavigate('/signin')
    })
}

export default Signout;