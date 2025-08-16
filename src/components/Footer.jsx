import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer
            className="bg-neutral text-white py-6 mt-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center md:text-left">
                    <h5 className="text-lg font-bold">Vente en Ligne</h5>
                    <p>Le meilleur endroit pour vos achats en ligne.</p>
                </div>
                <div className="text-center">
                    <h5 className="text-lg font-bold">Contact</h5>
                    <p>Email: contact@venteenligne.mg</p>
                    <p>Téléphone: +261 34 00 000 00</p>
                </div>
                <div className="text-center md:text-right">
                    <h5 className="text-lg font-bold">Suivez-nous</h5>
                    <p>Facebook | Instagram | Twitter</p>
                </div>
            </div>
            <div className="text-center mt-4">
                <p>&copy; {new Date().getFullYear()} Vente en Ligne. Tous droits réservés.</p>
            </div>
        </motion.footer>
    );
};

export default Footer;