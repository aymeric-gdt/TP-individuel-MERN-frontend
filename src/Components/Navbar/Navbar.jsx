import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        checkLoginStatus();
        window.addEventListener('storage', checkLoginStatus);

        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">TechShop</Link>
            </div>
            <ul className="navbar-list">
                <li className="navbar-item"><Link to="/produits">Découvrir des Produits</Link></li>
                {isLoggedIn ? (
                    <>
                        <li className="navbar-item"><Link to="/profil">Profil</Link></li>
                        <li className="navbar-item"><Link to="/mes-annonces">Mes produits à vendre</Link></li>
                        <li className="navbar-item">
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="navbar-item"><Link to="/login">Login</Link></li>
                        <li className="navbar-item"><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
