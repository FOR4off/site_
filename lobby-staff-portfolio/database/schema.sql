-- ============================================
-- LOBBY_STAFF PORTFOLIO DATABASE
-- ============================================

CREATE DATABASE IF NOT EXISTS lobby_staff_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE lobby_staff_db;

-- Проекты портфолио
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    full_description TEXT,
    image_url VARCHAR(500),
    gallery JSON,
    technologies JSON,
    client VARCHAR(255),
    client_website VARCHAR(255),
    completion_date DATE,
    featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_featured (featured),
    INDEX idx_slug (slug)
) ENGINE=InnoDB;

-- Категории проектов
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    sort_order INT DEFAULT 0
) ENGINE=InnoDB;

-- Услуги компании
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    detailed_description TEXT,
    icon_class VARCHAR(100),
    icon_image VARCHAR(500),
    features JSON,
    price_start DECIMAL(10,2),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Команда
CREATE TABLE team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    position VARCHAR(255),
    department VARCHAR(100),
    bio TEXT,
    photo_url VARCHAR(500),
    social_links JSON,
    skills JSON,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Отзывы клиентов
CREATE TABLE testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_position VARCHAR(255),
    company VARCHAR(255),
    company_logo VARCHAR(500),
    text TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    project_id INT,
    photo_url VARCHAR(500),
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Заявки с сайта
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    service_interest VARCHAR(100),
    budget_range VARCHAR(50),
    message TEXT,
    source VARCHAR(100),
    ip_address VARCHAR(45),
    is_read BOOLEAN DEFAULT FALSE,
    is_contacted BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_read (is_read)
) ENGINE=InnoDB;

-- Подписчики на рассылку
CREATE TABLE subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Настройки сайта
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'text'
) ENGINE=InnoDB;