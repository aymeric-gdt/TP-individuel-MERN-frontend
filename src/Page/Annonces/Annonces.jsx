import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Annonces.css';

const Annonce = () => {
    const [products, setProducts] = useState([]);
    const [searchCategory, setSearchCategory] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProducts = async (category = '') => {
        try {
            const response = await fetch(`http://localhost:8080/api/products?category=${category}`);
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des annonces");
            }
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts(searchCategory);
    };

    const handleProductClick = (id) => {
        navigate(`/produits/${id}`);
    };

    if (loading) return <p>Chargement des annonces...</p>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="annonce-container">
            <h2>Liste des Annonces</h2>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Rechercher par catégorie..."
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                />
                <button type="submit">Rechercher</button>
            </form>
            <ul className="product-list">
                {products.map(product => (
                    <li key={product._id} className="product-item" onClick={() => handleProductClick(product._id)}>
                        <img src={product.image} alt={product.name} />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <div className="bubble">Prix: {product.price} €</div>
                            <div className="bubble">Catégorie: {product.category}</div>
                            <div className="bubble">Description: {product.description}</div>
                            <div className="bubble">Stock: {product.stock}</div>
                        </div>
                    </li>
                ))}
            </ul>
            {products.length === 0 && <p>Aucune annonce trouvée.</p>}
        </div>
    );
};

export default Annonce;
