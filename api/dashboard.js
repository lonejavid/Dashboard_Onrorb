/**
 * Vercel serverless function: proxy /api/dashboard to the backend.
 * Set BACKEND_URL in Vercel Environment Variables (e.g. https://your-api.onrender.com).
 */
const BACKEND_URL = process.env.BACKEND_URL || '';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }
  if (!BACKEND_URL) {
    console.error('BACKEND_URL is not set');
    return res.status(503).json({ error: 'Backend URL not configured' });
  }
  try {
    const query = new URLSearchParams(req.query || {}).toString();
    const url = `${BACKEND_URL.replace(/\/$/, '')}/api/dashboard${query ? `?${query}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Dashboard proxy error:', err);
    res.status(502).json({ error: 'Failed to load dashboard' });
  }
}
