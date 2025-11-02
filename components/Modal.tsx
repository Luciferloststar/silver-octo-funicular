import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon } from './Icons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    size?: 'default' | 'large';
    isMaximized?: boolean;
    controls?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, size = 'default', isMaximized = false, controls }) => {
    const sizeClass = size === 'large' ? 'max-w-4xl' : 'max-w-md';
    
    const modalClasses = isMaximized
      ? 'w-screen h-screen max-w-full rounded-none p-0'
      : `relative w-full ${sizeClass} rounded-2xl p-8`;

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
                        className={`${modalClasses} glassmorphism border border-gold/20 shadow-lg shadow-gold/10 flex flex-col transition-all duration-300 ease-in-out`}
                    >
                        <div className={`flex justify-between items-center flex-shrink-0 ${isMaximized ? 'p-4 border-b border-gold/20' : 'mb-6'}`}>
                            <h2 className="text-3xl font-serif font-bold text-gold truncate pr-4">{title}</h2>
                            <div className="flex items-center space-x-2">
                                {controls}
                                <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
                                    <CloseIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        <div className={`flex-grow overflow-y-auto ${isMaximized ? 'p-4 pt-0' : ''}`}>
                          {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;