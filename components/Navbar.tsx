import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserIcon } from './Icons';

interface NavbarProps {
    onScrollTo: (id: string) => void;
    onAuthClick: () => void;
    onAdminClick: () => void;
    isLoggedIn: boolean;
    user: { id: string; username: string; avatar: string } | null;
}

const navLinks = [
    { id: 'home', name: 'Home' },
    { id: 'stories', name: 'Stories' },
    { id: 'documentaries', name: 'Documentaries' },
    { id: 'articles', name: 'Articles' },
    { id: 'about', name: 'About' },
    { id: 'contact', name: 'Contact' },
];

const Navbar: React.FC<NavbarProps> = ({ onScrollTo, onAuthClick, onAdminClick, isLoggedIn, user }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 glassmorphism' : 'py-6'}`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="text-2xl font-bold font-serif tracking-widest text-gold cursor-pointer" onClick={() => onScrollTo('home')}>
                    SAGAR SAHU
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <button key={link.id} onClick={() => onScrollTo(link.id)} className="text-gray-300 hover:text-gold transition-colors duration-300 relative group">
                            {link.name}
                            <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                        </button>
                    ))}
                    {isLoggedIn && user?.id === 'admin-sagar' && (
                        <button onClick={onAdminClick} className="text-gray-300 hover:text-gold transition-colors duration-300 relative group">
                           Dashboard
                           <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                        </button>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    {isLoggedIn && user ? (
                        <div className="flex items-center space-x-2">
                             <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full border-2 border-gold"/>
                            <span className="text-sm text-gray-300 hidden sm:block">{user.username}</span>
                        </div>
                    ) : (
                         <button onClick={onAuthClick} className="border border-gold text-gold px-4 py-2 rounded-md hover:bg-gold hover:text-black transition-all duration-300 flex items-center space-x-2">
                            <UserIcon className="w-4 h-4" />
                            <span>Login / Sign Up</span>
                        </button>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;