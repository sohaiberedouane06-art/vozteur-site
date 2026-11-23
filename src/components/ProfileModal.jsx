import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Dices, Check, User } from 'lucide-react';
import { AVATARS, randomAvatar } from '../lib/profile.js';
import Avatar from './Avatar.jsx';
import { cn } from '../lib/utils.js';

export default function ProfileModal({ open, profile, onSave, onClose }) {
  const [draft, setDraft] = useState(profile);

  useEffect(() => {
    if (open) setDraft(profile);
  }, [open, profile]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const handleSave = () => {
    onSave({ name: draft.name.trim() || 'Guest', avatar: draft.avatar });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Profile"
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="glass-strong relative w-full max-w-md rounded-3xl border-white/20 p-6 sm:p-7"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="glass-btn absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-white"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-4">
              <Avatar src={draft.avatar} size={64} className="ring-2 ring-white/30" />
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">Profile</h2>
                <p className="mt-0.5 text-xs text-white/50">Customize your identity — saved on this device.</p>
              </div>
            </div>

            <label className="mt-6 block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Username
            </label>
            <div className="glass-soft mt-2 flex items-center gap-2.5 rounded-full px-4 py-2.5 transition focus-within:border-white/30 focus-within:bg-white/10">
              <User size={15} className="shrink-0 text-white/40" />
              <input
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                placeholder="Your display name"
                maxLength={24}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>

            <div className="mt-5 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">Choose your avatar</p>
              <button
                onClick={() => setDraft((d) => ({ ...d, avatar: randomAvatar(AVATARS.find((a) => a.src === d.avatar)?.id).src }))}
                className="glass-btn flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white/80"
              >
                <Dices size={13} />
                Randomize
              </button>
            </div>

            <div className="custom-scroll mt-2.5 grid max-h-56 grid-cols-4 gap-2.5 overflow-y-auto pr-1">
              {AVATARS.map((a) => {
                const selected = draft.avatar === a.src;
                return (
                  <button
                    key={a.id}
                    onClick={() => setDraft((d) => ({ ...d, avatar: a.src }))}
                    title={a.label}
                    aria-pressed={selected}
                    className={cn(
                      'relative rounded-2xl border p-1.5 transition duration-200 hover:scale-105',
                      selected
                        ? 'border-white/60 bg-white/15'
                        : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10',
                    )}
                    style={selected ? { boxShadow: '0 0 22px rgba(255,255,255,0.28), inset 0 1px 0 rgba(255,255,255,0.25)' } : undefined}
                  >
                    <img
                      src={a.src}
                      alt={a.label}
                      loading="lazy"
                      draggable="false"
                      className="aspect-square w-full rounded-xl object-cover ring-1 ring-white/20"
                    />
                    {selected && (
                      <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-white text-black shadow">
                        <Check size={11} strokeWidth={3.5} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleSave}
              className="mt-6 w-full rounded-full bg-white py-3 text-sm font-bold text-black transition hover:bg-white/85 active:scale-[0.98]"
              style={{ boxShadow: '0 10px 30px rgba(255,255,255,0.25)' }}
            >
              Save &amp; Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
