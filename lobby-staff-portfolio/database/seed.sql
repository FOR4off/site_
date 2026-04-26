USE lobby_staff_db;

-- Категории
INSERT INTO categories (name, slug, description, icon) VALUES
('Веб-разработка', 'web-development', 'Современные веб-приложения любой сложности', 'bi-globe'),
('Мобильные приложения', 'mobile-apps', 'Нативные и кросс-платформенные решения', 'bi-phone'),
('UI/UX Дизайн', 'ui-ux-design', 'Исследования, прототипирование, дизайн-системы', 'bi-palette'),
('E-commerce', 'ecommerce', 'Интернет-магазины и маркетплейсы', 'bi-cart'),
('CRM системы', 'crm-systems', 'Автоматизация бизнес-процессов', 'bi-graph-up'),
('Брендинг', 'branding', 'Айдентика и фирменный стиль', 'bi-stars');

-- Проекты
INSERT INTO projects (title, slug, category, description, image_url, technologies, client, featured) VALUES
('FinFlow Platform', 'finflow-platform', 'Веб-разработка', 
'Финтех-платформа для управления инвестициями с AI-аналитикой', 
'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
'["React", "Python", "PostgreSQL", "AWS", "Docker"]',
'FinCorp International', TRUE),

('FoodDash App', 'fooddash-app', 'Мобильные приложения',
'Приложение для доставки еды с real-time трекингом',
'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
'["Flutter", "Firebase", "Google Maps API", "Stripe"]',
'FoodDash Inc.', TRUE),

('DesignPro System', 'designpro-system', 'UI/UX Дизайн',
'Комплексная дизайн-система для enterprise-продуктов',
'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
'["Figma", "Storybook", "React", "TypeScript"]',
'DesignLab Agency', TRUE),

('MarketHub E-commerce', 'markethub-ecommerce', 'E-commerce',
'Мультивендорный маркетплейс с AI-рекомендациями',
'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
'["Next.js", "Node.js", "MongoDB", "Elasticsearch"]',
'MarketHub Group', TRUE),

('SalesFlow CRM', 'salesflow-crm', 'CRM системы',
'Кастомная CRM для B2B-продаж с воронками',
'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
'["Vue.js", "Python", "PostgreSQL", "Redis"]',
'SalesTech Solutions', FALSE),

('BrandUp Identity', 'brandup-identity', 'Брендинг',
'Полный ребрендинг технологического стартапа',
'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
'["Adobe Suite", "Figma", "After Effects"]',
'TechVentures', FALSE);

-- Услуги
INSERT INTO services (title, slug, description, icon_class, features, price_start) VALUES
('Веб-разработка', 'web-development', 
'Создаем масштабируемые веб-приложения на современном стеке технологий',
'bi-globe',
'["SPA и PWA приложения", "Микросервисная архитектура", "API разработка", "Cloud-native решения"]',
500000),

('Мобильная разработка', 'mobile-development',
'Нативные и кроссплатформенные приложения для iOS и Android',
'bi-phone',
'["iOS (Swift)", "Android (Kotlin)", "Flutter", "React Native"]',
600000),

('UI/UX Дизайн', 'ui-ux-design',
'Проектируем удобные интерфейсы на основе данных и исследований',
'bi-palette',
'["UX-исследования", "Прототипирование", "Дизайн-системы", "Юзабилити-тестирование"]',
200000);

-- Команда
INSERT INTO team_members (name, slug, position, bio, photo_url, social_links, skills) VALUES
('Александр Волков', 'alexander-volkov', 'CEO & Founder',
'15 лет в IT. Построил digital-отдел в крупном холдинге.',
'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
'{"linkedin": "#", "github": "#", "telegram": "#"}',
'["Стратегия", "Управление", "Архитектура"]'),

('Елена Соколова', 'elena-sokolova', 'Head of Design',
'Ex-Art Director в международном агентстве. 20+ реализованных проектов.',
'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
'{"linkedin": "#", "behance": "#", "dribbble": "#"}',
'["UI/UX", "Брендинг", "Исследования"]'),

('Михаил Петров', 'mikhail-petrov', 'Tech Lead',
'Full-stack разработчик. Спикер конференций. Open-source контрибьютор.',
'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
'{"linkedin": "#", "github": "#", "habr": "#"}',
'["Python", "React", "DevOps", "Cloud"]');

-- Отзывы
INSERT INTO testimonials (client_name, client_position, company, text, rating, is_approved) VALUES
('Игорь Смирнов', 'CEO', 'FinCorp International',
'LOBBY_STAFF создали платформу, которая увеличила нашу эффективность на 200%. Профессиональный подход и внимание к деталям.',
5, TRUE),

('Анна Кузнецова', 'Product Manager', 'FoodDash Inc.',
'Превзошли все ожидания. Приложение работает безупречно, дизайн современный.',
5, TRUE),

('Дмитрий Морозов', 'CTO', 'SalesTech Solutions',
'Отличная команда профессионалов. Реализовали сложный проект точно в срок.',
5, TRUE);

-- Настройки
INSERT INTO settings (setting_key, setting_value) VALUES
('site_title', 'LOBBY_STAFF | Создаём цифровые вселенные'),
('site_description', 'Разработка веб-приложений, мобильных приложений и дизайн'),
('contact_email', 'hello@lobbystaff.ru'),
('contact_phone', '+7 (999) 123-45-67'),
('contact_address', 'Москва, ул. Тверская, 15'),
('social_telegram', 'https://t.me/lobbystaff'),
('social_vk', 'https://vk.com/lobbystaff'),
('social_habr', 'https://habr.com/ru/users/lobbystaff');