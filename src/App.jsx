import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Heart, Download, Check } from 'lucide-react';
import { CATALOG, HEROES, TRENDING, CONTINUE_WATCHING, TABS } from './data/catalog.js';
import { matchesQuery, matchesTab } from './lib/utils.js';
import AmbientBackground from './components/AmbientBackground.jsx';
import NavRail from './components/NavRail.jsx';
import TopBar from './components/TopBar.jsx';
import HeroBanner from './components/HeroBanner.jsx';
import PosterGrid from './components/PosterGrid.jsx';
import { TrendingRail, ContinueWatching } from './components/SideRail.jsx';
import MediaBar from './components/MediaBar.jsx';
import DetailsModal from './components/DetailsModal.jsx';
import { ProfilePanel, SettingsPanel } from './components/Panels.jsx';

const GRID_TITLES = {
  Home: 'New Releases',
  'TV Series': 'Popular Series',
  Movies: 'Movies',
  Anime: 'Anime Picks',
  Mystery: 'Mystery Picks',
  'Sci-Fi': 'Sci-Fi Worlds',
};

export default function App() {
  const [view, setView] = useState('home');
  const [tab, setTab] = useState('Home');
  const [query, setQuery] = useState('');
  const [heroIndex, setHeroIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState(() => new Set());
  const [downloads, setDownloads] = useState(() => new Set());
  const [player, setPlayer] = useState({
    item: CONTINUE_WATCHING[0],
    playing: true,
    progress: CONTINUE_WATCHING[0]?.continueWatching?.progress ?? 0.2,
    volume: 0.8,
    muted: false,
    shuffle: false,
  });
  const [settings, setSettings] = useState({ ambient: true, reduceMotion: false, autoplay: true });
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((msg) => {
    setToast({ msg, key: Date.now() });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const q = query.trim();
  const searching = q.length > 0;

  const heroList = useMemo(() => {
    const filtered = HEROES.filter((h) => matchesTab(h, tab) && matchesQuery(h, q));
    return filtered.length ? filtered : HEROES;
  }, [tab, q]);

  const hero = heroList[Math.min(heroIndex, heroList.length - 1)];
  const accent = hero?.accent || '#818cf8';

  useEffect(() => {
    setHeroIndex(0);
  }, [tab, q]);

  const pausedRef = useRef(false);
  useEffect(() => {
    pausedRef.current = !!selected;
  }, [selected]);

  useEffect(() => {
    const t = setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      setHeroIndex((i) => (i + 1) % heroList.length);
    }, 6000);
    return () => clearInterval(t);
  }, [heroList.length]);

  useEffect(() => {
    const t = setInterval(() => {
      setPlayer((p) => {
        if (!p.playing) return p;
        const next = p.progress + 0.0016;
        if (next >= 1) return { ...p, progress: 0 };
        return { ...p, progress: next };
      });
    }, 400);
    return () => clearInterval(t);
  }, []);

  const visible = useMemo(
    () => CATALOG.filter((c) => matchesTab(c, tab) && matchesQuery(c, q)),
    [tab, q],
  );

  const gridItems = useMemo(() => {
    if (view === 'favorites') return CATALOG.filter((c) => favorites.has(c.id) && matchesQuery(c, q));
    if (view === 'downloads') return CATALOG.filter((c) => downloads.has(c.id) && matchesQuery(c, q));
    const sorted = [...visible].sort((a, b) => (b.year || 0) - (a.year || 0) || (b.rating || 0) - (a.rating || 0));
    return sorted;
  }, [view, visible, favorites, downloads, q]);

  const trendingItems = useMemo(
    () => TRENDING.filter((c) => matchesTab(c, tab) && matchesQuery(c, q)),
    [tab, q],
  );
  const continueItems = useMemo(
    () => CONTINUE_WATCHING.filter((c) => matchesTab(c, tab) && matchesQuery(c, q)),
    [tab, q],
  );

  const toggleFavorite = useCallback(
    (id) => {
      setFavorites((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
          showToast('Removed from watchlist');
        } else {
          next.add(id);
          showToast('Added to watchlist');
        }
        return next;
      });
    },
    [showToast],
  );

  const toggleDownload = useCallback(
    (item) => {
      setDownloads((prev) => {
        const next = new Set(prev);
        if (next.has(item.id)) {
          next.delete(item.id);
          showToast(`Removed ${item.title} from downloads`);
        } else {
          next.add(item.id);
          showToast(`${item.title} downloaded`);
        }
        return next;
      });
    },
    [showToast],
  );

  const playItem = useCallback((item) => {
    setPlayer((p) => ({
      ...p,
      item,
      playing: true,
      progress: item.continueWatching?.progress ?? 0,
    }));
    showToast(`Now playing ${item.title}`);
  }, [showToast]);

  const stepTrack = useCallback(
    (dir) => {
      const queue = [...CONTINUE_WATCHING, ...TRENDING];
      const idx = queue.findIndex((c) => c.id === player.item?.id);
      const next =
        dir > 0
          ? queue[(idx + 1 + queue.length) % queue.length]
          : queue[(idx - 1 + queue.length) % queue.length];
      if (player.shuffle && queue.length > 2) {
        let pick = next;
        while (pick.id === player.item?.id) {
          pick = queue[Math.floor(Math.random() * queue.length)];
        }
        setPlayer((p) => ({ ...p, item: pick, playing: true, progress: 0 }));
        return;
      }
      setPlayer((p) => ({ ...p, item: next, playing: true, progress: next?.continueWatching?.progress ?? 0 }));
    },
    [player.item, player.shuffle],
  );

  const openDetails = useCallback((item) => setSelected(item), []);
  const goHome = useCallback(() => setView('home'), []);

  const gridTitle =
    view === 'favorites'
      ? 'Your Watchlist'
      : view === 'downloads'
        ? 'Downloads'
        : searching
          ? `Results for “${q}”`
          : GRID_TITLES[tab] || 'Browse';

  const showDashboard = view === 'home' && !searching;

  return (
    <MotionConfig reducedMotion={settings.reduceMotion ? 'always' : 'never'}>
      <AmbientBackground accent={accent} enabled={settings.ambient} />

      <div className="relative z-10 mx-auto flex h-dvh max-w-[1680px] flex-col gap-3 p-3 sm:gap-4 sm:p-4 lg:flex-row lg:p-5">
        <NavRail
          view={view}
          setView={(v) => {
            setView(v);
            if (v !== 'home') setQuery('');
          }}
          favoritesCount={favorites.size}
          downloadsCount={downloads.size}
        />

        <div className="glass flex min-h-0 flex-1 flex-col overflow-hidden rounded-[2rem] border-t-white/25 lg:rounded-[2.5rem]">
          <TopBar
            tab={tab}
            onSelectTab={(t) => {
              setTab(t);
              setQuery('');
              goHome();
            }}
            query={query}
            setQuery={setQuery}
          />

          <div className="custom-scroll min-h-0 flex-1 overflow-y-auto px-4 pb-36 pt-4 sm:px-6 sm:pt-5">
            {view === 'profile' ? (
              <ProfilePanel favoritesCount={favorites.size} downloadsCount={downloads.size} />
            ) : view === 'settings' ? (
              <SettingsPanel settings={settings} setSettings={setSettings} />
            ) : showDashboard ? (
              <div className="grid items-start gap-7 xl:grid-cols-[300px_minmax(0,1fr)]">
                <aside className="order-2 flex flex-col gap-7 xl:order-1">
                  {trendingItems.length > 0 && (
                    <TrendingRail items={trendingItems} onOpen={openDetails} onPlay={playItem} />
                  )}
                  {continueItems.length > 0 && (
                    <ContinueWatching items={continueItems} onOpen={openDetails} onPlay={playItem} />
                  )}
                </aside>

                <main className="order-1 min-w-0 xl:order-2">
                  <div className="group">
                    <HeroBanner
                      hero={hero}
                      index={Math.min(heroIndex, heroList.length - 1)}
                      total={heroList.length}
                      onPrev={() => setHeroIndex((i) => (i - 1 + heroList.length) % heroList.length)}
                      onNext={() => setHeroIndex((i) => (i + 1) % heroList.length)}
                      onDot={setHeroIndex}
                      onWatch={playItem}
                      onDownload={toggleDownload}
                      isFavorite={favorites.has(hero?.id)}
                      onToggleFavorite={toggleFavorite}
                      accent={accent}
                    />
                  </div>
                  <div className="mt-7">
                    <PosterGrid
                      title={gridTitle}
                      items={gridItems}
                      emptyHint="Try a different search or category."
                      onOpen={openDetails}
                      onPlay={playItem}
                      favorites={favorites}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>
                </main>
              </div>
            ) : (
              <PosterGrid
                title={gridTitle}
                items={gridItems}
                emptyHint={
                  view === 'favorites'
                    ? 'Tap the heart on any title to add it here.'
                    : view === 'downloads'
                      ? 'Tap Download on any title to see it here.'
                      : 'Try a different search or category.'
                }
                onOpen={openDetails}
                onPlay={playItem}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            )}
          </div>
        </div>
      </div>

      <MediaBar
        item={player.item}
        playing={player.playing}
        progress={player.progress}
        volume={player.volume}
        muted={player.muted}
        shuffle={player.shuffle}
        onTogglePlay={() => setPlayer((p) => ({ ...p, playing: !p.playing }))}
        onPrev={() => stepTrack(-1)}
        onNext={() => stepTrack(1)}
        onVolume={(v) => setPlayer((p) => ({ ...p, volume: v, muted: v === 0 }))}
        onToggleMute={() => setPlayer((p) => ({ ...p, muted: !p.muted }))}
        onToggleShuffle={() => setPlayer((p) => ({ ...p, shuffle: !p.shuffle }))}
        onOpen={openDetails}
      />

      <DetailsModal
        item={selected}
        onClose={() => setSelected(null)}
        onSelect={setSelected}
        onPlay={(item) => {
          playItem(item);
          setSelected(null);
        }}
        onDownload={toggleDownload}
        isFavorite={selected ? favorites.has(selected.id) : false}
        isDownloaded={selected ? downloads.has(selected.id) : false}
        onToggleFavorite={toggleFavorite}
        autoplay={settings.autoplay}
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.key}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            className="glass-strong fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-full px-4 py-2.5 text-[13px] font-medium text-white sm:bottom-28"
          >
            {toast.msg.includes('watchlist') ? (
              <Heart size={14} className="fill-red-400 text-red-400" />
            ) : toast.msg.includes('download') || toast.msg.includes('Downloaded') ? (
              <Download size={14} className="text-emerald-300" />
            ) : (
              <Check size={14} className="text-emerald-300" />
            )}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
