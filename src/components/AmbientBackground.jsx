import { motion } from 'framer-motion';

const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E";

export default function AmbientBackground({ accent = '#818cf8', enabled = true }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#101018_0%,#050507_55%)]" />
      <motion.div
        className="absolute -top-48 left-[8%] h-[42rem] w-[42rem] rounded-full opacity-40 blur-[140px]"
        animate={{ backgroundColor: accent, opacity: enabled ? 0.32 : 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute -bottom-56 right-[4%] h-[38rem] w-[38rem] rounded-full opacity-30 blur-[150px]"
        animate={{ backgroundColor: accent, opacity: enabled ? 0.22 : 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute top-[38%] left-[55%] h-[26rem] w-[26rem] rounded-full opacity-20 blur-[120px]"
        animate={{ backgroundColor: '#7c3aed', opacity: enabled ? 0.16 : 0 }}
        transition={{ duration: 1.4 }}
      />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE}")` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_50%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
