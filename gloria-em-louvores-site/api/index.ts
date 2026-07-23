import { neon } from '@neondatabase/serverless';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const dbUrl = new URL(process.env.DATABASE_URL!);
dbUrl.searchParams.set('client_encoding', 'utf8');

const sql = neon(dbUrl.toString());
const pool = new Pool({ 
  connectionString: dbUrl.toString(), 
  ssl: { rejectUnauthorized: false },
});

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'AIzaSyDKiaH4XDRmHP7CffH7fwLEO7os-_6jm60';
const CHANNEL_HANDLE = 'gloriaemlouvores';

async function parseBody(req: any): Promise<any> {
  if (req.body && typeof req.body === 'object') return req.body;
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk: any) => { data += chunk; });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch { resolve({}); }
    });
  });
}

async function updateRow(table: string, id: string, fields: Record<string, any>): Promise<any> {
  const entries = Object.entries(fields).filter(([k]) => k !== 'id');
  if (entries.length === 0) return null;
  
  const setClause = entries.map(([k], i) => `${k.replace(/([A-Z])/g, '_$1').toLowerCase()} = $${i + 2}`).join(', ');
  const values = entries.map(([, v]) => v);
  const query = `UPDATE ${table} SET ${setClause} WHERE id = $1 RETURNING *`;
  
  const result = await pool.query(query, [id, ...values]);
  return result.rows[0] || null;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  const sendJson = (data: any, status = 200) => {
    const json = JSON.stringify(data);
    res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(Buffer.from(json, 'utf8'));
  };

  if (req.method === 'OPTIONS') return sendJson({}, 200);

  const { method, query } = req;
  const parsedBody = await parseBody(req);
  req.body = parsedBody;
  const { id: queryId, resource } = query;

  const url = req.url || '';
  const pathMatch = url.match(/\/api\/(\w+)(?:\/([^/?]+))?(?:\?.*)?$/);
  const pathResource = pathMatch?.[1];
  const pathId = pathMatch?.[2];

  const resourceName = resource || pathResource || '';
  const id = queryId || pathId || '';

  try {
    // ADMIN AUTH
    if (resourceName === 'admin-auth' || query.resource === 'admin-auth') {
      if (req.method !== 'POST') return sendJson({ error: 'Method not allowed' }, 405);
      const { username, password } = req.body;
      if (!username || !password) return sendJson({ error: 'Username and password required' }, 400);
      
      const result = await pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);
      if (result.rows.length === 0) return sendJson({ error: 'Invalid credentials' }, 401);
      
      const user = result.rows[0];
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) return sendJson({ error: 'Invalid credentials' }, 401);
      
      const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
      return sendJson({ token, user: { id: user.id, username: user.username } });
    }

    // VIDEOS
    if (resourceName === 'videos' || req.query.resource === 'videos') {
      if (req.method === 'GET') {
        if (id) {
          const result = await pool.query('SELECT * FROM videos WHERE id = $1', [id]);
          return result.rows.length ? sendJson(result.rows[0]) : sendJson({ error: 'Not found' }, 404);
        }
        const result = await pool.query('SELECT * FROM videos ORDER BY date DESC, created_at DESC');
        return sendJson(result.rows);
      }
      if (req.method === 'POST') {
        const { youtubeId, title, views, category, featured, date } = req.body;
        const result = await pool.query(
          'INSERT INTO videos (youtube_id, title, views, category, featured, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
          [youtubeId, title, views || '', category || 'adoracao', featured || false, date || new Date().toISOString().split('T')[0]]
        );
        return sendJson(result.rows[0], 201);
      }
      if (req.method === 'PATCH' && id) {
        const updated = await updateRow('videos', id, req.body);
        return updated ? sendJson(updated) : sendJson({ error: 'Not found' }, 404);
      }
      if (req.method === 'DELETE' && id) {
        await pool.query('DELETE FROM videos WHERE id = $1', [id]);
        return res.status(204).end();
      }
    }

    // BLOG POSTS
    if (resourceName === 'blog' || req.query.resource === 'blog') {
      if (req.method === 'GET') {
        if (id) {
          const result = await pool.query('SELECT * FROM blog_posts WHERE id = $1', [id]);
          return result.rows.length ? sendJson(result.rows[0]) : sendJson({ error: 'Not found' }, 404);
        }
        const result = await pool.query('SELECT * FROM blog_posts ORDER BY date DESC, created_at DESC');
        return sendJson(result.rows);
      }
      if (req.method === 'POST') {
        const { icon, tag, title, description, content, image, date, seoTitle, seoDescription, seoKeywords } = req.body;
        const result = await pool.query(`
          INSERT INTO blog_posts (icon, tag, title, description, content, image, date, seo_title, seo_description, seo_keywords)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *
        `, [icon || '🎵', tag || 'Louvor', title, description, content || '', image || '', date || new Date().toISOString().split('T')[0], seoTitle || '', seoDescription || '', seoKeywords || '']);
        return sendJson(result.rows[0], 201);
      }
      if (req.method === 'PATCH' && id) {
        const updated = await updateRow('blog_posts', id, req.body);
        return updated ? sendJson(updated) : sendJson({ error: 'Not found' }, 404);
      }
      if (req.method === 'DELETE' && id) {
        await pool.query('DELETE FROM blog_posts WHERE id = $1', [id]);
        return res.status(204).end();
      }
    }

    // PSALMS
    if (resourceName === 'psalms' || req.query.resource === 'psalms') {
      if (req.method === 'GET') {
        if (id) {
          const result = await pool.query('SELECT * FROM psalms WHERE id = $1', [id]);
          return result.rows.length ? sendJson(result.rows[0]) : sendJson({ error: 'Not found' }, 404);
        }
        const result = await pool.query('SELECT * FROM psalms ORDER BY created_at DESC');
        return sendJson(result.rows);
      }
      if (req.method === 'POST') {
        const { text, reference } = req.body;
        const result = await pool.query('INSERT INTO psalms (text, reference) VALUES ($1, $2) RETURNING *', [text, reference]);
        return sendJson(result.rows[0], 201);
      }
      if (req.method === 'PATCH' && id) {
        const updated = await updateRow('psalms', id, req.body);
        return updated ? sendJson(updated) : sendJson({ error: 'Not found' }, 404);
      }
      if (req.method === 'DELETE' && id) {
        await pool.query('DELETE FROM psalms WHERE id = $1', [id]);
        return res.status(204).end();
      }
    }

    // SHORTS
    if (resourceName === 'shorts' || req.query.resource === 'shorts') {
      if (req.method === 'GET') {
        if (id) {
          const result = await pool.query('SELECT * FROM shorts WHERE id = $1', [id]);
          return result.rows.length ? sendJson(result.rows[0]) : sendJson({ error: 'Not found' }, 404);
        }
        const result = await pool.query('SELECT * FROM shorts ORDER BY created_at DESC');
        return sendJson(result.rows);
      }
      if (req.method === 'POST') {
        const { youtubeId, title } = req.body;
        const result = await pool.query('INSERT INTO shorts (youtube_id, title) VALUES ($1, $2) RETURNING *', [youtubeId, title]);
        return sendJson(result.rows[0], 201);
      }
      if (req.method === 'PATCH' && id) {
        const updated = await updateRow('shorts', id, req.body);
        return updated ? sendJson(updated) : sendJson({ error: 'Not found' }, 404);
      }
      if (req.method === 'DELETE' && id) {
        await pool.query('DELETE FROM shorts WHERE id = $1', [id]);
        return res.status(204).end();
      }
    }

    // PRAYER REQUESTS
    if (resourceName === 'requests' || req.query.resource === 'requests') {
      if (req.method === 'GET') {
        if (id) {
          const result = await pool.query('SELECT * FROM prayer_requests WHERE id = $1', [id]);
          return result.rows.length ? sendJson(result.rows[0]) : sendJson({ error: 'Not found' }, 404);
        }
        const result = await pool.query('SELECT * FROM prayer_requests ORDER BY created_at DESC');
        return sendJson(result.rows);
      }
      if (req.method === 'POST') {
        const { name, email, message, type } = req.body;
        const result = await pool.query('INSERT INTO prayer_requests (name, email, message, type) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, message, type || 'oracao']);
        return sendJson(result.rows[0], 201);
      }
      if (req.method === 'PATCH' && id) {
        const updated = await updateRow('prayer_requests', id, req.body);
        return updated ? sendJson(updated) : sendJson({ error: 'Not found' }, 404);
      }
      if (req.method === 'DELETE' && id) {
        await pool.query('DELETE FROM prayer_requests WHERE id = $1', [id]);
        return res.status(204).end();
      }
    }

    // CHANNEL STATS
    if (resourceName === 'channel-stats' || req.query.resource === 'channel-stats') {
      if (req.method !== 'GET') return sendJson({ error: 'Method not allowed' }, 405);
      try {
        const channelsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=@${CHANNEL_HANDLE}&key=${YOUTUBE_API_KEY}`;
        const channelsRes = await fetch(channelsUrl);
        const channelsData = await channelsRes.json();

        if (channelsData.items && channelsData.items.length > 0) {
          const stats = channelsData.items[0].statistics;
          return sendJson({
            subscribers: parseInt(stats.subscriberCount || '0'),
            videos: parseInt(stats.videoCount || '0'),
            views: parseInt(stats.viewCount || '0'),
          });
        }
        return sendJson({ subscribers: 1470, videos: 107, views: 96530 });
      } catch (error) {
        console.error('Channel stats error:', error);
        return sendJson({ subscribers: 1470, videos: 107, views: 96530 });
      }
    }

    return sendJson({ error: 'Resource not found' }, 404);
  } catch (error) {
    console.error('API Error:', error);
    return sendJson({ error: 'Internal server error' }, 500);
  }
}