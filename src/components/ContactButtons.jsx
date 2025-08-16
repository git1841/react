import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaFacebook, FaEnvelope, FaPhone } from 'react-icons/fa';

const ContactButtons = ({ productId }) => {
    const buttonVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1, duration: 0.3 },
        }),
    };

    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {[
                { icon: <FaWhatsapp />, href: 'https://wa.me/123456789', color: 'bg-primary', label: 'WhatsApp' },
                { icon: <FaFacebook />, href: 'https://facebook.com', color: 'bg-secondary', label: 'Facebook' },
                { icon: <FaEnvelope />, href: 'mailto:contact@example.com', color: 'bg-neutral', label: 'Email' },
                { icon: <FaPhone />, href: 'tel:+123456789', color: 'bg-blue-400', label: 'Téléphone' },
            ].map((option, index) => (
                <motion.a
                    key={option.label}
                    custom={index}
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 ${option.color} text-white rounded-md shadow-sm`}
                    aria-label={`Contacter via ${option.label}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {option.icon}
                </motion.a>
            ))}
        </div>
    );
};

export default ContactButtons;