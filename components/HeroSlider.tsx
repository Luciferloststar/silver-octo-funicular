

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ContentItem } from '../types';
import { MOCK_SLIDES } from '../constants';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const HeroSlider: React.FC = () => {
    const [[page, direction], setPage] = useState([0, 0]);
    const { scrollYProgress } = useScroll();
    const parallaxY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);

    const imageIndex = page % MOCK_SLIDES.length;

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setPage(([prevPage, _]) => [prevPage + 1, 1]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    
    const slide = MOCK_SLIDES[imageIndex];

    return (
        <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden text-white">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    style={{ y: parallaxY }}
                    className="absolute inset-0 bg-cover bg-center"
                >
                  <img src={slide.coverImage} alt={slide.title} className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 bg-black/60"></div>
                </motion.div>
            </AnimatePresence>
            
            <div className="relative z-10 text-center container mx-auto px-4">
                <motion.h1 
                    key={`title-${page}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-black font-serif text-gold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                >
                    {slide.title}
                </motion.h1>
                <motion.p 
                    key={`tagline-${page}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-4 text-xl md:text-2xl text-gray-300"
                >
                    {slide.tagline}
                </motion.p>
                <motion.button 
                    key={`button-${page}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-8 px-8 py-3 bg-gold text-black font-bold rounded-lg shadow-lg shadow-gold/20 hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300"
                >
                    Read Now
                </motion.button>
            </div>
            
            <div className="absolute z-20 top-1/2 -translate-y-1/2 left-4 md:left-10">
                <button onClick={() => paginate(-1)} className="p-2 rounded-full bg-black/30 hover:bg-gold hover:text-black transition-all">
                    <ChevronLeftIcon className="w-8 h-8" />
                </button>
            </div>
            <div className="absolute z-20 top-1/2 -translate-y-1/2 right-4 md:right-10">
                <button onClick={() => paginate(1)} className="p-2 rounded-full bg-black/30 hover:bg-gold hover:text-black transition-all">
                    <ChevronRightIcon className="w-8 h-8" />
                </button>
            </div>

            <div className="absolute z-20 bottom-10 left-1/2 -translate-x-1/2 flex space-x-2">
                {MOCK_SLIDES.map((_, i) => (
                    <div key={i} onClick={() => setPage([i, i > imageIndex ? 1 : -1])} className={`w-3 h-3 rounded-full cursor-pointer transition-all ${i === imageIndex ? 'bg-gold scale-125' : 'bg-gray-500'}`}></div>
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;