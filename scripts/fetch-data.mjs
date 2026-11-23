import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CINEMETA = 'https://v3-cinemeta.strem.io';
const YT = 'https://i.ytimg.com/vi';

const TITLES = [
  { q: 'Dune: Part Two', kind: 'movie', expect: 'dune: part two', hero: true, accent: '#f5a524' },
  { q: 'Interstellar', kind: 'movie', expect: 'interstellar', hero: true, accent: '#818cf8' },
  { q: 'Inception', kind: 'movie', expect: 'inception' },
  { q: 'The Dark Knight', kind: 'movie', expect: 'the dark knight' },
  { q: 'Oppenheimer', kind: 'movie', expect: 'oppenheimer', trending: true },
  { q: 'Spider-Man: Across the Spider-Verse', kind: 'movie', expect: 'across the spider-verse', hero: true, accent: '#fb7185' },
  { q: 'Avengers: Endgame', kind: 'movie', expect: 'endgame', trending: true },
  { q: 'Blade Runner 2049', kind: 'movie', expect: 'blade runner 2049' },
  { q: 'Parasite', kind: 'movie', expect: 'parasite' },
  { q: 'The Batman', kind: 'movie', expect: 'the batman' },
  { q: 'Mad Max: Fury Road', kind: 'movie', expect: 'fury road' },
  { q: 'Everything Everywhere All at Once', kind: 'movie', expect: 'everything everywhere' },
  { q: 'Arrival', kind: 'movie', expect: 'arrival' },
  { q: 'The Matrix', kind: 'movie', expect: 'the matrix' },
  { q: 'Top Gun: Maverick', kind: 'movie', expect: 'maverick' },
  { q: 'Stranger Things', kind: 'series', expect: 'stranger things', trending: true },
  { q: 'The Last of Us', kind: 'series', expect: 'last of us', hero: true, accent: '#34d399' },
  { q: 'Dark', kind: 'series', expect: 'dark', continue: { episode: 'S2 · E3', progress: 0.35 } },
  { q: 'The Witcher', kind: 'series', expect: 'witcher', continue: { episode: 'S3 · E5', progress: 0.62 } },
  { q: 'Wednesday', kind: 'series', expect: 'wednesday' },
  { q: 'Money Heist', kind: 'series', expect: 'money heist' },
  { q: 'Squid Game', kind: 'series', expect: 'squid game', continue: { episode: 'S1 · E4', progress: 0.51 } },
  { q: 'Breaking Bad', kind: 'series', expect: 'breaking bad' },
  { q: 'Severance', kind: 'series', expect: 'severance' },
  { q: 'One Piece', kind: 'anime', expect: 'one piece', hero: true, accent: '#38bdf8', trending: true, continue: { episode: 'Ep 1045', progress: 0.78 } },
  { q: 'Attack on Titan', kind: 'anime', expect: 'attack on titan' },
  { q: 'Demon Slayer', kind: 'anime', expect: 'demon slayer', trending: true },
  { q: 'Jujutsu Kaisen', kind: 'anime', expect: 'jujutsu kaisen' },
  { q: 'Death Note', kind: 'anime', expect: 'death note' },
  { q: 'Spy x Family', kind: 'anime', expect: 'spy' },
  { q: 'Chainsaw Man', kind: 'anime', expect: 'chainsaw man' },
  { q: 'My Hero Academia', kind: 'anime', expect: 'my hero academia' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url) {
  const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}

async function exists(url) {
  try {
    const r = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(8000) });
    return r.ok;
  } catch {
    return false;
  }
}

async function pickBackdrop(trailerId, imdbId) {
  if (trailerId) {
    for (const size of ['maxresdefault', 'sddefault', 'hqdefault']) {
      const url = `${YT}/${trailerId}/${size}.jpg`;
      if (await exists(url)) return { url, trailerId };
    }
  }
  for (const size of ['large', 'medium']) {
    const url = `https://images.metahub.space/background/${size}/${imdbId}/img`;
    if (await exists(url)) return { url, trailerId: trailerId || null };
  }
  return { url: null, trailerId: trailerId || null };
}

