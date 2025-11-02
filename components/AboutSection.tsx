import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';
import { SAGAR_SAHU_ADMIN } from '../constants';

interface AboutSectionProps {
    user: User;
}

const AboutSection: React.FC<AboutSectionProps> = ({ user }) => (
    <section id="about" className="py-20 md:py-32 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto"
            >
                <h2 className="text-4xl md:text-5xl font-bold font-serif mb-8 text-gold">
                    About The Storyteller
                </h2>
                <img 
                    src={user.avatar} 
                    alt={user.username} 
                    className="w-40 h-40 rounded-full mx-auto mb-8 border-4 border-gold shadow-lg object-cover"
                />
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    Sagar Sahu is a visionary storyteller weaving narratives that transcend genre and reality. With a passion for exploring the depths of human nature against epic, cinematic backdrops, his work ranges from mind-bending cyberpunk thrillers to sprawling space operas and insightful documentaries on the future of technology.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                    Drawing inspiration from philosophy, science, and the timeless art of myth-making, Sagar crafts worlds that are both fantastical and deeply resonant. His goal is not just to entertain, but to challenge perspectives and ignite the imagination of his readers, inviting them on journeys that linger long after the final page is turned.
                </p>
            </motion.div>
        </div>
    </section>
);

export default AboutSection;
