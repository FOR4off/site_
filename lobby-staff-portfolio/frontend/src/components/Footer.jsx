import React, { useState } from 'react';
import { API_URL } from '../App';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    
    const handleSubscribe = async (e) => {
        e.preventDefault();
        
        try {
            const res = await fetch(`${API_URL}/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            
            const data = await res.json();
            if (data.success) {
                setSubscribed(true);
                setEmail('');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="row">
                        <div className="col-lg-4 mb-4">
                            <a href="/" className="footer-brand">
                                <span className="logo-text">LOBBY</span>
                                <span className="logo-accent">_STAFF</span>
                            </a>
                            <p className="footer-description">
                                Создаём цифровые продукты, которые меняют рынок. 
                                От стартапов до enterprise-решений.
                            </p>
                        </div>
                        
                        <div className="col-lg-2 col-md-4 mb-4">
                            <h5 className="footer-title">Навигация</h5>
                            <ul className="footer-links">
                                <li><a href="#portfolio">Портфолио</a></li>
                                <li><a href="#services">Услуги</a></li>
                                <li><a href="#about">О нас</a></li>
                                <li><a href="#team">Команда</a></li>
                            </ul>
                        </div>
                        
                        <div className="col-lg-3 col-md-4 mb-4">
                            <h5 className="footer-title">Услуги</h5>
                            <ul className="footer-links">
                                <li><a href="#services">Веб-разработка</a></li>
                                <li><a href="#services">Мобильные приложения</a></li>
                                <li><a href="#services">UI/UX Дизайн</a></li>
                                <li><a href="#services">Консалтинг</a></li>
                            </ul>
                        </div>
                        
                        <div className="col-lg-3 col-md-4 mb-4">
                            <h5 className="footer-title">Подписка</h5>
                            {subscribed ? (
                                <div className="subscribe-success">
                                    <i className="bi bi-check-circle-fill"></i> Спасибо за подписку!
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="subscribe-form">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Ваш email"
                                        required
                                        className="form-control-custom"
                                    />
                                    <button type="submit" className="btn-neon btn-sm w-100 mt-2">
                                        Подписаться
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; 2026 LOBBY_STAFF. Все права защищены.</p>
                    <div className="footer-social">
                        <a href="#" target="_blank"><i className="bi bi-telegram"></i></a>
                        <a href="#" target="_blank"><i className="bi bi-github"></i></a>
                        <a href="#" target="_blank"><i className="bi bi-linkedin"></i></a>
                        <a href="#" target="_blank"><i className="bi bi-dribbble"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;