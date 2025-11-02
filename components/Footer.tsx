
import React from 'react';
import { motion } from 'framer-motion';
import { YouTubeIcon, InstagramIcon, RedditIcon, FacebookIcon, XIcon } from './Icons';

// FIX: Updated SocialLinks interface to match the one in App.tsx
interface SocialLinks {
    youtube: string;
    instagram: string;
    reddit: string;
    facebook: string;
    x: string;
}

interface FooterProps {
    socialLinks: SocialLinks;
}

const iconMap: { [key: string]: React.ReactElement } = {
    youtube: <YouTubeIcon />,
    instagram: <InstagramIcon />,
    reddit: <RedditIcon />,
    facebook: <FacebookIcon />,
    x: <XIcon />,
};


const Footer: React.FC<FooterProps> = ({ socialLinks }) => {
    const socialIcons = [
        { key: 'youtube', icon: <YouTubeIcon />, href: socialLinks?.youtube || '#' },
        { key: 'instagram', icon: <InstagramIcon />, href: socialLinks?.instagram || '#' },
        { key: 'reddit', icon: <RedditIcon />, href: socialLinks?.reddit || '#' },
        { key: 'facebook', icon: <FacebookIcon />, href: socialLinks?.facebook || '#' },
        { key: 'x', icon: <XIcon />, href: socialLinks?.x || '#' },
    ];

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
                        {socialIcons.map((link, index) => (
                            <motion.a 
                                key={index} 
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
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