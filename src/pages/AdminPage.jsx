import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminAuth from '../components/AdminAuth';
import CreateAdmin from '../components/CreateAdmin';
import AdminPanel from '../components/AdminPanel';

const AdminPage = ({ setIsAdmin }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
        setIsAdmin(true);
    };

    const handleCreateAccount = () => {
        setShowCreateForm(true);
    };

    const handleBack = () => {
        setShowCreateForm(false);
    };

    const handleCreate = (username, password) => {
        alert(`Nouveau compte admin créé: ${username}`);
        setShowCreateForm(false);
    };

    const formVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center"
        >
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <AnimatePresence mode="wait">
                    {!isAuthenticated ? (
                        showCreateForm ? (
                            <motion.div key="create" variants={formVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                                <CreateAdmin onBack={handleBack} onCreate={handleCreate} />
                            </motion.div>
                        ) : (
                            <motion.div key="auth" variants={formVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                                <AdminAuth onLogin={handleLogin} onCreateAccount={handleCreateAccount} />
                            </motion.div>
                        )
                    ) : (
                        <motion.div key="panel" variants={formVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                            <AdminPanel />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default AdminPage;