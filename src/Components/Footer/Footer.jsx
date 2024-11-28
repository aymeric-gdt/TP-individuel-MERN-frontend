// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h4>TechShop</h4>
                    <p>La plateforme de vente de matériel informatique entre particuliers</p>
                </div>
                
                <div className="footer-column">
                    <h4>Navigation</h4>
                    <ul>
                        <Link to="/">Accueil</Link>
                        <Link to="/produits">Produits</Link>
                        <Link to="/vendre">Vendre</Link>
                        <Link to="/contact">Contact</Link>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Compte</h4>
                    <ul>
                        <Link to="/login">Connexion</Link>
                        <Link to="/register">Inscription</Link>
                        <Link to="/profil">Mon Profil</Link>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Légal</h4>
                    <ul>
                        <Link to="/mentions-legales">Mentions légales</Link>
                        <Link to="/cgv">Conditions générales</Link>
                        <Link to="/politique-confidentialite">Confidentialité</Link>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 TechShop. Tous droits réservés.</p>
                <div className="social-icons">
                    <a href="/" className="social-icon">Facebook</a>
                    <a href="/" className="social-icon">Twitter</a>
                    <a href="/" className="social-icon">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
