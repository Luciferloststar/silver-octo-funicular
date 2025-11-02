
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon } from './Icons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    size?: 'default' | 'large';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, size = 'default' }) => {
    const sizeClass = size === 'large' ? 'max-w-4xl' : 'max-w-md';
    
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className={`relative w-full ${sizeClass} glassmorphism rounded-2xl p-8 border border-gold/20 shadow-lg shadow-gold/10`}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-serif font-bold text-gold">{title}</h2>
                            <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
                                <CloseIcon className="w-6 h-6" />
                            </button>
                        </div>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;