import React from 'react';
import { motion, useInView } from 'framer-motion';
import { ContentItem, ContentType } from '../types';
import { FacebookIcon, InstagramIcon, RedditIcon, XIcon, WhatsAppIcon, BookmarkIcon, TrashIcon } from './Icons';

// ShareButtons Component (defined within the same file)
const ShareButtons: React.FC = () => {
    const icons = [<FacebookIcon />, <InstagramIcon />, <RedditIcon />, <XIcon />, <WhatsAppIcon />];
    return (
        <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-400">Share:</span>
            {icons.map((icon, index) => (
                <motion.a 
                    key={index} 
                    href="#" 
                    className="text-gray-400 hover:text-gold transition-colors"
                    whileHover={{ scale: 1.2, y: -2 }}
                >
                    {React.cloneElement(icon, { className: 'w-5 h-5' })}
                </motion.a>
            ))}
        </div>
    );
};

// ContentCard Component (defined within the same file)
interface ContentCardProps {
    item: ContentItem;
    index: number;
    isAdmin: boolean;
    onDelete: (id: string, type: ContentType) => void;
}
const ContentCard: React.FC<ContentCardProps> = ({ item, index, isAdmin, onDelete }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.1,
            },
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            className="group relative overflow-hidden rounded-xl glassmorphism p-px"
        >
            <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFD700_0%,#111_50%,#FFD700_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <div className="relative h-full w-full rounded-xl bg-surface p-6 flex flex-col">
                {isAdmin && (
                    <button 
                        onClick={() => onDelete(item.id, item.type)}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-gray-300 hover:bg-crimson hover:text-white transition-all duration-300"
                        aria-label="Delete item"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                )}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg mb-4">
                    <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <h3 className="text-2xl font-bold font-serif text-gold">{item.title}</h3>
                <p className="mt-2 text-gray-400 flex-grow">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                        <span key={tag} className="text-xs text-gold bg-gold/10 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                <div className="mt-6 flex justify-between items-center">
                    <button className="px-5 py-2 bg-gold/20 text-gold rounded-md text-sm hover:bg-gold hover:text-black transition-all duration-300">
                        {item.type === 'DOCUMENTARY' ? 'Watch Now' : 'Read More'}
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gold transition-colors">
                        <BookmarkIcon className="w-6 h-6"/>
                    </button>
                </div>
                <div className="mt-6 border-t border-gold/20 pt-4">
                    <ShareButtons />
                </div>
            </div>
        </motion.div>
    );
};


// Main ContentSection Component
interface ContentSectionProps {
    id: string;
    title: string;
    items: ContentItem[];
    isAdmin: boolean;
    onDeleteContent: (id: string, type: ContentType) => void;
}
const ContentSection: React.FC<ContentSectionProps> = ({ id, title, items, isAdmin, onDeleteContent }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <section id={id} ref={ref} className="py-20 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2 
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold font-serif text-center mb-12 text-gold"
                >
                    {title}
                </motion.h2>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {items.map((item, index) => (
                        <ContentCard key={item.id} item={item} index={index} isAdmin={isAdmin} onDelete={onDeleteContent}/>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ContentSection;