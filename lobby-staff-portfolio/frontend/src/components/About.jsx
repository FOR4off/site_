import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    const stats = [
        { number: '150+', label: 'Завершённых проектов' },
        { number: '50+', label: 'Клиентов по всему миру' },
        { number: '5 лет', label: 'На рынке разработки' },
        { number: '24/7', label: 'Поддержка клиентов' },
    ];

    const values = [
        { icon: 'bi-lightning-charge', title: 'Скорость', desc: 'Быстрая разработка без потери качества' },
        { icon: 'bi-shield-check', title: 'Надёжность', desc: 'Гарантируем результат и соблюдение сроков' },
        { icon: 'bi-gem', title: 'Качество', desc: 'Код проходит строгий code review' },
        { icon: 'bi-people', title: 'Команда', desc: 'Опытные специалисты с горящими глазами' },
    ];

    return (
        <section id="about" className="about-section">
            <div className="container">
                <div className="row align-items-center">
                    <motion.div
                        className="col-lg-6"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="section-badge">О компании</span>
                        <h2 className="section-title">
                            Мы — <span className="gradient-text">LOBBY_STAFF</span>
                        </h2>
                        <p className="about-text">
                            Команда профессионалов, которая создаёт digital-продукты 
                            с фокусом на результат. Мы объединяем стратегию, дизайн 
                            и технологии, чтобы бизнес наших клиентов рос.
                        </p>
                        <p className="about-text">
                            Каждый проект для нас — это партнёрство. Мы погружаемся 
                            в бизнес клиента, изучаем аудиторию и предлагаем решения, 
                            которые действительно работают.
                        </p>
                        
                        <div className="about-stats">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    className="about-stat"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="stat-number">{stat.number}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    
                    <motion.div
                        className="col-lg-6"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="values-grid">
                            {values.map((value, i) => (
                                <motion.div
                                    key={i}
                                    className="value-card glass-card"
                                    whileHover={{ y: -5 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <i className={`bi ${value.icon}`}></i>
                                    <h4>{value.title}</h4>
                                    <p>{value.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;