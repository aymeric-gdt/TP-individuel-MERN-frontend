import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Bienvenue sur TechShop</h1>
                <p>La plateforme de vente de matériel informatique entre particuliers</p>
                <Link to="/produits" className="explore-button">Parcourir les annonces</Link>
            </header>
            <section className="categories-section">
                <h2>Catégories populaires</h2>
                <div className="categories">
                    <div className="category-card">
                        <h3>Ordinateurs d'occasion</h3>
                        <p>Portables, PC de bureau, tout-en-un</p>
                        <Link to="/categorie/ordinateurs" className="category-button">Voir les annonces</Link>
                    </div>
                    <div className="category-card">
                        <h3>Composants PC</h3>
                        <p>Processeurs, cartes graphiques, mémoire</p>
                        <Link to="/categorie/composants" className="category-button">Trouver des pièces</Link>
                    </div>
                    <div className="category-card">
                        <h3>Périphériques</h3>
                        <p>Écrans, claviers, souris, casques</p>
                        <Link to="/categorie/peripheriques" className="category-button">Découvrir</Link>
                    </div>
                </div>
            </section>
            <section className="sell-section">
                <h2>Vendez votre matériel</h2>
                <p>Donnez une seconde vie à votre équipement informatique</p>
                <Link to="/vendre" className="sell-button">Déposer une annonce</Link>
            </section>
            <section className="community-section">
                <h2>Rejoignez notre communauté</h2>
                <p>Échangez, achetez et vendez entre passionnés d'informatique</p>
                <Link to="/register" className="community-button">S'inscrire</Link>
            </section>
        </div>
    );
};

export default Home;
