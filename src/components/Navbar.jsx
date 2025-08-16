import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar = ({ isAdmin, setIsAdmin }) => {
    return (
        <motion.nav
            className="bg-primary text-white py-4 shadow-md"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">Vente en Ligne</Link>
                <div className="flex items-center gap-4">
                    {!isAdmin ? (
                        <Link to="/admin" className="px-4 py-2 bg-white text-primary rounded-md hover:bg-gray-100">
                            Entrer en Admin
                        </Link>
                    ) : (
                        <button onClick={() => setIsAdmin(false)} className="px-4 py-2 bg-white text-primary rounded-md hover:bg-gray-100">
                            Quitter Admin
                        </button>
                    )}
                    <motion.button className="p-2 bg-white text-primary rounded-md" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <FaShoppingCart />
                    </motion.button>
                    <motion.button className="p-2 bg-white text-primary rounded-md" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <FaUser />
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;