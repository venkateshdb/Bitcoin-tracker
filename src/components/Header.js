import { useEffect, createContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../firebase/firebase';


function Header(props){
    let navigate = useNavigate();

    const signout = () => {
        logout();
        props.setLoggedIn(false);
        navigate('/')
    }

    return (
        <div className="header-top">
        <nav className="navbar">
            <div className="brand">
                <Link to="/">
                    <h1 className="brand-name">Bitcoin-Tracker</h1>
                </Link>
            </div>


            <div className="link">
                {!props.isLoggedIn &&
                    <Link to="/signin">
                        <p>Signin</p>
                    </Link>
                }

                {!props.isLoggedIn &&
                    <Link to="/signup">
                        <p>Signup</p>
                    </Link>
                }

                {props.isLoggedIn &&
                    <Link to='/'>
                        <p onClick={signout}>Logout</p>
                    </Link>
                }

                <Link to='/price'>
                    <p>Price</p>
                </Link>

            </div>
        </nav>
    </div>
    );
}

export default Header;
