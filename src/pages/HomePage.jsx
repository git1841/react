import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data';

const HomePage = () => {
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [page, setPage] = useState(1);
    const productsPerPage = 10;

    const allProducts = Array.from({ length: 50 }, (_, i) => ({
        ...products[i % products.length],
        id: i + 1,
    }));

    useEffect(() => {
        loadMoreProducts();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadMoreProducts = () => {
        const nextProducts = allProducts.slice(0, page * productsPerPage);
        setVisibleProducts(nextProducts);
        setPage(p => p + 1);
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            loadMoreProducts();
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
        }),
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
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial="hidden"
                        animate="visible"
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                    >
                        {visibleProducts.map((product, index) => (
                            <motion.div key={product.id} custom={index} variants={cardVariants}>
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default HomePage;