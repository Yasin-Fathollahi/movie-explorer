# 🎬 Movie Explorer

A movie search application built with **Vanilla JavaScript** and **Express.js**. The frontend communicates with a custom backend that securely proxies requests to **TMDB**.

## Live Demo

- **Frontend:** https://movie-explorer-1-vgwi.onrender.com
- **Backend API:** https://movie-explorer-kyq2.onrender.com

> **Note**
> The live demo may be inaccessible from some regions due to local network restrictions. The backend proxies requests to TMDB and keeps the API token secure.

---

## Features

- Search movies, TV shows, and people
- Filter search results by media type
- Secure TMDB API access through an Express backend
- Deployed frontend and backend

---

## Tech Stack

### Frontend

- HTML
- CSS
- Vanilla JavaScript (ES Modules)

### Backend

- Node.js
- Express.js
- dotenvx
- CORS

---

## Project Structure

```text
movie-explorer/
├── frontend/
└── backend/
```

---

## Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
npx live-server frontend
```

---

## Environment Variables

```env
TMDB_API_READ_ACCESS_KEY=your_tmdb_read_access_token
```

---

## Deployment

- Frontend: Render Static Site
- Backend: Render Web Service

---

## Other Implementations

This project was also implemented in two frontend-only versions for learning purposes:

- **Multi-Page Application (MPA)** – `frontend-only-multiple-html`
- **Single-Page Application (SPA)** using the History API – `frontend-only-vanillajs-SPA`

---

## What I Learned

- Building REST APIs with Express
- CORS configuration
- Environment variable management
- API proxy pattern
- Deploying static and Node.js applications on Render
- Consuming third-party APIs securely

---

## License

This project is for learning and portfolio purposes.
