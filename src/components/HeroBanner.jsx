import { AnimatePresence, motion } from 'framer-motion';
import { Play, Download, Star, Sparkles, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { formatRuntime, formatRating, cn } from '../lib/utils.js';

export default function HeroBanner({
  hero,
  index,
  total,
  onPrev,
  onNext,
  onDot,
  onWatch,
  onDownload,
  isFavorite,
  onToggleFavorite,
  accent,
}) {
  if (!hero) return null;
  const runtime = formatRuntime(hero.runtimeMin);

  return (
    <section className="relative mb-7 h-[430px] overflow-hidden rounded-3xl border border-white/10 sm:h-[440px] lg:h-[470px]">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(90% 110% at 75% 15%, ${accent}2e 0%, transparent 60%), linear-gradient(150deg, #17171d 0%, #0a0a0e 55%, #050507 100%)`,
        }}
      />
      <AnimatePresence mode="popLayout">
        <motion.div
          key={hero.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.07 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.backdrop && (
            <img
              src={hero.backdrop}
              alt={hero.title}
              className="h-full w-full object-cover"
              draggable="false"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, rgba(5,5,7,0.88) 0%, rgba(5,5,7,0.45) 42%, transparent 75%), linear-gradient(0deg, rgba(5,5,7,0.92) 0%, transparent 55%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-25 mix-blend-overlay"
        style={{ background: `radial-gradient(60% 80% at 20% 80%, ${accent}55 0%, transparent 70%)` }}
      />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8">
        <motion.div
          key={`c-${hero.id}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="glass-soft mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
            <Sparkles size={12} style={{ color: accent }} />
            Now Trending
          </span>

          <h1 className="max-w-2xl text-3xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
            {hero.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-white/70">
            <span className="font-semibold text-white/90">{hero.year}</span>
            {runtime && <span className="text-white/30">•</span>}
            {runtime && <span>{runtime}</span>}
            <span className="text-white/30">•</span>
            <span className="inline-flex items-center gap-1 font-semibold text-amber-300">
              <Star size={13} className="fill-amber-300 text-amber-300" />
              {formatRating(hero.rating)}
            </span>
            {hero.genres.slice(0, 3).map((g) => (
              <span key={g} className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/80 backdrop-blur-md">
                {g}
              </span>
            ))}
          </div>

          <p className="mt-3 line-clamp-2 max-w-xl text-[13.5px] leading-relaxed text-white/65 sm:line-clamp-3">
            {hero.overview}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onWatch(hero)}
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-white/85 active:scale-95"
              style={{ boxShadow: `0 10px 34px rgba(255,255,255,0.28), 0 4px 14px ${accent}66` }}
            >
              <Play size={16} className="fill-black text-black" />
              Watch
            </button>
            <button
              onClick={() => onDownload(hero)}
              className="glass-btn flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
            >
              <Download size={16} />
              Download
            </button>
            <button
              onClick={() => onToggleFavorite(hero.id)}
              aria-label="Toggle watchlist"
              className={cn(
                'glass-btn grid h-11 w-11 place-items-center rounded-full',
                isFavorite ? 'text-red-400' : 'text-white',
              )}
            >
              <Heart size={17} className={isFavorite ? 'fill-red-400 text-red-400' : ''} />
            </button>
          </div>
        </motion.div>
      </div>

      <button
        onClick={onPrev}
        aria-label="Previous featured"
        className="icon-btn absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 border border-white/15 bg-black/30 opacity-0 backdrop-blur-md transition hover:bg-black/50 hover:opacity-100 group-hover:opacity-100 md:grid"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={onNext}
        aria-label="Next featured"
        className="icon-btn absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 border border-white/15 bg-black/30 opacity-0 backdrop-blur-md transition hover:bg-black/50 hover:opacity-100 group-hover:opacity-100 md:grid"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-6 right-6 flex items-center gap-2 sm:bottom-7 sm:right-8">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDot(i)}
            aria-label={`Go to featured ${i + 1}`}
            className="group/dot relative h-2 overflow-hidden rounded-full"
          >
            <span className="absolute inset-0 rounded-full bg-white/25" />
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: accent }}
              initial={false}
              animate={{ scaleX: i === index ? 1 : 0, opacity: i === index ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
            <span className={cn('relative block h-2 transition-all', i === index ? 'w-6' : 'w-2 group-hover/dot:bg-white/50')} />
          </button>
        ))}
      </div>
    </section>
  );
}
