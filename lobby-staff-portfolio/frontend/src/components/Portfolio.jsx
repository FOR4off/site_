import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../App';

const Portfolio = () => {
    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Загрузка проектов
        fetch(`${API_URL}/projects`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProjects(data.data);
                    // Уникальные категории
                    const cats = [...new Set(data.data.map(p => p.category))];
                    setCategories(cats);
                }
            })
            .catch(err => console.error('Error loading projects:', err))
            .finally(() => setLoading(false));
    }, []);

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <section id="portfolio" className="portfolio-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <span className="section-badge">Портфолио</span>
                    <h2 className="section-title">
                        Наши <span className="gradient-text">проекты</span>
                    </h2>
                    <p className="section-subtitle">
                        От стартапов до enterprise-решений — мы создаём продукты, которые работают
                    </p>
                </motion.div>

                {/* Фильтры */}
                <motion.div
                    className="filter-buttons"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <button
                        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        Все проекты
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Сетка проектов */}
                {loading ? (
                    <div className="portfolio-loading">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <motion.div className="portfolio-grid" layout>
                        <AnimatePresence mode='popLayout'>
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    className="portfolio-card"
                                    layout
                                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: -30 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    onClick={() => setSelectedProject(project)}
                                    whileHover={{ y: -10 }}
                                >
                                    <div className="portfolio-card-image">
                                        <img src={project.image || 'https://via.placeholder.com/600x400/1a1a1a/00ffff?text=Project'} alt={project.title} />
                                        <div className="portfolio-card-overlay">
                                            <span>Смотреть кейс <i className="bi bi-arrow-right"></i></span>
                                        </div>
                                        {project.featured && (
                                            <span className="featured-badge">
                                                <i className="bi bi-star-fill"></i> Топ
                                            </span>
                                        )}
                                    </div>
                                    <div className="portfolio-card-content">
                                        <span className="portfolio-card-category">{project.category}</span>
                                        <h3 className="portfolio-card-title">{project.title}</h3>
                                        <p className="portfolio-card-client">{project.client}</p>
                                        {project.technologies && (
                                            <div className="portfolio-card-tech">
                                                {project.technologies.slice(0, 3).map((tech, i) => (
                                                    <span key={i} className="tech-tag">{tech}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            {/* Модальное окно проекта */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="project-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className="project-modal"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button className="modal-close" onClick={() => setSelectedProject(null)}>
                                <i className="bi bi-x-lg"></i>
                            </button>
                            <div className="modal-image">
                                <img src={selectedProject.image} alt={selectedProject.title} />
                            </div>
                            <div className="modal-content">
                                <span className="modal-category">{selectedProject.category}</span>
                                <h2>{selectedProject.title}</h2>
                                <p>{selectedProject.description}</p>
                                <div className="modal-tech">
                                    {selectedProject.technologies?.map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                                <a href={`/projects/${selectedProject.slug}`} className="btn-neon mt-3">
                                    Подробнее о проекте
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Portfolio;