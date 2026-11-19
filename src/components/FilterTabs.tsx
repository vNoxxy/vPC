import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

/** A row of pill tabs; a solid pill slides under the chosen one. */
export default function FilterTabs<K extends string>({
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
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({ opacity: 0 });

  useLayoutEffect(() => {
    const place = () => {
      const tab = ref.current?.querySelector<HTMLElement>(`[data-key="${CSS.escape(value)}"]`);
      if (!tab) return;
      setStyle({ width: tab.offsetWidth, height: tab.offsetHeight, transform: `translate(${tab.offsetLeft}px, ${tab.offsetTop}px)` });
    };
    place();
    const observer = new ResizeObserver(place);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} role="tablist" aria-label={label} className="relative flex flex-wrap gap-1 rounded-[28px] border border-[var(--line)] bg-surface p-1.5 sm:inline-flex sm:rounded-full">
      <span aria-hidden className="tab-pill" style={style} />
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          role="tab"
          aria-selected={o.key === value}
          data-key={o.key}
          onClick={() => onChange(o.key)}
          className={`relative flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-medium transition-colors duration-300 ${o.key === value ? "text-bg" : "text-soft hover:text-fg"}`}
        >
          {o.label}
          {o.count !== undefined && <span className={`num text-[11.5px] ${o.key === value ? "text-bg/60" : "text-faint"}`}>{o.count}</span>}
        </button>
      ))}
    </div>
  );
}
