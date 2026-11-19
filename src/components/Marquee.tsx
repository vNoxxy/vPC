import type { CSSProperties, ReactNode } from "react";

/** An endless strip, paused under the pointer. The content is drawn twice so the loop has no seam. */
export default function Marquee({ items, speed = 40, className = "" }: { items: ReactNode[]; speed?: number; className?: string }) {
  const track = (hidden: boolean) => (
    <ul className="marquee-track" aria-hidden={hidden || undefined} style={{ "--speed": `${speed}s` } as CSSProperties}>
      {items.map((item, i) => (
        <li key={i} className="flex shrink-0 items-center">
          {item}
          <span aria-hidden className="mx-6 text-accent sm:mx-9">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee ${className}`}>
      {track(false)}
      {track(true)}
    </div>
  );
}