const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const GENRE_PATCH = {
  'Dune: Part Two': ['Sci-Fi'],
  'Stranger Things': ['Mystery', 'Sci-Fi'],
  'Money Heist': ['Action', 'Crime', 'Drama', 'Thriller'],
  'The Witcher': ['Fantasy'],
  'Wednesday': ['Mystery'],
  'Parasite': ['Mystery'],
  'Squid Game': ['Mystery'],
  'The Dark Knight': ['Mystery'],
  'One Piece': ['Fantasy'],
  'Attack on Titan': ['Fantasy', 'Sci-Fi'],
  'Demon Slayer: Kimetsu no Yaiba': ['Fantasy'],
  'Jujutsu Kaisen': ['Fantasy'],
  'Death Note': ['Mystery', 'Thriller', 'Sci-Fi'],
  'Chainsaw Man': ['Horror'],
  'My Hero Academia': ['Fantasy'],
  'Everything Everywhere All at Once': ['Sci-Fi', 'Fantasy'],
};

const catalog = [];
for (const t of TITLES) {
  const type = t.kind === 'anime' ? 'series' : t.kind;
  try {
    const search = await getJson(`${CINEMETA}/catalog/${type}/top/search=${encodeURIComponent(t.q)}.json`);
    const metas = search.metas || [];
    const exp = norm(t.expect);
    const hit =
      metas.find((m) => norm(m.name).includes(exp)) ||
      metas.find((m) => exp.includes(norm(m.name))) ||
      metas[0];
    if (!hit) throw new Error('no search results');
    const meta = (await getJson(`${CINEMETA}/meta/${type}/${hit.imdb_id}.json`)).meta;
    const trailerId = meta.trailers?.[0]?.source || null;
    const backdrop = await pickBackdrop(trailerId, meta.imdb_id);
    const poster = `https://images.metahub.space/poster/medium/${meta.imdb_id}/img`;
    const posterLarge = `https://images.metahub.space/poster/large/${meta.imdb_id}/img`;
    const runtimeMin = parseInt((meta.runtime || '').replace(/[^0-9]/g, ''), 10) || null;
    const year = parseInt((meta.releaseInfo || meta.released || '').slice(0, 4), 10) || null;
    const genres = [...new Set([...(meta.genre || []), ...(GENRE_PATCH[meta.name] || [])])];
    catalog.push({
      id: meta.imdb_id,
      title: meta.name,
      type: t.kind,
      year,
      runtimeMin,
      rating: meta.imdbRating ? parseFloat(meta.imdbRating) : null,
      genres,
      overview: meta.description || '',
      cast: (meta.cast || []).slice(0, 5),
      poster,
      posterLarge: (await exists(posterLarge)) ? posterLarge : poster,
      backdrop: backdrop.url,
      trailerId: backdrop.trailerId,
      accent: t.accent || null,
      hero: !!t.hero,
      trending: !!t.trending,
      continueWatching: t.continue || null,
    });
    console.log('ok', t.q, '->', meta.name, meta.imdb_id, 'rating', meta.imdbRating, 'backdrop', backdrop.url ? 'yes' : 'NO', 'trailer', trailerId);
  } catch (e) {
    console.log('FAIL', t.q, e.message);
  }
  await sleep(120);
}

const heroes = catalog.filter((c) => c.hero && c.backdrop);
const out = `// Generated by scripts/fetch-data.mjs from the keyless Cinemeta (Stremio) metadata API.
// Shape mirrors TMDB objects so this file can be swapped for live TMDB API calls later.
// Regenerate with: npm run fetch-data

export const TABS = ['Home', 'TV Series', 'Movies', 'Anime', 'Mystery', 'Sci-Fi'];

export const HEROES = ${JSON.stringify(heroes, null, 2)};

export const TRENDING = ${JSON.stringify(catalog.filter((c) => c.trending), null, 2)};

export const CONTINUE_WATCHING = ${JSON.stringify(catalog.filter((c) => c.continueWatching), null, 2)};

export const CATALOG = ${JSON.stringify(catalog, null, 2)};
`;

mkdirSync(join(ROOT, 'src/data'), { recursive: true });
writeFileSync(join(ROOT, 'src/data/catalog.js'), out);
console.log(`\nWrote ${catalog.length} titles, ${heroes.length} heroes -> src/data/catalog.js`);
