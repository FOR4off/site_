import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 150;
        
        class Particle {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = Math.random() * 5;
                this.size = 2 / this.z;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.8 + 0.2;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.z -= 0.02;
                
                if (this.z <= 0 || 
                    this.x < 0 || this.x > canvas.width || 
                    this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
            
            draw(ctx) {
                const scale = 1 / this.z;
                const x = this.x;
                const y = this.y;
                
                ctx.beginPath();
                ctx.arc(x, y, scale * 2, 0, Math.PI * 2);
                
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, scale * 2);
                gradient.addColorStop(0, `rgba(0, 255, 255, ${this.opacity * scale})`);
                gradient.addColorStop(1, 'rgba(157, 0, 255, 0)');
                
                ctx.fillStyle = gradient;
                ctx.fill();
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        const animate = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });
            
            // Соединяем близкие частицы
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 255, 255, ${0.15 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        };
        
        const animationId = requestAnimationFrame(animate);
        
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="hero-section">
            <canvas ref={canvasRef} className="hero-canvas" />
            
            <div className="hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <motion.div
                        className="hero-badge"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <span className="badge-dot"></span>
                        Топ-10 digital-агентств 2026
                    </motion.div>
                    
                    <h1 className="hero-title">
                        <span className="gradient-text">LOBBY_STAFF</span>
                        <br />
                        Создаём цифровые
                        <br />
                        <span className="hero-title-outline">вселенные</span>
                    </h1>
                    
                    <p className="hero-subtitle">
                        Разрабатываем продукты, которые меняют рынок.
                        <br />
                        От идеи до масштабирования — полный цикл разработки.
                    </p>
                    
                    <div className="hero-buttons">
                        <motion.a
                            href="#portfolio"
                            className="btn-neon"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 255, 255, 0.8)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className="bi bi-rocket-takeoff me-2"></i>
                            Смотреть портфолио
                        </motion.a>
                        
                        <motion.a
                            href="#contact"
                            className="btn-glass"
                            whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 255, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className="bi bi-chat-dots me-2"></i>
                            Обсудить проект
                        </motion.a>
                    </div>
                    
                    {/* Статистика */}
                    <motion.div
                        className="hero-stats"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <div className="stat-item">
                            <span className="stat-number">150+</span>
                            <span className="stat-label">Проектов</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">5 лет</span>
                            <span className="stat-label">На рынке</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">98%</span>
                            <span className="stat-label">Довольных клиентов</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
            
            {/* Скролл-индикатор */}
            <motion.div
                className="scroll-indicator"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span>Листайте вниз</span>
                <i className="bi bi-chevron-down"></i>
            </motion.div>
        </section>
    );
};

export default Hero;