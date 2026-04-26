import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { API_URL } from '../App';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/testimonials`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setTestimonials(data.data);
            })
            .catch(err => console.error(err));
    }, []);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <i key={i} className={`bi ${i < rating ? 'bi-star-fill' : 'bi-star'}`}></i>
        ));
    };

    return (
        <section className="testimonials-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <span className="section-badge">Отзывы</span>
                    <h2 className="section-title">
                        Что говорят <span className="gradient-text">клиенты</span>
                    </h2>
                </motion.div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    className="testimonials-swiper"
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={item.id}>
                            <motion.div
                                className="testimonial-card glass-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="testimonial-stars">
                                    {renderStars(item.rating)}
                                </div>
                                <p className="testimonial-text">"{item.text}"</p>
                                <div className="testimonial-author">
                                    <img 
                                        src={item.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.client)}&size=60&background=00ffff&color=000`} 
                                        alt={item.client}
                                        className="testimonial-photo"
                                    />
                                    <div>
                                        <h4 className="testimonial-name">{item.client}</h4>
                                        <p className="testimonial-company">{item.company}</p>
                                    </div>
                                </div>
                                {item.companyLogo && (
                                    <img src={item.companyLogo} alt={item.company} className="testimonial-company-logo" />
                                )}
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;