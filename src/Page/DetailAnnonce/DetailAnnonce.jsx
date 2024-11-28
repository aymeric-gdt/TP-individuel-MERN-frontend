// src/Page/DetailAnnonce/DetailAnnonce.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetailAnnonce.css'

const DetailAnnonce = () => {
    const { id } = useParams(); // Récupérer l'ID de l'annonce depuis l'URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/products/${id}`);
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des détails de l'annonce");
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Vérifier si l'utilisateur est connecté
    const isLoggedIn = !!localStorage.getItem('token');

    if (loading) return <p>Chargement des détails...</p>;
    if (error) return <div className="error">{error}</div>;
    if (!product) return <p>Aucun produit trouvé.</p>;

    // Fonction pour gérer l'achat
    const handlePurchase = () => {
        // Logique d'achat ici (par exemple, appeler une API pour traiter l'achat)
        alert(`Achat effectué pour ${product.name} au prix de ${product.price} €`);
    };

    return (
        <div className="detail-annonce-container">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>Prix: {product.price} €</p>
            <p>Catégorie: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>Stock: {product.stock}</p>

            {/* Afficher le bouton d'achat si l'utilisateur est connecté */}
            {isLoggedIn && (
                <button onClick={handlePurchase}>Acheter</button>
            )}
        </div>
    );
};

export default DetailAnnonce;
