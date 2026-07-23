const { Pool } = require('pg');
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL, 
  ssl: { rejectUnauthorized: false } 
});

const newHash = '$2b$10$6Fnzcruvty0X6bW4wgZ01.SVhCQjk2Eu8hlthbpH78eCDV8HPtnuW';

pool.query('UPDATE admin_users SET password_hash = $1 WHERE username = $2', [newHash, 'admin'])
  .then(() => console.log('Updated'))
  .catch(console.error)
  .finally(() => pool.end());