import { Fragment, useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import type { Shot } from "../data/types";
import { picture } from "../lib/images";
import { withBase } from "../lib/site";
import { useFinePointer } from "../lib/motion";
import { Curtain, Lines, Reveal } from "./Reveal";

/** Running text where `code` between backticks is set in monospace. */
export function Inline({ text }: { text: string }) {
  return text.split(/`([^`]+)`/g).map((part, i) =>
    i % 2 === 0 ? (
      <Fragment key={i}>{part}</Fragment>
    ) : (
      <code key={i} className="code-inline">
        {part}
      </code>
    ),
  );
}

/* ---------- Icons: drawn once, at the size of the text around them ---------- */

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={`arrow inline-block h-[1em] w-[1em] ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function ArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={`inline-block h-[1em] w-[1em] ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5" />
    </svg>
  );
}

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={`arrow arrow-ne inline-block h-[0.9em] w-[0.9em] ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
    </svg>
  );
}

export function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={`inline-block h-[1em] w-[1em] ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
    </svg>
  );
}

export function Dot({ color, className = "", glow = false }: { color: string; className?: string; glow?: boolean }) {
  return <i aria-hidden className={`dot ${className}`} style={{ background: color, boxShadow: glow ? `0 0 12px ${color}` : undefined }} />;
}

/* ---------- Layout pieces ---------- */

/** The label a section opens on: its number, its name, and a hairline to the edge. */
export function SectionLabel({ index, children, className = "" }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <Reveal variant="fade" className={`sec-label label ${className}`}>
      {index && <span className="text-accent">({index})</span>}
      <span>{children}</span>
    </Reveal>
  );
}

/**
 * The top of an inner page: a mono label, the title rising line by line, a lead, and on a wide screen
 * a short sheet of facts on the right. `title` lines are broken by the page.
 */
export function PageHero({
  label,
  title,
  lead,
  before,
  actions,
  aside,
  children,
}: {
  label: ReactNode;
  title: ReactNode[];
  lead?: ReactNode;
  before?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44 lg:pb-24">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[140px]" />
      <div className="wrap relative">
        {before && <div className="mb-8" data-anim="rise">{before}</div>}
        <p className="label mb-7 flex items-center gap-3" data-anim="rise">
          <span className="h-px w-8 bg-accent" />
          {label}
        </p>
        <Lines as="h1" lines={title} className="t-display max-w-[1150px]" />
        <div className={`mt-10 grid gap-12 lg:mt-14 ${aside ? "lg:grid-cols-[1.25fr_1fr] lg:gap-20" : ""}`}>
          <div>
            {lead && (
              <Reveal delay={250} className="t-lead max-w-[680px]">
                {lead}
              </Reveal>
            )}
            {actions && (
              <Reveal delay={350} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                {actions}
              </Reveal>
            )}
          </div>
          {aside && <Reveal delay={400}>{aside}</Reveal>}
        </div>
        {children}
      </div>
    </section>
  );
}

/** A short sheet of facts: a mono label on the left, its value on the right, ruled by hairlines. */
export function Facts({ rows }: { rows: { label: string; value: ReactNode; live?: boolean }[] }) {
  return (
    <dl className="rows">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[120px_1fr] items-baseline gap-4 py-3.5 sm:grid-cols-[140px_1fr]">
          <dt className="label !text-[11px]">{row.label}</dt>
          <dd className="flex items-center gap-2.5 text-[15.5px] font-medium">
            {row.live && <i aria-hidden className="live-dot" />}
            <span className="min-w-0">{row.value}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** A screenshot, served as WebP at the width the screen needs, with its caption. */
export function Figure({ shot, className = "", priority = false, sizes = "(min-width: 1360px) 1280px, 92vw" }: { shot: Shot; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <figure className={className}>
      <Curtain>
        <a href={withBase(shot.src)} target="_blank" rel="noopener noreferrer" aria-label={`Ouvrir l'image en grand : ${shot.caption}`} data-cursor="Zoom" className="block">
          <Picture src={shot.src} alt={shot.caption} sizes={sizes} priority={priority} className="shot" />
        </a>
      </Curtain>
      <figcaption className="mt-4 flex gap-3 text-[14px] leading-snug text-soft">
        <span className="label !text-[11px] text-accent">Fig.</span>
        {shot.caption}
      </figcaption>
    </figure>
  );
}

export function Picture({ src, alt, sizes, className = "", priority = false, style }: { src: string; alt: string; sizes?: string; className?: string; priority?: boolean; style?: CSSProperties }) {
  const p = picture(src);
  return (
    <picture className="contents">
      {p.srcSet && <source type="image/webp" srcSet={p.srcSet} sizes={sizes} />}
      <img
        src={withBase(src)}
        alt={alt}
        width={p.width}
        height={p.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        className={className}
        style={style}
      />
    </picture>
  );
}

/** Vody Studio's name as the studio writes it: its round mark and the wordmark in Syne. */
export function VodyBrand({ className = "", large = false }: { className?: string; large?: boolean }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <img src={withBase("/images/vody-logo.jpg")} alt="" width={48} height={48} className={`rounded-full ${large ? "h-12 w-12 sm:h-14 sm:w-14" : "h-9 w-9"}`} />
      <span className={`whitespace-nowrap font-brand font-extrabold tracking-[0.06em] ${large ? "text-[20px] sm:text-[24px]" : "text-[16px]"}`}>VODY STUDIO</span>
    </span>
  );
}

/** Pulls its child toward the pointer, a little, while the pointer is over it. */
export function Magnetic({ children, strength = 0.28, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || !fine) return;
    const box = el.getBoundingClientRect();
    const x = (e.clientX - box.left - box.width / 2) * strength;
    const y = (e.clientY - box.top - box.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={`inline-flex transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${className}`}>
      {children}
    </span>
  );
}

/** A count that runs up to its value the first time it is seen. */
export { default as Counter } from "./Counter";
