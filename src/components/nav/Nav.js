import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {

    return (
        <div className="nav">
            <ul>
                <li>
                    <Link to='/sign-up'>Sign up</Link>
                </li>
                <li>
                    <Link to='/sign-in'>Sign in</Link>
                </li>
            </ul>
        </div>
    )
}

export default Nav