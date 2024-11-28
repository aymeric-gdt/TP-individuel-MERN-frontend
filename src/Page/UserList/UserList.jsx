import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            setUsers(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="user-list__loading">Loading...</div>;
    if (error) return <div className="user-list__error">Error: {error}</div>;

    return (
        <div className="user-list">
            <h2 className="user-list__title">User List</h2>
            <ul className="user-list__items">
                {users.map(user => (
                    <li key={user._id} className="user-list__item">
                        <span className="user-list__username">{user.username}</span>
                        <span className="user-list__id">{user._id}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
