import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { API_URL } from '../App';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                setStatus({ type: 'success', message: data.message });
                setFormData({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' });
            } else {
                setStatus({ type: 'error', message: data.error || 'Ошибка отправки' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Ошибка соединения с сервером' });
        } finally {
            setLoading(false);
        }
    };

    const services = ['Веб-разработка', 'Мобильная разработка', 'UI/UX Дизайн', 'E-commerce', 'CRM системы', 'Брендинг'];
    const budgets = ['До 500 000 ₽', '500 000 – 1 000 000 ₽', '1 000 000 – 3 000 000 ₽', 'Более 3 000 000 ₽', 'Обсуждается'];

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <div className="row">
                    <motion.div
                        className="col-lg-5"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="section-badge">Контакты</span>
                        <h2 className="section-title">
                            Давайте обсудим<br />
                            <span className="gradient-text">ваш проект</span>
                        </h2>
                        <p className="contact-info-text">
                            Заполните форму или свяжитесь с нами удобным способом. 
                            Мы ответим в течение 2 часов.
                        </p>
                        
                        <div className="contact-direct">
                            <a href="mailto:hello@lobbystaff.ru" className="contact-link-item">
                                <i className="bi bi-envelope"></i>
                                <div>
                                    <span>Email</span>
                                    <strong>hello@lobbystaff.ru</strong>
                                </div>
                            </a>
                            <a href="tel:+79991234567" className="contact-link-item">
                                <i className="bi bi-telephone"></i>
                                <div>
                                    <span>Телефон</span>
                                    <strong>+7 (999) 123-45-67</strong>
                                </div>
                            </a>
                            <a href="https://t.me/lobbystaff" className="contact-link-item" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-telegram"></i>
                                <div>
                                    <span>Telegram</span>
                                    <strong>@lobbystaff</strong>
                                </div>
                            </a>
                        </div>
                    </motion.div>
                    
                    <motion.div
                        className="col-lg-7"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="contact-form glass-card">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Имя *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control-custom"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Александр"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control-custom"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="hello@company.ru"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Телефон</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-control-custom"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+7 (___) ___-__-__"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Компания</label>
                                    <input
                                        type="text"
                                        name="company"
                                        className="form-control-custom"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="ООО Компания"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Интересует услуга</label>
                                    <select
                                        name="service"
                                        className="form-control-custom"
                                        value={formData.service}
                                        onChange={handleChange}
                                    >
                                        <option value="">Выберите услугу</option>
                                        {services.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Бюджет</label>
                                    <select
                                        name="budget"
                                        className="form-control-custom"
                                        value={formData.budget}
                                        onChange={handleChange}
                                    >
                                        <option value="">Выберите бюджет</option>
                                        {budgets.map(b => (
                                            <option key={b} value={b}>{b}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Сообщение *</label>
                                    <textarea
                                        name="message"
                                        className="form-control-custom"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Опишите ваш проект..."
                                    ></textarea>
                                </div>
                            </div>
                            
                            {status.message && (
                                <div className={`alert ${status.type === 'success' ? 'alert-success-custom' : 'alert-error-custom'}`}>
                                    {status.message}
                                </div>
                            )}
                            
                            <motion.button
                                type="submit"
                                className="btn-neon w-100 mt-3"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Отправка...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-send me-2"></i>
                                        Отправить заявку
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;