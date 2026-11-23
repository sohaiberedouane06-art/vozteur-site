export const cn = (...xs) => xs.filter(Boolean).join(' ');

export const formatRuntime = (min) => {
  if (!min) return null;
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h && m) return `${h}h ${String(m).padStart(2, '0')}m`;
  if (h) return `${h}h`;
  return `${m}m`;
};

export const formatRating = (r) => (r ? r.toFixed(1) : '—');

export const genreMatch = (genres = [], tab) => {
  const g = genres.map((x) => x.toLowerCase());
  if (tab === 'Mystery') return g.some((x) => x.includes('mystery'));
  if (tab === 'Sci-Fi') return g.some((x) => /sci[- ]?fi|science fiction/.test(x));
  return false;
};

export const matchesTab = (item, tab) => {
  switch (tab) {
    case 'Home':
      return true;
    case 'TV Series':
      return item.type === 'series';
    case 'Movies':
      return item.type === 'movie';
    case 'Anime':
      return item.type === 'anime';
    default:
      return genreMatch(item.genres, tab);
  }
};

export const matchesQuery = (item, q) => {
  if (!q) return true;
  const needle = q.toLowerCase();
  return (
    item.title.toLowerCase().includes(needle) ||
    item.genres.some((g) => g.toLowerCase().includes(needle)) ||
    (item.overview || '').toLowerCase().includes(needle)
  );
};
