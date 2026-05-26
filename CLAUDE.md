# Songify AI — Engineering Guidelines

> Read this file before writing any code. These are non-negotiable defaults, not suggestions.

---

## What this app is

Songify AI is a personalized music recommendation web app powered by OpenAI and Spotify. Users describe their mood or what they want to listen to, the AI returns a Spotify track, and the user can play a preview directly in the chat and save songs to their favorites.

**Core loop:** User chats their vibe → OpenAI selects a Spotify track → embedded player appears → user saves to favorites.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 18 (Vite, JSX) |
| Routing | React Router v6 |
| UI | Joy UI v5 (primary) + MUI v5 (secondary) + Emotion CSS-in-JS |
| State | React Context (UserContext) + useState |
| HTTP | Native `fetch` |
| Build | Vite 5 |
| Backend | Express.js + MongoDB (Mongoose) — separate repo |
| AI | OpenAI API (recommendation engine) |
| Music | Spotify Web API + Spotify iframe embed |
| Deployment | Netlify (frontend) · Render (backend) |

---

## Reference

- Backend base URL must always come from `import.meta.env.VITE_API_URL` — never hardcode it
- Spotify iframe embed: `https://open.spotify.com/embed/track/<spotifyId>`
- All routes requiring a logged-in user must be wrapped in `<PrivateRoute>`

---

## Engineering principles

You are a senior software engineer. This means:

- **Question design before building.** If scope seems wrong or an approach will cause pain later — say so first.
- **Correctness over speed.** Shipped bugs in an AI recommendation app break trust.
- **Simple over clever.** The next person reading this should understand it immediately.
- **No half-finished code.** No TODO stubs, no commented-out blocks, no placeholder logic in commits.
- **Always check `response.ok` after every `fetch` call** — HTTP errors (4xx/5xx) do not throw by default.
- **No `console.log` in production code.** Remove all debug logs before committing.

---

## Environment variables

All config that differs between environments lives in `.env.local` (gitignored). See `.env.example` for required keys.

```
VITE_API_URL=https://songify-ai-backend.onrender.com
```

- Vite exposes only vars prefixed `VITE_` to the browser bundle
- Access them as `import.meta.env.VITE_*`
- Never commit `.env.local` — it is in `.gitignore`
- Run `cp .env.example .env.local` and fill in values when setting up locally

---

## Authentication

- User session is stored in `localStorage` as JSON (current implementation)
- Access via `UserContext` — never read `localStorage` directly in components
- All protected pages must use the `<PrivateRoute>` wrapper in `App.jsx`
- Logout must clear `localStorage` and reset context state
- The `response.ok` check is mandatory after login/register requests — a 401 or 500 must never redirect the user as if it succeeded

---

## Error handling rules

Every `fetch` call must follow this pattern:

```js
const res = await fetch(url, options);
if (!res.ok) {
  const err = await res.json().catch(() => ({}));
  throw new Error(err.message || 'Request failed');
}
const data = await res.json();
```

- Show user-facing error messages — silent failures are not acceptable
- Wrap async event handlers in try/catch and surface errors in the UI
- Add loading state (`isLoading`) for every async operation that touches the network

---

## Commit discipline

Each commit does exactly one thing and leaves the codebase in a working state.

- Format: `type(scope): what changed and why`
- Types: `feat`, `fix`, `refactor`, `test`, `chore`, `docs`
- Examples:
  - `fix(register): change password input to type="password"`
  - `fix(favorites): use splice index instead of songId for removal`
  - `feat(auth): add PrivateRoute wrapper for protected pages`
  - `chore(env): move hardcoded API URL to VITE_API_URL env var`

**Never commit:**
- `.env.local` or any file with secrets
- `node_modules/`
- `console.log` or debug code
- Code that crashes or has obvious syntax errors

---

## Code style

- No comments that explain what the code does — name things so they are self-evident
- Comments only for non-obvious WHY (hidden constraint, workaround, subtle invariant)
- No docstrings or multi-line comment blocks
- Imports: external packages first, then relative paths
- Prefer Joy UI components over raw MUI for new UI work (Joy UI is the primary design system here)
- Password inputs always use `type="password"` — no exceptions
- Remove unused imports and variables before committing

---

## Folder structure

```
src/
  assets/             # Static images and SVGs
  components/         # Shared components (SongCard, PrivateRoute, etc.)
  context/            # React context providers (UserContext)
  pages/
    HomePage/         # Landing page and hero section
    SignInPage/       # Login form
    RegisterPage/     # Registration form
    FavoritesPage/    # Saved songs
    MessagesPage/     # AI chat + Spotify embed (core feature)
      components/     # Chat sub-components (Sidebar, ChatBubble, etc.)
  App.jsx             # Root component + all routes
  main.jsx            # Entry point
```

---

## Commands

```bash
npm run dev          # Start Vite dev server (localhost:5173)
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
npm run lint         # ESLint check

# Environment setup (first time)
cp .env.example .env.local
# Fill in VITE_API_URL in .env.local
```

---

## Before every commit checklist

- [ ] No hardcoded URLs — all API calls use `import.meta.env.VITE_API_URL`
- [ ] Every `fetch` checks `response.ok` before reading `.json()`
- [ ] No `console.log` left in source files
- [ ] No unused imports or dead state variables
- [ ] Protected routes use `<PrivateRoute>`
- [ ] Password inputs use `type="password"`
- [ ] Loading states exist for network operations
- [ ] App runs without crashing: `npm run dev`
- [ ] Lint passes: `npm run lint`
