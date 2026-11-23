import { cn } from '../lib/utils.js';

export default function Avatar({ src, size = 28, className }) {
  return (
    <img
      src={src}
      alt="Profile avatar"
      draggable="false"
      style={{ width: size, height: size }}
      className={cn('rounded-full bg-white/10 object-cover ring-1 ring-white/20', className)}
    />
  );
}
