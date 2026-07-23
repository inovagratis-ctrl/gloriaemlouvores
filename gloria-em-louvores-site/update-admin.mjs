import { Pool } from 'pg';

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL, 
  ssl: { rejectUnauthorized: false } 
});

const newHash = '$2b$10$6Fnzcruvty0X6bW4wgZ01.SVhCQjk2Eu8hlthbpH78eCDV8HPtnuW';

await pool.query('UPDATE admin_users SET password_hash = $1 WHERE username = $2', [newHash, 'admin']);
console.log('Updated');
await pool.end();