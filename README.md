# Shield Analytics Dashboard (React + Vite)

Investor-facing dashboard for user and platform metrics. Consumes the dashboard API (same origin or via `VITE_API_URL`).

## Setup

```bash
npm install
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Dev server (port 5173). Proxies `/api` to `http://localhost:3001`. |
| `npm run build` | Production build to `dist/`. |
| `npm run preview` | Preview production build locally. |

## Environment variables

| Variable | When | Description |
|----------|------|-------------|
| `VITE_API_URL` | Local (optional) | Backend base URL. Unset = use dev proxy to localhost:3001. |
| `BACKEND_URL` | Vercel only | **Required** on Vercel. Backend base URL for the `/api/dashboard` proxy (e.g. `https://your-api.onrender.com`). |

## Deploy to Vercel

1. Import the repo. Set **Root Directory** to `frontend` if the app lives in a subfolder.
2. **Environment Variables:** Add `BACKEND_URL` = your backend URL (e.g. `https://dashboard-backend-xxxx.onrender.com`, no trailing slash).
3. Do **not** set `VITE_API_URL` so the app uses same-origin `/api`; the serverless function `api/dashboard.js` will proxy to `BACKEND_URL`.
4. Deploy. Open the production URL; the dashboard will load via the proxy (no CORS).

## Project layout

- `src/` — React app and components.
- `api/dashboard.js` — Vercel serverless function that proxies `GET /api/dashboard` to the backend.
