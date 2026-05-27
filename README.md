# Songify AI

**AI-powered music recommendations with Spotify playback — describe your mood, get a song.**

Songify AI combines OpenAI's language models with the Spotify catalog to surface personalized track recommendations in a conversational interface. Users describe what they want to hear, receive a curated pick with an explanation, and can preview and save it — all without leaving the chat.

**[Live Demo](https://songifyai.netlify.app)** · [Frontend Repo](https://github.com/g-nbo/Songify_AI) · [Backend Repo](https://github.com/g-nbo/songify_AI_backend)

---

## Features

- **Conversational recommendations** — Describe a mood, activity, or genre in plain language and receive a single, well-reasoned song pick
- **Inline Spotify playback** — Spotify's embedded player renders directly in the chat; no app switching required
- **Favorites library** — Save songs and revisit them from a dedicated card-grid view
- **Persistent sessions** — JWT access tokens with httpOnly refresh cookie; session survives page reloads without storing credentials in the browser
- **Responsive layout** — Collapsible sidebar navigation, works across desktop and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5 |
| UI | Joy UI v5, MUI v5, Emotion |
| Routing | React Router v6 |
| Auth | JWT (access token in memory + httpOnly refresh cookie) |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| AI | OpenAI API (GPT-3.5 Turbo) |
| Music | Spotify Web API + Spotify Embed |
| Frontend Deploy | Netlify |
| Backend Deploy | Render |

---

## Architecture

```
┌─────────────────────┐        ┌──────────────────────────┐
│   React Frontend    │        │     Express Backend       │
│   (Netlify)         │◄──────►│     (Render)             │
│                     │  JWT   │                          │
│  - Chat interface   │        │  - Auth (bcrypt + JWT)   │
│  - Spotify embeds   │        │  - OpenAI integration    │
│  - Favorites grid   │        │  - Spotify API proxy     │
└─────────────────────┘        │  - MongoDB via Mongoose  │
                               └──────────────────────────┘
```

On each recommendation request:
1. User message → Express → OpenAI selects a track (name + artist)
2. Express searches Spotify for that track → returns Spotify track ID
3. Frontend renders Spotify's embedded player directly in the chat bubble

---

## Local Development

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Spotify Developer app (Client ID + Secret)
- OpenAI API key

### Frontend

```bash
git clone https://github.com/g-nbo/Songify_AI
cd Songify_AI
npm install
cp .env.example .env.local
# Fill in VITE_API_URL in .env.local
npm run dev
```

### Backend

```bash
git clone https://github.com/g-nbo/songify_AI_backend
cd songify_AI_backend
npm install
# Create .env with the variables listed below
node server.js
```

---

## Environment Variables

### Frontend (`.env.local`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend base URL (e.g. `http://localhost:8000`) |

### Backend (`.env`)

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens |
| `CLIENT_URL` | Frontend origin for CORS (e.g. `https://songifyai.netlify.app`) |
| `CLIENT_ID` | Spotify app Client ID |
| `CLIENT_SECRET` | Spotify app Client Secret |
| `OPENAI_API_KEY` | OpenAI API key |
| `NODE_ENV` | Set to `production` on Render |

---

## API Overview

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/users/register` | None | Create account |
| `POST` | `/users/login` | None | Login, sets refresh cookie |
| `POST` | `/users/refresh` | Cookie | Issue new access token |
| `POST` | `/users/logout` | Cookie | Clear refresh cookie |
| `POST` | `/songify/song` | Bearer | Get AI song recommendation |
| `GET` | `/songify/track/:id` | Bearer | Fetch Spotify track metadata |
| `POST` | `/songify/favorite` | Bearer | Add song to favorites |
| `DELETE` | `/songify/favorite/delete` | Bearer | Remove song from favorites |
| `GET` | `/songify/favorites` | Bearer | Get user's favorites |

---

## Deployment

**Frontend** is deployed on Netlify. A `public/_redirects` file routes all paths to `index.html` for client-side routing:

```
/*  /index.html  200
```

**Backend** is deployed on Render as a web service. All environment variables listed above must be set in the Render dashboard. The refresh token cookie requires `sameSite: none` and `secure: true` since the frontend and backend are on separate domains.
