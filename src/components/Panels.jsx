import { motion } from 'framer-motion';
import { Sparkles, Wind, Zap } from 'lucide-react';
import { cn } from '../lib/utils.js';

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
