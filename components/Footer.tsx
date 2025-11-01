
import React from 'react';
import { motion } from 'framer-motion';
import { YouTubeIcon, InstagramIcon, RedditIcon, FacebookIcon, XIcon } from './Icons';

const socialLinks = [
    { icon: <YouTubeIcon />, href: '#' },
    { icon: <InstagramIcon />, href: '#' },
    { icon: <RedditIcon />, href: '#' },
    { icon: <FacebookIcon />, href: '#' },
    { icon: <XIcon />, href: '#' },
];

const Footer: React.FC = () => {
    return (
        <footer id="contact" className="bg-surface py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-lg font-serif italic">"Writer of worlds, dreamer of chaos."</p>
                    <div className="flex justify-center space-x-6 my-8">
                        {socialLinks.map((link, index) => (
                            <motion.a 
                                key={index} 
                                href={link.href} 
                                className="text-gray-400 hover:text-gold hover:scale-110 transform transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {React.cloneElement(link.icon, { className: 'w-7 h-7' })}
                            </motion.a>
                        ))}
                    </div>
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Sagar Sahu. All Rights Reserved.
                    </p>
                    <p className="text-xs mt-2 opacity-50">
                        Website designed and built by a cinematic visionary.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
