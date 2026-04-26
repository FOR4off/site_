import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { API_URL } from '../App';

const Team = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/team`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setMembers(data.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <section id="team" className="team-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <span className="section-badge">Команда</span>
                    <h2 className="section-title">
                        Люди, которые создают<br />
                        <span className="gradient-text">магию</span>
                    </h2>
                </motion.div>

                <div className="team-grid">
                    {members.map((member, index) => (
                        <motion.div
                            key={member.id}
                            className="team-card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -15 }}
                        >
                            <div className="team-photo-wrapper">
                                <div className="team-photo">
                                    <img 
                                        src={member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=300&background=1a1a1a&color=00ffff`} 
                                        alt={member.name} 
                                    />
                                </div>
                                <div className="team-photo-glow"></div>
                            </div>
                            
                            <div className="team-info">
                                <h3>{member.name}</h3>
                                <span className="team-position">{member.position}</span>
                                {member.bio && <p>{member.bio}</p>}
                                
                                {member.skills && (
                                    <div className="team-skills">
                                        {member.skills.map((skill, i) => (
                                            <span key={i} className="skill-tag">{skill}</span>
                                        ))}
                                    </div>
                                )}
                                
                                {member.social && (
                                    <div className="team-social">
                                        {member.social.linkedin && (
                                            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                                                <i className="bi bi-linkedin"></i>
                                            </a>
                                        )}
                                        {member.social.github && (
                                            <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                                                <i className="bi bi-github"></i>
                                            </a>
                                        )}
                                        {member.social.telegram && (
                                            <a href={member.social.telegram} target="_blank" rel="noopener noreferrer">
                                                <i className="bi bi-telegram"></i>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;