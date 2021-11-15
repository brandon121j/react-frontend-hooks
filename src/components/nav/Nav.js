import React from 'react'
import { Link } from 'react-router-dom'

function Nav({ user }) {
    let linkTitle1 = user ? user.username : "Sign up";
    let link1 = user ? '/profile' : '/sign-up';

    let linkTitle2 = user ? "logout" : "Sign in";
    let link2 = user ? '/' : '/sign-in';

    return (
        <div className="nav">
            <ul>
                <li>
                    <Link to={link1}>{linkTitle1}</Link>
                </li>
                <li>
                    <Link to={link2}>{linkTitle2}</Link>
                </li>
            </ul>
        </div>
    )
}

export default Nav;