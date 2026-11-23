import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Play, Download, Star, Heart, Clock, Calendar, Clapperboard } from 'lucide-react';
import { CATALOG } from '../data/catalog.js';
import { formatRuntime, formatRating, cn } from '../lib/utils.js';

const FALLBACK_VIDEO = 'https://media.w3.org/2010/05/sintel/trailer.mp4';

export default function DetailsModal({
  item,
  onClose,
  onSelect,
  onPlay,
  onDownload,
  isFavorite,
  isDownloaded,
  onToggleFavorite,
  autoplay,
}) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  const similar = item
    ? CATALOG.filter((c) => c.id !== item.id && c.genres.some((g) => item.genres.includes(g))).slice(0, 5)
    : [];

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="glass-strong custom-scroll relative max-h-[90dvh] w-full max-w-3xl overflow-y-auto rounded-3xl"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              {item.backdrop && (
                <img src={item.backdrop} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" draggable="false" />
              )}
              {item.trailerId ? (
                <iframe
                  key={item.trailerId}
                  src={`https://www.youtube-nocookie.com/embed/${item.trailerId}?autoplay=${autoplay ? 1 : 0}&mute=1&rel=0&modestbranding=1&playsinline=1${autoplay ? `&loop=1&playlist=${item.trailerId}` : ''}`}
                  title={`${item.title} trailer`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={FALLBACK_VIDEO}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay={autoplay}
                  muted
                  loop
                  controls
                  playsInline
                />
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="glass-btn absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{item.title}</h2>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-white/60">
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-300">
                      <Star size={14} className="fill-amber-300 text-amber-300" />
                      {formatRating(item.rating)}
                    </span>
                    <span className="inline-flex items-center gap-1"><Calendar size={13} />{item.year}</span>
                    {item.runtimeMin && (
                      <span className="inline-flex items-center gap-1"><Clock size={13} />{formatRuntime(item.runtimeMin)}</span>
                    )}
                    <span className="inline-flex items-center gap-1 capitalize"><Clapperboard size={13} />{item.type === 'anime' ? 'Anime' : item.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => onPlay(item)}
                    className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-white/85 active:scale-95"
                  >
                    <Play size={15} className="fill-black text-black" />
                    Watch
                  </button>
                  <button
                    onClick={() => onDownload(item)}
                    aria-label="Download"
                    className={cn('glass-btn grid h-11 w-11 place-items-center rounded-full', isDownloaded ? 'text-emerald-300' : 'text-white')}
                  >
                    <Download size={17} />
                  </button>
                  <button
                    onClick={() => onToggleFavorite(item.id)}
                    aria-label="Toggle watchlist"
                    className={cn('glass-btn grid h-11 w-11 place-items-center rounded-full', isFavorite ? 'text-red-400' : 'text-white')}
                  >
                    <Heart size={17} className={isFavorite ? 'fill-red-400 text-red-400' : ''} />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.genres.map((g) => (
                  <span key={g} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/75">
                    {g}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/65">{item.overview}</p>

              {item.cast?.length > 0 && (
                <div className="mt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">Cast</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.cast.map((c) => (
                      <span key={c} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {similar.length > 0 && (
                <div className="mt-7">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">More like this</p>
                  <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
                    {similar.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => onSelect(s)}
                        className="group w-24 shrink-0 text-left"
                      >
                        <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/10">
                          <img
                            src={s.poster}
                            alt={s.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        </div>
                        <p className="mt-1.5 truncate text-[11px] font-medium text-white/70 group-hover:text-white">{s.title}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
