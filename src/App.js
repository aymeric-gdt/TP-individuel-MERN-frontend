// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wrapper from './Components/Wrapper/Wrapper';
import Home from './Page/Home/Home';
import UserList from './Page/UserList/UserList';
import Login from './Page/UserLogin/Login';
import Register from './Page/UserRegister/Register';
import Profil from './Page/Profil/Profil';
import Vendre from './Page/Vendre/Vendre';
import MesAnnonces from './Page/MesAnnonces/MesAnnonces';
import ModifierAnnonce from './Page/ModifierAnnonce/ModifierAnnonce';
import ProtectedRoute from './ProtectedRoute'; // Importer le composant ProtectedRoute
import Annonce from './Page/Annonces/Annonces';
import DetailAnnonce from './Page/DetailAnnonce/DetailAnnonce';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // État d'authentification

    return (
        <Router>
            <Wrapper>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/userlist" element={<UserList />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/produits" element={<Annonce />} />
                    <Route path="/produits/:id" element={<DetailAnnonce />} />

                    {/* Routes protégées */}
                    <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                        <Route path="/mes-annonces" element={<MesAnnonces />} />
                        <Route path="/modifier-annonce/:id" element={<ModifierAnnonce />} />
                        <Route path="/profil" element={<Profil />} />
                        <Route path="/vendre" element={<Vendre />} />
                    </Route>
                </Routes>
            </Wrapper>
        </Router>
    );
};

export default App;
