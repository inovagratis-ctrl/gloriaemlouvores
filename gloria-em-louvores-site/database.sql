-- Create database tables for gloria-em-louvores
-- Run this in your Neon SQL editor

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    youtube_id VARCHAR(50) NOT NULL,
    title VARCHAR(500) NOT NULL,
    views VARCHAR(50),
    category VARCHAR(50) DEFAULT 'adoracao',
    featured BOOLEAN DEFAULT FALSE,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    icon VARCHAR(10) DEFAULT '🎵',
    tag VARCHAR(50) DEFAULT 'Louvor',
    title VARCHAR(500) NOT NULL,
    desc TEXT,
    content TEXT,
    image TEXT,
    date DATE DEFAULT CURRENT_DATE,
    seo_title VARCHAR(60),
    seo_description VARCHAR(160),
    seo_keywords TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Psalms table
CREATE TABLE IF NOT EXISTS psalms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT NOT NULL,
    reference VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Shorts table
CREATE TABLE IF NOT EXISTS shorts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    youtube_id VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Prayer requests / contact table
CREATE TABLE IF NOT EXISTS prayer_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(20) DEFAULT 'oracao',
    date TIMESTAMP DEFAULT NOW(),
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default admin user (password: gloria2026)
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', '$2a$10$X5Y8Q9Z2V1W3E4R5T6Y7U8I9O0P1A2S3D4F5G6H7J8K9L0Z1X2C3V4B5N6M7')
ON CONFLICT (username) DO NOTHING;

-- Insert default psalms
INSERT INTO psalms (text, reference) VALUES
('Louvarei ao Senhor em todo o tempo; o seu louvor estará continuamente na minha boca.', 'Salmo 34:1'),
('O Senhor é o meu pastor; nada me faltará.', 'Salmo 23:1'),
('Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.', 'Salmo 37:5')
ON CONFLICT DO NOTHING;

-- Insert default videos
INSERT INTO videos (youtube_id, title, views, category, featured, date) VALUES
('MF8p-aj16Zg', 'O SOM DO MILAGRE | 12 Louvores Para Quem Precisa de um Milagre', '5.6K views', 'milagre', true, '2026-07-20'),
('TvNd8KgQRGc', 'LOUVOR QUE MUDA A HISTÓRIA | Adoração Profunda', '3.2K views', 'adoracao', true, '2026-07-18'),
('vD6vp5AJ4bU', 'PAZ NO CAOS | Louvores Para Acalmar o Coração', '2.8K views', 'paz', true, '2026-07-15')
ON CONFLICT DO NOTHING;

-- Insert default shorts
INSERT INTO shorts (youtube_id, title) VALUES
('5MnuJP2ER1g', 'Deus está no controle')
ON CONFLICT DO NOTHING;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);
CREATE INDEX IF NOT EXISTS idx_videos_featured ON videos(featured);
CREATE INDEX IF NOT EXISTS idx_videos_date ON videos(date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_read ON prayer_requests(read);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_date ON prayer_requests(date DESC);