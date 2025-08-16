import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaHeart, FaComment, FaShare, FaWhatsapp, FaFacebook, FaEnvelope, FaPhone } from 'react-icons/fa';
import { products } from '../data';

const ProductPage = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(product?.likes || 0);
    const [showContact, setShowContact] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    if (!product) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen flex items-center justify-center bg-gray-50"
            >
                <p className="text-xl text-gray-700">Produit non trouvé</p>
            </motion.div>
        );
    }

    const handleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR').format(price) + ' Ar';
    };

    const contactButtonVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1, duration: 0.3, ease: 'easeOut' },
        }),
    };

    const buyButtonVariants = {
        hover: {
            boxShadow: ['0 0 0 rgba(34, 197, 94, 0)', '0 0 15px rgba(34, 197, 94, 0.5)', '0 0 0 rgba(34, 197, 94, 0)'],
            transition: { duration: 1.5, repeat: Infinity, repeatType: 'loop' },
        },
    };

    const menuItemVariants = {
        hover: { scale: 1.2, backgroundColor: '#22c55e', transition: { duration: 0.2 } },
        tap: { scale: 0.9 },
    };

    const menuItems = [
        { emoji: '🏠', to: '/', label: 'Accueil' },
        { emoji: '🔍', to: '/search', label: 'Recherche' },
        { emoji: '👤', to: '/profile', label: 'Profil' },
        { emoji: '🛒', to: '/cart', label: 'Panier' },
        { emoji: '⚙️', to: '/settings', label: 'Paramètres' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50 flex"
        >
            <motion.div
                className="fixed top-0 left-0 h-full w-16 bg-white shadow-lg flex flex-col items-center py-6 space-y-6"
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                {menuItems.map((item, index) => (
                    <motion.div
                        key={item.label}
                        custom={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                        <Link to={item.to} aria-label={item.label}>
                            <motion.div
                                variants={menuItemVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="w-12 h-12 flex items-center justify-center text-2xl bg-gray-100 rounded-full text-gray-700 hover:text-white"
                            >
                                {item.emoji}
                            </motion.div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            <div className="flex-1 ml-20 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                            className="relative overflow-hidden rounded-lg shadow-lg"
                        >
                            <motion.img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-[400px] object-cover"
                                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                            />
                        </motion.div>

                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-6"
                            initial="hidden"
                            animate="visible"
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
                        >
                            <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-3xl font-bold text-gray-900 mb-2">
                                {product.title}
                            </motion.h1>
                            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-gray-600 mb-4">
                                {product.description}
                            </motion.p>
                            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-2xl font-semibold text-primary">
                                {formatPrice(product.price)}
                            </motion.p>

                            <div className="flex gap-4 mt-6">
                                <motion.button
                                    whileHover={shouldReduceMotion ? {} : { scale: 1.1, backgroundColor: '#ef4444' }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleLike}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm ${liked ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                                    aria-label={liked ? 'Retirer le like' : 'Liker le produit'}
                                    animate={liked && !shouldReduceMotion ? { scale: [1, 1.2, 1] } : {}}
                                >
                                    <FaHeart /> {likes}
                                </motion.button>
                                <motion.button
                                    whileHover={shouldReduceMotion ? {} : { scale: 1.1, backgroundColor: '#d1d5db' }}
                                    whileTap={{ scale: 0.9 }}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow-sm"
                                    aria-label="Commenter"
                                >
                                    <FaComment /> {product.comments}
                                </motion.button>
                                <motion.button
                                    whileHover={shouldReduceMotion ? {} : { scale: 1.1, backgroundColor: '#d1d5db' }}
                                    whileTap={{ scale: 0.9 }}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow-sm"
                                    aria-label="Partager"
                                >
                                    <FaShare /> {product.shares}
                                </motion.button>
                            </div>

                            <motion.button
                                whileHover={shouldReduceMotion ? {} : buyButtonVariants.hover}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowContact(!showContact)}
                                className="w-full mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors"
                                aria-label="Acheter maintenant"
                            >
                                Acheter maintenant
                            </motion.button>

                            <AnimatePresence>
                                {showContact && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        className="mt-6"
                                    >
                                        <motion.h2
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-lg font-semibold text-gray-900 mb-3"
                                        >
                                            Contacter le vendeur :
                                        </motion.h2>
                                        <div className="flex flex-wrap gap-3">
                                            {[
                                                { icon: <FaWhatsapp />, label: 'WhatsApp', href: 'https://wa.me/123456789', color: 'bg-primary' },
                                                { icon: <FaFacebook />, label: 'Facebook', href: 'https://facebook.com', color: 'bg-secondary' },
                                                { icon: <FaEnvelope />, label: 'Email', href: 'mailto:contact@example.com', color: 'bg-neutral' },
                                                { icon: <FaPhone />, label: 'Téléphone', href: 'tel:+123456789', color: 'bg-blue-400' },
                                            ].map((option, index) => (
                                                <motion.a
                                                    key={option.label}
                                                    custom={index}
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={contactButtonVariants}
                                                    whileHover={shouldReduceMotion ? {} : { scale: 1.05, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}
                                                    whileTap={{ scale: 0.95 }}
                                                    href={option.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center gap-2 px-4 py-2 ${option.color} text-white rounded-lg shadow-sm`}
                                                    aria-label={`Contacter via ${option.label}`}
                                                >
                                                    {option.icon} {option.label}
                                                </motion.a>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductPage;