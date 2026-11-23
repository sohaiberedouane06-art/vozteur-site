import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Heart } from 'lucide-react';
import { formatRating, cn } from '../lib/utils.js';

const PosterCard = forwardRef(function PosterCard({ item, onOpen, onPlay, isFavorite, onToggleFavorite }, ref) {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ scale: 1.035, zIndex: 20 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      onClick={() => onOpen(item)}
      className="group relative aspect-[2/3] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors duration-300 hover:border-white/30"
      style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.35)' }}
    >
      <img
        src={item.poster}
        alt={item.title}
        loading="lazy"
        draggable="false"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/25 opacity-90 transition group-hover:opacity-100" />
      <div
        className="absolute inset-0 opacity-0 mix-blend-overlay transition duration-500 group-hover:opacity-40"
        style={{ background: 'radial-gradient(80% 60% at 50% 100%, rgba(255,255,255,0.5), transparent 70%)' }}
      />

      <span className="glass-soft absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/85">
        {item.genres[0] || item.type}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(item.id);
        }}
        aria-label="Toggle watchlist"
        className={cn(
          'absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-black/35 opacity-0 backdrop-blur-md transition hover:bg-black/50 group-hover:opacity-100',
          isFavorite ? 'text-red-400 opacity-100' : 'text-white',
        )}
      >
        <Heart size={13} className={isFavorite ? 'fill-red-400 text-red-400' : ''} />
      </button>

      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="truncate text-[13.5px] font-semibold leading-tight text-white drop-shadow">{item.title}</p>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-white/55">
          <span className="inline-flex items-center gap-1 font-semibold text-amber-300">
            <Star size={11} className="fill-amber-300 text-amber-300" />
            {formatRating(item.rating)}
          </span>
          <span>{item.year}</span>
          <span className="capitalize text-white/40">{item.type === 'anime' ? 'Anime' : item.type}</span>
        </div>
        {item.continueWatching && (
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-white/85" style={{ width: `${item.continueWatching.progress * 100}%` }} />
          </div>
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPlay(item);
        }}
        aria-label={`Play ${item.title}`}
        className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full border border-white/40 bg-white/25 opacity-0 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white/40 group-hover:translate-y-0 group-hover:opacity-100"
        style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.35)' }}
      >
        <Play size={15} className="ml-0.5 fill-white text-white" />
      </button>
    </motion.div>
  );
});

export default PosterCard;
