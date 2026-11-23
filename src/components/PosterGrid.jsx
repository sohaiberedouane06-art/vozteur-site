import { AnimatePresence, motion } from 'framer-motion';
import PosterCard from './PosterCard.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function PosterGrid({ title, items, emptyHint, onOpen, onPlay, favorites, onToggleFavorite }) {
  return (
    <section>
      <SectionHeading title={title} actionLabel={items.length > 5 ? 'See all' : null} />
      {items.length === 0 ? (
        <div className="glass-soft grid place-items-center rounded-3xl px-6 py-16 text-center">
          <p className="text-sm font-medium text-white/70">Nothing here yet</p>
          <p className="mt-1 text-xs text-white/40">{emptyHint}</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 2xl:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <PosterCard
                key={item.id}
                item={item}
                onOpen={onOpen}
                onPlay={onPlay}
                isFavorite={favorites.has(item.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
