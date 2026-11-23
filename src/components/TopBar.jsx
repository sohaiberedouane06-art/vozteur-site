import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Bell } from 'lucide-react';
import { TABS } from '../data/catalog.js';
import { cn } from '../lib/utils.js';
import Avatar from './Avatar.jsx';

export default function TopBar({ tab, onSelectTab, query, setQuery, profile, onOpenProfile }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
    <header className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2.5 px-4 py-3 sm:px-6">
      <div className="glass-soft flex w-full items-center gap-2.5 rounded-full px-4 py-2.5 transition focus-within:border-white/30 focus-within:bg-white/10 sm:w-72">
        <Search size={16} className="shrink-0 text-white/45" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, series, anime…"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
        />
        {query ? (
          <button onClick={() => setQuery('')} className="icon-btn h-6 w-6" aria-label="Clear search">
            <X size={13} />
          </button>
        ) : (
          <kbd className="hidden shrink-0 rounded-md border border-white/15 px-1.5 py-0.5 text-[10px] font-medium text-white/35 sm:block">
            ⌘K
          </kbd>
        )}
      </div>

      <nav className="no-scrollbar -m-2 flex items-center gap-1 overflow-x-auto p-2">
        {TABS.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => onSelectTab(t)}
              className={cn(
                'relative shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors',
                active ? 'text-white' : 'text-white/50 hover:bg-white/5 hover:text-white',
              )}
            >
              {active && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full border border-white/15 bg-white/15 backdrop-blur-md"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                />
              )}
              <span className="relative">{t}</span>
            </button>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <button className="icon-btn relative h-10 w-10 border border-white/10 bg-white/5" aria-label="Notifications">
          <Bell size={17} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-cinema ring-2 ring-black/50" />
        </button>
        <button
          onClick={onOpenProfile}
          className="glass-soft group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3.5 transition hover:bg-white/10"
          aria-label="Open profile"
        >
          <Avatar src={profile.avatar} size={28} className="transition duration-300 group-hover:scale-110" />
          <span className="hidden text-[13px] font-medium text-white/85 sm:block">{profile.name}</span>
        </button>
      </div>
    </header>
    <div className="hairline-h shrink-0" />
    </>
  );
}
