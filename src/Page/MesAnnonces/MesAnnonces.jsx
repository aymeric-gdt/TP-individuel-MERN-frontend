import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MesAnnonces.css'; // Assurez-vous que ce fichier CSS existe

const MesAnnonces = () => {
    const [userProducts, setUserProducts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchUserData = async () => {
            try {
                const userResponse = await fetch('http://localhost:8080/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!userResponse.ok) {
                    throw new Error("Erreur lors de la récupération des informations utilisateur");
                }

                const userData = await userResponse.json();
                const userId = userData._id;

                const productsResponse = await fetch(`http://localhost:8080/api/${userId}/products`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!productsResponse.ok) {
                    throw new Error("Erreur lors de la récupération des produits");
                }

                const productsData = await productsResponse.json();
                setUserProducts(productsData);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleEditProduct = (productId) => {
        navigate(`/modifier-annonce/${productId}`);
    };

    const handleDeleteProduct = async (productId) => {
        const token = localStorage.getItem('token');
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la suppression du produit");
                }

                // Mettre à jour l'état local pour retirer le produit supprimé
                setUserProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <div className="mes-annonces-container">
            <h2>Mes Annonces</h2>
            {error && <div className="error">{error}</div>}
            <ul>
                {userProducts.map(product => (
                    <li key={product._id} className="product-item">
                        <h3>{product.name}</h3>
                        <div className="bubble">Catégorie: {product.category}</div>
                        <div className="bubble">Description: {product.description}</div>
                        <div className="bubble">Prix: {product.price} €</div>
                        <div className="bubble">Stock: {product.stock}</div>
                        <button onClick={() => handleEditProduct(product._id)}>Modifier</button>
                        <button onClick={() => handleDeleteProduct(product._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
            {userProducts.length === 0 && <p>Aucune annonce trouvée.</p>}
        </div>
    );
};

export default MesAnnonces;
