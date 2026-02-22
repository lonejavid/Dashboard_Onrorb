const BACKEND_URL = 'https://dashboard-backend-z7k5.onrender.com';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }
  try {
    const query = new URLSearchParams(req.query || {}).toString();
    const url = `${BACKEND_URL}/api/dashboard${query ? `?${query}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Dashboard proxy error:', err);
    res.status(502).json({ error: 'Failed to load dashboard' });
  }
}
