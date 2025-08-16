import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { adminCredentials } from '../data';

const AdminAuth = ({ onLogin, onCreateAccount }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === adminCredentials.username && password === adminCredentials.password) {
            onLogin();
        } else {
            setError('Identifiants incorrects');
        }
    };

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-center text-2xl font-bold mb-4">Connexion Admin</h2>
            {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="block text-gray-700 mb-1">Nom d'utilisateur</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 mb-1">Mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <motion.button
                    type="submit"
                    className="w-full py-2 bg-primary text-white rounded-md shadow-md hover:bg-green-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Se connecter
                </motion.button>
                <div className="text-center mt-3">
                    <Link to="#" onClick={onCreateAccount} className="text-primary hover:underline">
                        Créer un nouveau compte admin
                    </Link>
                </div>
            </form>
        </motion.div>
    );
};

export default AdminAuth;