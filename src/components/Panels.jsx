import { motion } from 'framer-motion';
import { Heart, Download, Clock3, BadgeCheck, LogOut, Sparkles, Wind, Zap } from 'lucide-react';
import { cn } from '../lib/utils.js';

export function ProfilePanel({ favoritesCount, downloadsCount }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass mx-auto max-w-md rounded-3xl p-8 text-center"
    >
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-white/25 bg-gradient-to-br from-indigo-400/70 to-fuchsia-500/60 text-2xl font-bold shadow-[0_0_40px_rgba(168,85,247,0.4)]">
        A
      </div>
      <h2 className="mt-4 text-xl font-bold text-white">Aria Nakamura</h2>
      <p className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
        <BadgeCheck size={13} /> Premium member
      </p>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { icon: Heart, label: 'Watchlist', value: favoritesCount },
          { icon: Download, label: 'Downloads', value: downloadsCount },
          { icon: Clock3, label: 'Hours watched', value: '128h' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="glass-soft rounded-2xl px-2 py-4">
            <Icon size={16} className="mx-auto text-white/60" />
            <p className="mt-2 text-lg font-bold text-white">{value}</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">{label}</p>
          </div>
        ))}
      </div>
      <button className="glass-btn mt-6 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white/80">
        <LogOut size={15} /> Sign out
      </button>
    </motion.div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
      className={cn('relative h-6 w-11 shrink-0 rounded-full border transition', on ? 'border-white/40 bg-white/80' : 'border-white/15 bg-white/10')}
    >
      <motion.span
        className={cn('absolute top-0.5 h-5 w-5 rounded-full', on ? 'bg-black' : 'bg-white/70')}
        animate={{ left: on ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      />
    </button>
  );
}

export function SettingsPanel({ settings, setSettings }) {
  const rows = [
    { key: 'ambient', icon: Sparkles, label: 'Ambient glow', desc: 'Background adapts to the featured title', value: settings.ambient },
    { key: 'reduceMotion', icon: Wind, label: 'Reduce motion', desc: 'Minimize animations across the interface', value: settings.reduceMotion },
    { key: 'autoplay', icon: Zap, label: 'Autoplay trailers', desc: 'Play previews automatically in the details view', value: settings.autoplay },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass mx-auto max-w-md rounded-3xl p-6 sm:p-8"
    >
      <h2 className="text-xl font-bold text-white">Settings</h2>
      <p className="mt-1 text-xs text-white/45">Tune the spatial experience to your liking.</p>
      <div className="mt-6 flex flex-col divide-y divide-white/5">
        {rows.map(({ key, icon: Icon, label, desc, value }) => (
          <div key={key} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
            <span className="glass-soft grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-white/70">
              <Icon size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white/90">{label}</p>
              <p className="text-xs text-white/40">{desc}</p>
            </div>
            <Toggle on={value} onChange={(v) => setSettings((s) => ({ ...s, [key]: v }))} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
