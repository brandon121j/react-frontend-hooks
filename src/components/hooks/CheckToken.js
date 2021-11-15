import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';


function CheckToken() {
    const [isAuth, setIsAuth] = useState(false);

    function checkJwtToken() {
        let jwtToken = window.localStorage.getItem('jwtToken');

        if (jwtToken) {
            let decodedToken = jwtDecode(jwtToken);

            const currentTime = Date.now() / 100;

            if (decodedToken.exp < currentTime) {
                window.localStorage.removeItem('jwtToken');

                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    return [checkJwtToken];
}


