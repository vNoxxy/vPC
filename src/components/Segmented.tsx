import { useSlidingIndicator } from "../lib/useSlidingIndicator";

/** A segmented control whose fill slides to the chosen segment. Wraps onto several lines on a phone. */
export default function Segmented<K extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { key: K; label: string; count?: number }[];
  value: K;
  onChange: (key: K) => void;
  label: string;
}) {
  const { containerRef, style } = useSlidingIndicator<HTMLDivElement>(value);
  return (
    <div ref={containerRef} role="tablist" aria-label={label} className="relative inline-flex max-w-full flex-wrap gap-1 rounded-[24px] border border-[var(--line-strong)] bg-[var(--card)] p-1">
      <span aria-hidden className="seg-indicator rounded-full bg-[var(--accent-fill)]" style={style} />
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          role="tab"
          aria-selected={o.key === value}
          data-seg-key={o.key}
          onClick={() => onChange(o.key)}
          className={`relative z-10 flex h-9 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[13px] font-semibold ${
            o.key === value ? "text-[var(--accent-on)]" : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
          }`}
        >
          {o.label}
          {o.count !== undefined && <span className="font-tech text-[11px] opacity-70">{o.count}</span>}
        </button>
      ))}
    </div>
  );
}
