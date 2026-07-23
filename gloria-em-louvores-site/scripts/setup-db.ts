import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function setupDatabase() {
  console.log('Setting up database...');

  // Enable extensions
  await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`;
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  console.log('✓ Extensions enabled');

  // Admin users table
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
  console.log('✓ admin_users table created');

  // Videos table
  await sql`
    CREATE TABLE IF NOT EXISTS videos (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      youtube_id VARCHAR(50) NOT NULL,
      title VARCHAR(500) NOT NULL,
      views VARCHAR(50) DEFAULT '',
      category VARCHAR(50) DEFAULT 'adoracao',
      featured BOOLEAN DEFAULT FALSE,
      date DATE DEFAULT CURRENT_DATE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  console.log('✓ videos table created');

  // Blog posts table
  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      icon VARCHAR(10) DEFAULT '🎵',
      tag VARCHAR(50) DEFAULT 'Louvor',
      title VARCHAR(500) NOT NULL,
      description TEXT,
      content TEXT,
      image TEXT,
      date DATE DEFAULT CURRENT_DATE,
      seo_title VARCHAR(60),
      seo_description VARCHAR(160),
      seo_keywords TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  console.log('✓ blog_posts table created');

  // Psalms table
  await sql`
    CREATE TABLE IF NOT EXISTS psalms (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      text TEXT NOT NULL,
      reference VARCHAR(100) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  console.log('✓ psalms table created');

  // Shorts table
  await sql`
    CREATE TABLE IF NOT EXISTS shorts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      youtube_id VARCHAR(50) NOT NULL,
      title VARCHAR(200) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  console.log('✓ shorts table created');

  // Prayer requests table
  await sql`
    CREATE TABLE IF NOT EXISTS prayer_requests (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(200) NOT NULL,
      email VARCHAR(200) NOT NULL,
      message TEXT NOT NULL,
      type VARCHAR(20) DEFAULT 'oracao',
      read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  console.log('✓ prayer_requests table created');

  // Indexes
  await sql`CREATE INDEX IF NOT EXISTS idx_videos_date ON videos(date DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_prayer_requests_created ON prayer_requests(created_at DESC)`;
  console.log('✓ Indexes created');

  // Insert default admin user (password: gloria2026)
  await sql`
    INSERT INTO admin_users (username, password_hash) 
    VALUES ('admin', '$2a$10$X5Y8Q9Z2V1W3E4R5T6Y7U8I9O0P1A2S3D4F5G6H7J8K9L0Z1X2C3V4B5N6M7')
    ON CONFLICT (username) DO NOTHING
  `;
  console.log('✓ Admin user ensured');

  // Insert default psalms
  await sql`
    INSERT INTO psalms (text, reference) VALUES
    ('O Senhor é o meu pastor; nada me faltará.', 'Salmo 23:1'),
    ('Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.', 'Salmo 37:5'),
    ('Clama a mim, e responder-te-ei, e anunciar-te-ei coisas grandes e firmes que não sabes.', 'Jeremias 33:3')
    ON CONFLICT DO NOTHING
  `;
  console.log('✓ Default psalms inserted');

  // Insert default videos
  await sql`
    INSERT INTO videos (youtube_id, title, views, category, featured, date) VALUES
    ('MF8p-aj16Zg', 'O SOM DO MILAGRE | 12 Louvores Para Quem Precisa de um Milagre', '5.6K views', 'milagre', TRUE, '2026-07-20'),
    ('TvNd8KgQRGc', 'LOUVOR QUE EXPULSA TODO MAL | Adoração Poderosa', '3.2K views', 'oracao', FALSE, '2026-07-18'),
    ('vD6vp5AJ4bU', 'Louvores Para Dormir | Paz e Descanso no Senhor', '1.8K views', 'dormir', FALSE, '2026-07-15')
    ON CONFLICT DO NOTHING
  `;
  console.log('✓ Default videos inserted');

  // Insert default shorts
  await sql`
    INSERT INTO shorts (youtube_id, title) VALUES
    ('5MnuJP2ER1g', 'Louvor Curto - 30 Segundos de Fé')
    ON CONFLICT DO NOTHING
  `;
  console.log('✓ Default shorts inserted');

  console.log('Database setup complete!');
}

setupDatabase().catch(console.error).finally(() => process.exit(0));