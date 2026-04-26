import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ scrolled }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    
    const navLinks = [
        { href: '#portfolio', label: 'Портфолио' },
        { href: '#services', label: 'Услуги' },
        { href: '#about', label: 'О нас' },
        { href: '#team', label: 'Команда' },
        { href: '#contact', label: 'Контакты' },
    ];

    return (
        <motion.nav
            className={`navbar-custom ${scrolled ? 'navbar-scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="container">
                <a href="/" className="navbar-brand-custom">
                    <span className="logo-text">LOBBY</span>
                    <span className="logo-accent">_STAFF</span>
                </a>
                
                {/* Десктопное меню */}
                <div className="navbar-desktop">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="nav-link-custom">
                            {link.label}
                        </a>
                    ))}
                    <a href="#contact" className="btn-nav-cta">
                        Обсудить проект
                    </a>
                </div>
                
                {/* Мобильная кнопка */}
                <button 
                    className="mobile-toggle"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <span className={`hamburger ${mobileOpen ? 'active' : ''}`}></span>
                </button>
            </div>
            
            {/* Мобильное меню */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {navLinks.map(link => (
                            <a 
                                key={link.href} 
                                href={link.href}
                                className="mobile-link"
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;