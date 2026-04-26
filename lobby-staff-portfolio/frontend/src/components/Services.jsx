import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { API_URL } from '../App';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/services`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setServices(data.data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="services" className="services-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <span className="section-badge">Услуги</span>
                    <h2 className="section-title">
                        Что мы <span className="gradient-text">делаем</span>
                    </h2>
                    <p className="section-subtitle">
                        Полный спектр услуг по разработке цифровых продуктов
                    </p>
                </motion.div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <motion.div
                        className="services-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {services.map(service => (
                            <motion.div
                                key={service.id}
                                className="service-card glass-card"
                                variants={cardVariants}
                                whileHover={{ 
                                    y: -10,
                                    boxShadow: '0 20px 60px rgba(0, 255, 255, 0.15)'
                                }}
                            >
                                <div className="service-icon-wrapper">
                                    <i className={`bi ${service.icon}`}></i>
                                </div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                                
                                {service.features && (
                                    <ul className="service-features">
                                        {service.features.map((feature, i) => (
                                            <li key={i}>
                                                <i className="bi bi-check2-circle"></i>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                
                                {service.priceStart && (
                                    <div className="service-price">
                                        от {service.priceStart.toLocaleString('ru-RU')} ₽
                                    </div>
                                )}
                                
                                <a href="#contact" className="service-link">
                                    Заказать <i className="bi bi-arrow-right"></i>
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Services;