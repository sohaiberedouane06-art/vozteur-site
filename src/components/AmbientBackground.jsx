import { motion } from 'framer-motion';

const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E";

export default function AmbientBackground({ accent = '#818cf8', enabled = true }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#07070b]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#12121c_0%,#0b0b12_45%,#09090f_100%)]" />
      <motion.div
        className="absolute -top-56 -left-40 h-[56rem] w-[56rem] rounded-full blur-[160px]"
        animate={{ backgroundColor: accent, opacity: enabled ? 0.3 : 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute -bottom-64 -right-32 h-[52rem] w-[52rem] rounded-full blur-[170px]"
        animate={{ backgroundColor: accent, opacity: enabled ? 0.22 : 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute -bottom-48 -left-24 h-[34rem] w-[40rem] rounded-full blur-[150px]"
        animate={{ backgroundColor: accent, opacity: enabled ? 0.14 : 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute -bottom-40 left-[35%] h-[28rem] w-[44rem] rounded-full blur-[150px]"
        animate={{ backgroundColor: accent, opacity: enabled ? 0.1 : 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute top-[30%] left-[48%] h-[26rem] w-[26rem] rounded-full blur-[130px]"
        animate={{ backgroundColor: '#7c3aed', opacity: enabled ? 0.12 : 0 }}
        transition={{ duration: 1.4 }}
      />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE}")` }}
      />
    </div>
  );
}
