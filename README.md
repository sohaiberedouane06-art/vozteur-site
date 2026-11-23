# Vision Stream

A spatial, VisionOS-inspired streaming web app for **Movies, TV Series & Anime** — frosted glassmorphism, dynamic ambient glow, and buttery micro-interactions.

## Stack

- **React 18** + **Vite 6**
- **Tailwind CSS v4** (CSS-first config in `src/index.css`)
- **Framer Motion** for layout/entry animations
- **Lucide React** icons
- **Inter Variable** (self-hosted via `@fontsource-variable/inter`)

## Run

```bash
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # production build -> dist/
npm run preview  # serve the production build on http://127.0.0.1:4173
```

## Features

- Floating glass navigation rail with animated active pill (Home, Watchlist, Downloads, Profile, Settings)
- Top bar with live search (`⌘K`), category tabs (Home / TV Series / Movies / Anime / Mystery / Sci-Fi), notifications and profile pill
- 2-column asymmetric dashboard: Trending rail + Continue Watching sidebar, hero carousel + poster grid main area
- Hero banner that crossfades through featured titles, syncs the page's ambient glow to each title's accent color, with pagination dots, auto-advance and hover arrows
- Details & trailer modal (embedded YouTube trailer preview, genres, cast, "more like this"), opened from any card or Watch button
- Floating media bar with working play/pause, prev/next queue, shuffle, volume slider and animated progress
- Watchlist (heart) and Downloads with toast feedback; working Profile and Settings panels (ambient glow, reduce motion, autoplay)
- Fully responsive: rail becomes a top pill on small screens, grid collapses to a single column

## Data

`src/data/catalog.js` is a generated mock dataset (32 real titles) shaped like TMDB objects (`id`, `title`, `type`, `year`, `runtimeMin`, `rating`, `genres`, `overview`, `cast`, `poster`, `backdrop`, `trailerId`…), so it can be swapped 1:1 for live TMDB API responses later.

Regenerate it (keyless [Cinemeta](https://github.com/Stremio/stremio-core) metadata + YouTube trailer stills for backdrops):

```bash
npm run fetch-data
```

Artwork is hot-linked from `images.metahub.space` / `i.ytimg.com`; trailer previews embed `youtube-nocookie.com`.
