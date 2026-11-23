import { Play, Star } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { formatRating } from '../lib/utils.js';

export function TrendingRail({ items, onOpen, onPlay }) {
  return (
    <section>
      <SectionHeading title="Trending / New Trailers" />
      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onOpen(item)}
            className="glass-soft group flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:border-white/25 hover:bg-white/10"
          >
            <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5">
              <img
                src={item.backdrop || item.poster}
                alt={item.title}
                loading="lazy"
                draggable="false"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/0" />
              <span className="absolute inset-0 m-auto grid h-7 w-7 place-items-center rounded-full border border-white/40 bg-black/40 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                <Play size={11} className="ml-0.5 fill-white text-white" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-white/90">{item.title}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/45">
                <span className="inline-flex items-center gap-0.5 font-semibold text-amber-300/90">
                  <Star size={10} className="fill-amber-300 text-amber-300" />
                  {formatRating(item.rating)}
                </span>
                <span>•</span>
                <span>{item.year}</span>
                <span>•</span>
                <span className="capitalize">{item.type}</span>
              </p>
            </div>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onPlay(item);
              }}
              onKeyDown={(e) => e.key === 'Enter' && onPlay(item)}
              aria-label={`Play ${item.title}`}
              className="glass grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/80 transition hover:scale-105 hover:bg-white/20 hover:text-white"
            >
              <Play size={12} className="ml-0.5 fill-white text-white" />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function ContinueWatching({ items, onOpen, onPlay }) {
  return (
    <section>
      <SectionHeading title="Continue Watching" />
      <div className="flex flex-col gap-2.5">
        {items.map((item) => {
          const cw = item.continueWatching;
          return (
            <button
              key={item.id}
              onClick={() => onOpen(item)}
              className="glass-soft group flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:border-white/25 hover:bg-white/10"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5">
                <img
                  src={item.poster}
                  alt={item.title}
                  loading="lazy"
                  draggable="false"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-white/90">{item.title}</p>
                <p className="mt-0.5 truncate text-[11px] text-white/45">{cw?.episode || `${item.year} • Movie`}</p>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-white/70 to-white"
                    style={{ width: `${Math.round((cw?.progress || 0) * 100)}%` }}
                  />
                </div>
              </div>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay(item);
                }}
                onKeyDown={(e) => e.key === 'Enter' && onPlay(item)}
                aria-label={`Resume ${item.title}`}
                className="glass grid h-8 w-8 shrink-0 place-items-center rounded-full text-white transition hover:scale-105 hover:bg-white/20"
              >
                <Play size={12} className="ml-0.5 fill-white text-white" />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
