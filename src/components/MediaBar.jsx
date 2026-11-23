import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Volume2, VolumeX } from 'lucide-react';
import { cn } from '../lib/utils.js';

export default function MediaBar({
  item,
  playing,
  progress,
  volume,
  muted,
  shuffle,
  onTogglePlay,
  onPrev,
  onNext,
  onVolume,
  onToggleMute,
  onToggleShuffle,
  onOpen,
}) {
  if (!item) return null;
  const cw = item.continueWatching;

  return (
    <motion.div
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26, delay: 0.2 }}
      className="fixed bottom-3 left-1/2 z-40 w-[min(94vw,660px)] -translate-x-1/2 sm:bottom-5"
    >
      <div className="glass relative flex items-center gap-3 rounded-full border-t-white/20 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3">
        <div className="absolute inset-x-8 top-0 h-[3px] overflow-hidden rounded-full bg-white/[0.07]">
          <motion.div
            className="h-full rounded-full bg-white"
            animate={{ width: `${Math.min(100, progress * 100)}%` }}
            transition={{ ease: 'linear', duration: 0.3 }}
          />
        </div>

        <button onClick={() => onOpen(item)} className="shrink-0">
          <img
            src={item.poster}
            alt={item.title}
            className="h-10 w-10 rounded-full object-cover ring-1 ring-white/25 sm:h-11 sm:w-11"
            draggable="false"
          />
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-white">{item.title}</p>
          <p className="truncate text-[11px] text-white/45">
            {playing ? 'Now playing' : 'Paused'} · {cw?.episode || `${item.year} • ${item.type === 'anime' ? 'Anime' : item.type}`}
          </p>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5">
          <button onClick={onPrev} className="icon-btn h-9 w-9" aria-label="Previous">
            <SkipBack size={16} className="fill-white/60 text-white/60" />
          </button>
          <button
            onClick={onTogglePlay}
            aria-label={playing ? 'Pause' : 'Play'}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white text-black transition hover:scale-105 active:scale-95"
            style={{ boxShadow: '0 6px 22px rgba(255,255,255,0.35)' }}
          >
            {playing ? <Pause size={17} className="fill-black text-black" /> : <Play size={17} className="ml-0.5 fill-black text-black" />}
          </button>
          <button onClick={onNext} className="icon-btn h-9 w-9" aria-label="Next">
            <SkipForward size={16} className="fill-white/60 text-white/60" />
          </button>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            onClick={onToggleShuffle}
            aria-label="Shuffle"
            className={cn('icon-btn h-9 w-9', shuffle ? 'bg-white/15 text-white' : '')}
          >
            <Shuffle size={15} />
          </button>
          <button onClick={onToggleMute} className="icon-btn h-9 w-9" aria-label="Mute">
            {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={muted ? 0 : volume}
            onChange={(e) => onVolume(parseFloat(e.target.value))}
            className="volume w-20"
            aria-label="Volume"
          />
        </div>
      </div>
    </motion.div>
  );
}
