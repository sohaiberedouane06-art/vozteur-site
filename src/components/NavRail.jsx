import { motion } from 'framer-motion';
import { Home, Heart, Download, User, Settings, Play } from 'lucide-react';
import { cn } from '../lib/utils.js';

const ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'favorites', label: 'Watchlist', icon: Heart },
  { id: 'downloads', label: 'Downloads', icon: Download },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function NavRail({ view, setView, favoritesCount, downloadsCount }) {
  const badgeFor = (id) =>
    id === 'favorites' ? favoritesCount : id === 'downloads' ? downloadsCount : 0;

  return (
    <nav className="glass z-30 flex shrink-0 flex-row items-center gap-1 overflow-x-auto rounded-full p-1.5 no-scrollbar lg:h-full lg:w-[76px] lg:flex-col lg:overflow-visible lg:rounded-[2rem] lg:px-0 lg:py-5">
      <button
        onClick={() => setView('home')}
        className="mr-1 grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/25 bg-gradient-to-br from-white/25 to-white/5 lg:mb-6 lg:mr-0"
        aria-label="Vision Stream home"
      >
        <Play size={16} className="ml-0.5 fill-white text-white" />
      </button>

      {ITEMS.map(({ id, label, icon: Icon }) => {
        const active = view === id;
        const badge = badgeFor(id);
        return (
          <button
            key={id}
            title={label}
            onClick={() => setView(id)}
            className={cn(
              'relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-colors lg:rounded-[1.1rem]',
              active ? 'text-white' : 'text-white/50 hover:bg-white/5 hover:text-white',
            )}
          >
            {active && (
              <motion.span
                layoutId="nav-active-pill"
                className="absolute inset-0 rounded-2xl border border-white/25 bg-white/15 lg:rounded-[1.1rem]"
                style={{ boxShadow: '0 0 28px rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.2)' }}
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              />
            )}
            <Icon size={20} strokeWidth={active ? 2.2 : 1.8} className="relative" />
            {badge > 0 && (
              <span className="absolute -right-0.5 -top-0.5 z-10 grid h-4 min-w-4 place-items-center rounded-full bg-cinema px-1 text-[10px] font-bold text-white ring-2 ring-black/60">
                {badge}
              </span>
            )}
            <span className="sr-only">{label}</span>
          </button>
        );
      })}

      <div className="ml-auto lg:mb-2 lg:ml-0 lg:mt-auto">
        <button
          title="Profile"
          onClick={() => setView('profile')}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-gradient-to-br from-indigo-400/60 to-fuchsia-500/50 text-sm font-bold text-white shadow-[0_0_18px_rgba(168,85,247,0.35)]"
        >
          A
        </button>
      </div>
    </nav>
  );
}
