import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ContactButtons from './ContactButtons';

const ProductCard = ({ product }) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(product.likes);
    const [showContact, setShowContact] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR').format(price) + ' Ar';
    };

    const cardVariants = {
        hover: { scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)' },
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover="hover"
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden mb-4 h-full"
        >
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
            </Link>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <p className="text-primary font-semibold mt-2">{formatPrice(product.price)}</p>

                <div className="flex gap-2 mt-3">
                    <motion.button
                        onClick={handleLike}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md ${liked ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'} shadow-sm heart-animation`}
                        whileTap={{ scale: 0.95 }}
                        animate={liked ? { scale: [1, 1.2, 1] } : {}}
                    >
                        <FaHeart /> {likes}
                    </motion.button>
                    <motion.button className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md shadow-sm" whileTap={{ scale: 0.95 }}>
                        <FaComment /> {product.comments}
                    </motion.button>
                    <motion.button className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md shadow-sm" whileTap={{ scale: 0.95 }}>
                        <FaShare /> {product.shares}
                    </motion.button>
                </div>

                <motion.button
                    onClick={() => setShowContact(!showContact)}
                    className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-md shadow-md hover:bg-green-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Acheter
                </motion.button>

                <AnimatePresence>
                    {showContact && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ContactButtons productId={product.id} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default ProductCard;