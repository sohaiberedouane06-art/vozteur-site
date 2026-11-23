import { ChevronRight } from 'lucide-react';

export default function SectionHeading({ title, actionLabel = 'See all', onAction }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[15px] font-semibold tracking-tight text-white/90">{title}</h2>
      {actionLabel && (
        <button
          onClick={onAction}
          className="flex items-center gap-0.5 text-xs font-medium text-white/40 transition hover:text-white"
        >
          {actionLabel}
          <ChevronRight size={13} />
        </button>
      )}
    </div>
  );
}
