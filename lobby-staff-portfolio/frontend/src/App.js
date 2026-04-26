import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import About from './components/About';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import ParticlesBackground from './components/Particles';
import { motion, AnimatePresence } from 'framer-motion';

// API Base URL
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
    const [loading, setLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Симуляция загрузки
        const timer = setTimeout(() => setLoading(false), 2000);
        
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="App">
            <CursorGlow />
            <ParticlesBackground />
            
            <AnimatePresence>
                {!loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Navbar scrolled={scrolled} />
                        
                        <main>
                            <Hero />
                            <Portfolio />
                            <Services />
                            <About />
                            <Team />
                            <Testimonials />
                            <Contact />
                        </main>
                        
                        <Footer />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;