import React, { useEffect, useState } from 'react';
import './Profil.css'; // Assurez-vous que ce fichier CSS existe

const Profil = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // État pour gérer le mode édition
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token'); // Récupérer le token

            try {
                const response = await fetch('http://localhost:8080/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Inclure le token dans l'en-tête
                    },
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données du profil');
                }

                const data = await response.json();
                setUserData(data); // Stocker les données de l'utilisateur
                setUsername(data.username); // Initialiser le champ username
                setEmail(data.email); // Initialiser le champ email
            } catch (err) {
                setError(err.message); // Gérer les erreurs
            }
        };

        fetchUserProfile(); // Appeler la fonction pour récupérer les données du profil
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdateProfile = async () => {
        const token = localStorage.getItem('token'); // Récupérer le token

        try {
            const response = await fetch(`http://localhost:8080/api/users/${userData._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email }), // Envoyer les nouvelles valeurs
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du profil');
            }

            const updatedUserData = await response.json();
            setUserData(updatedUserData.user); // Mettre à jour les données utilisateur
            setIsEditing(false); // Quitter le mode édition
        } catch (err) {
            setError(err.message); // Gérer les erreurs
        }
    };

    const handleDeleteUser = async () => {
        const token = localStorage.getItem('token'); // Récupérer le token

        if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/users/${userData._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la suppression du compte');
                }

                alert("Votre compte a été supprimé avec succès.");
                localStorage.removeItem('token'); // Supprimer le token du localStorage
                window.location.href = '/login'; // Rediriger vers la page de connexion
            } catch (err) {
                setError(err.message); // Gérer les erreurs
            }
        }
    };

    if (error) {
        return <div className="profil-error">{error}</div>;
    }

    if (!userData) {
        return <div className="profil-loading">Chargement...</div>;
    }

    return (
        <div className="profil-container">
            <div className="profil-header">
                <h1 className="profil-title">{userData.username}</h1>
                <p className="profil-subtitle">{userData.email}</p>
                <button onClick={handleEditToggle} className="edit-button">
                    {isEditing ? 'Annuler' : 'Modifier'}
                </button>
            </div>
            <div className="profil-details">
                <div className="profil-detail-item">
                    <span className="profil-detail-label">Nom d'utilisateur:</span>
                    {isEditing ? (
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="profil-input"
                        />
                    ) : (
                        <span className="profil-detail-value">{userData.username}</span>
                    )}
                </div>
                <div className="profil-detail-item">
                    <span className="profil-detail-label">Email:</span>
                    {isEditing ? (
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="profil-input"
                        />
                    ) : (
                        <span className="profil-detail-value">{userData.email}</span>
                    )}
                </div>
                <div className="profil-detail-item">
                    <span className="profil-detail-label">Date de création:</span>
                    <span className="profil-detail-value">
                        {new Date(userData.createdAt).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit'
                        })}
                    </span>
                </div>
            </div>
            {isEditing && (
                <button onClick={handleUpdateProfile} className="save-button">
                    Enregistrer les modifications
                </button>
            )}
            {/* Bouton pour supprimer le compte utilisateur */}
            <button onClick={handleDeleteUser} className="delete-button">
                Supprimer mon compte
            </button>
        </div>
    );
};

export default Profil;
