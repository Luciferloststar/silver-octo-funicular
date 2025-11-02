import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserIcon } from './Icons';
import { User } from '../types';

interface NavbarProps {
    onScrollTo: (id: string) => void;
    onAuthClick: () => void;
    onAdminClick: () => void;
    onLogout: () => void;
    onChangePassword: () => void;
    onProfileSettings: () => void;
    isLoggedIn: boolean;
    user: User | null;
    isReaderLoggedIn: boolean;
    readerEmail: string | null;
    onReaderLogout: () => void;
}

const navLinks = [
    { id: 'home', name: 'Home' },
    { id: 'stories', name: 'Stories' },
    { id: 'documentaries', name: 'Documentaries' },
    { id: 'articles', name: 'Articles' },
    { id: 'about', name: 'About' },
    { id: 'contact', name: 'Contact' },
];

const Navbar: React.FC<NavbarProps> = ({ onScrollTo, onAuthClick, onAdminClick, isLoggedIn, user, onLogout, onChangePassword, onProfileSettings, isReaderLoggedIn, readerEmail, onReaderLogout }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 glassmorphism' : 'py-6'}`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="text-2xl font-bold font-serif tracking-widest text-gold cursor-pointer text-glow" onClick={() => onScrollTo('home')}>
                    SAGAR SAHU
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <button key={link.id} onClick={() => onScrollTo(link.id)} className="text-gray-300 hover:text-gold transition-colors duration-300 relative group">
                            {link.name}
                            <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                        </button>
                    ))}
                </div>
                <div className="flex items-center space-x-4">
                    {isLoggedIn && user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 cursor-pointer">
                                <img src={user.avatar} alt={user.username} className="w-9 h-9 rounded-full border-2 border-gold"/>
                                <span className="text-sm text-gray-300 hidden sm:block">{user.username}</span>
                            </button>
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-48 glassmorphism rounded-lg shadow-lg py-1 border border-gold/20"
                                    >
                                        <a onClick={() => { onAdminClick(); setIsDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gold/10 hover:text-gold cursor-pointer">Dashboard</a>
                                        <a onClick={() => { onProfileSettings(); setIsDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gold/10 hover:text-gold cursor-pointer">Profile Settings</a>
                                        <a onClick={() => { onChangePassword(); setIsDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gold/10 hover:text-gold cursor-pointer">Change Password</a>
                                        <div className="border-t border-gold/20 my-1"></div>
                                        <a onClick={() => { onLogout(); setIsDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gold/10 hover:text-gold cursor-pointer">Logout</a>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : isReaderLoggedIn && readerEmail ? (
                        <div className="flex items-center space-x-2 text-sm">
                            <span className="text-gray-300 hidden sm:block truncate max-w-[150px]">{readerEmail}</span>
                            <button onClick={onReaderLogout} className="text-gold hover:underline text-xs">(Logout)</button>
                        </div>
                    ) : (
                         <button onClick={onAuthClick} className="border border-gold text-gold px-4 py-2 rounded-md hover:bg-gold hover:text-black transition-all duration-300 flex items-center space-x-2">
                            <UserIcon className="w-4 h-4" />
                            <span>Admin Login</span>
                        </button>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
