# Vision Stream — Agent Guide

VisionOS-style glassmorphism streaming web app: movies, TV series, anime.

## Stack
React 18, Vite 6, Tailwind CSS v4 (CSS-first, `src/index.css`), Framer Motion, Lucide React, Inter Variable (self-hosted).

## Commands
- `npm install` — install deps
- `npm run dev` — dev server at http://127.0.0.1:5173
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the build at http://127.0.0.1:4173
- `npm run fetch-data` — regenerate `src/data/catalog.js` from the keyless Cinemeta API (requires network)

## Structure
- `src/App.jsx` — root: state, views (home / watchlist / downloads / profile / settings), filtering
- `src/components/` — NavRail, TopBar, HeroBanner, PosterGrid/PosterCard, SideRail, MediaBar, DetailsModal, Panels, AmbientBackground
- `src/data/catalog.js` — generated mock dataset, TMDB-shaped (swap for TMDB API later)
- `src/lib/utils.js` — cn, formatters, tab/query matchers
- `scripts/fetch-data.mjs` — data generator

## Conventions
- Tailwind v4 utilities + `.glass` / `.glass-strong` / `.glass-soft` / `.glass-btn` component classes in `index.css`
- Framer Motion for layout/entry animations; respect the "Reduce motion" setting via `MotionConfig`
- No extra dependencies unless already in `package.json`
