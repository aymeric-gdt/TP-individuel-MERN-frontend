import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ModifierAnnonce.css'; // Assurez-vous que ce fichier CSS existe

const ModifierAnnonce = () => {
    const { id } = useParams(); // Récupère l'ID du produit à modifier
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:8080/api/products/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération du produit");
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:8080/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour du produit");
            }

            const updatedProduct = await response.json();
            alert(updatedProduct.message); // Affiche un message de succès
            navigate('/mes-annonces'); // Redirige vers la liste des annonces
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <div className="error">{error}</div>;
    if (!product) return <p>Aucun produit trouvé.</p>;

    return (
        <div className="modifier-annonce-container">
            <h2>Modifier l'Annonce</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nom:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Prix (€):</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Stock:</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Catégorie:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">URL de l'image:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Mettre à jour l'annonce</button>
            </form>
        </div>
    );
};

export default ModifierAnnonce;
