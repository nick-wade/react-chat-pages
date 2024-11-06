import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/Navbar.css'

function Navbar(){
    const navigate = useNavigate();
    const location = useLocation();
    const sessionData = JSON.parse(sessionStorage.getItem('sessionData'));

    const Logout = () => {
        sessionStorage.removeItem('sessionData')
        navigate('/')
    };

    return (
    <div className="navbar">
        <Link to={'/'} className={location.pathname === '/' ? "active" : ""}>Home</Link>
        {sessionData ? <Link to={'/Chat'} className={location.pathname === '/Chat' ? "active" : ""}>Chat</Link> : ''}
        {sessionData ?
            <div className='navbar-right'>
                <div className='dropdown'>
                <Link onClick={Logout}>Log out</Link>
                </div>

            </div> : 
            <div className='navbar-right'>
            <div className="dropdown">

                <Link className={location.pathname === '/Login'? "dropbtn active": "dropbtn"} to={'/Login'}>Log In</Link>
            </div>
            <Link className={location.pathname === '/Register' ? "active" : ""} to={'/Register'}>Register</Link>
            
        </div>}
    </div>
    )
}

export default Navbar;  