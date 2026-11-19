import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

/** A row of text tabs over a strong rule; the chosen tab is underlined, and the underline slides to it. */
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
      setStyle({ width: tab.offsetWidth, transform: `translate(${tab.offsetLeft}px, ${tab.offsetTop + tab.offsetHeight - 2}px)`, top: 0, bottom: "auto" });
    };
    place();
    const observer = new ResizeObserver(place);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} role="tablist" aria-label={label} className="relative flex flex-wrap gap-x-7 gap-y-1 border-b-[1.5px] border-ink">
      <span aria-hidden className="tab-indicator" style={style} />
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          role="tab"
          aria-selected={o.key === value}
          data-key={o.key}
          onClick={() => onChange(o.key)}
          className={`flex items-baseline gap-1.5 py-3 text-[15.5px] font-semibold transition-colors ${o.key === value ? "text-ink" : "text-soft hover:text-ink"}`}
        >
          {o.label}
          {o.count !== undefined && <span className="text-[13px] font-medium text-faint">{o.count}</span>}
        </button>
      ))}
    </div>
  );
}
