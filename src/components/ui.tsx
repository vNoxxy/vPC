import { Fragment, type CSSProperties, type ReactNode } from "react";

export type Tone = "dark" | "light";

// Spelled out (not `tone-${tone}`) so Tailwind sees both class names and keeps them in the build.
const TONE_CLASS: Record<Tone, string> = { dark: "tone-dark", light: "tone-light" };

/**
 * A string whose accent words are written as `*word*`.
 * - In a headline they get the selection frame (`.mark`: outline + a handle on each corner).
 * - With `plain`, for running text, they are only colored.
 */
export function Rich({ text, plain = false }: { text: string; plain?: boolean }) {
  return text.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 === 0 ? (
      <Fragment key={i}>{part}</Fragment>
    ) : plain ? (
      <em key={i} className="mark-plain">
        {part}
      </em>
    ) : (
      <em key={i} className="mark">
        {/* Carries the two handles the frame's own ::before/::after can't draw. */}
        <i aria-hidden />
        {part}
      </em>
    ),
  );
}

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

/** One band of a page. `tone` flips every color inside it; a paper one is a rounded sheet laid on the ink. */
export function Section({
  tone = "dark",
  id,
  divider = false,
  className = "",
  innerClassName = "py-20 lg:py-28",
  style,
  children,
}: {
  tone?: Tone;
  id?: string;
  /** Sets two stacked sections of the same tone apart: a hairline on ink, a gap between sheets. */
  divider?: boolean;
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      style={style}
      className={`${TONE_CLASS[tone]} relative ${tone === "light" ? "sheet" : ""} ${divider ? (tone === "light" ? "mt-3" : "border-t border-[var(--line)]") : ""} ${className}`}
    >
      <div className={`guides relative ${innerClassName}`}>{children}</div>
    </section>
  );
}

export function SectionHead({
  kicker,
  title,
  lede,
  compact = false,
  className = "",
}: {
  kicker?: string;
  title: string;
  lede?: string;
  /** Smaller title, for a head sitting in a narrow column next to its content. */
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-[760px] ${className}`}>
      {kicker && <p className="kicker">{kicker}</p>}
      <h2 className={`h-section ${compact ? "!text-[clamp(19px,2.25vw,30px)]" : ""} ${kicker ? "mt-6" : ""}`}>
        <Rich text={title} />
      </h2>
      {lede && <p className="lede mt-5 max-w-[600px]">{lede}</p>}
    </div>
  );
}

/** A plain list: one line per item, a short dash in the margin. */
export function DashList({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={`text-[14.5px] leading-relaxed text-[var(--fg-muted)] ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="mb-2 flex gap-2.5">
          <span aria-hidden className="text-[var(--fg-faint)]">
            –
          </span>
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A name across the sheet, as large as one line allows on a wide screen; on a phone it breaks
 * between its words. Decorative (hidden from screen readers): the page's h1 follows it.
 */
export function Wordmark({ text, className = "" }: { text: string; className?: string }) {
  const longest = Math.max(...text.split(/\s+/).map((word) => word.length));
  // Syne's widest capitals run up to ~1.2em: 80cqw over the letters keeps any name on its line,
  // never broken inside a word.
  const style: CSSProperties = { fontSize: `min(200px, max(${(80 / text.length).toFixed(2)}cqw, min(${(80 / longest).toFixed(2)}cqw, 64px)))` };
  return (
    <div aria-hidden className={`w-full [container-type:inline-size] ${className}`}>
      <p className="h-wordmark" style={style}>
        {text}
      </p>
    </div>
  );
}

/** A dimension line, as on a technical drawing: a hairline between two ticks, its label in the middle. */
export function DimLine({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`dim-line ${className}`}>
      <span>{text}</span>
    </p>
  );
}

/** The curved planes behind a hero, in flat tones of the page's accent. Put it in a clipping box covering the section. */
export function HeroPlanes({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 1500" preserveAspectRatio="none" className={`hero-planes ${className}`}>
      <path className="p2" d="M0,1000 C380,920 640,560 1440,190 L1440,350 C720,690 430,1070 0,1160 Z" />
      <path className="p1" d="M0,1160 C430,1070 720,690 1440,350 L1440,790 C920,990 520,1320 0,1500 Z" />
      <path className="p3" d="M0,1500 C520,1320 920,990 1440,790 L1440,860 C960,1050 600,1360 160,1500 Z" />
      <path className="edge" d="M0,1000 C380,920 640,560 1440,190" />
      <path className="edge" d="M0,1160 C430,1070 720,690 1440,350" />
    </svg>
  );
}

/**
 * Opening section of a page: the curved planes behind, a name across the sheet, the headline in two
 * tones, the description and the call(s) to action.
 */
export function PageHero({
  kicker,
  wordmark,
  dimension,
  title,
  description,
  action,
  children,
}: {
  kicker: ReactNode;
  wordmark: string;
  dimension?: string;
  title: string;
  description: string;
  action?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="tone-dark relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <HeroPlanes />
      </div>
      <div className="guides relative pb-16 pt-12 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="flex flex-col items-center text-center">
          {kicker}
          <Wordmark text={wordmark} className="mt-7" />
          {dimension && <DimLine text={dimension} className="mt-5 hidden w-full max-w-[1000px] sm:flex" />}
          <h1 className="h-subline mt-8 max-w-[900px]">
            <Rich plain text={title} />
          </h1>
          <p className="lede mt-5 max-w-[640px]">{description}</p>
          {action && <div className="hero-actions mt-9 flex flex-wrap justify-center gap-3">{action}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}

/** My round mark: my initials on the page's accent. */
export function Monogram({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full bg-[var(--accent-fill)] font-display text-[13px] font-extrabold tracking-[-0.02em] text-[var(--accent-on)] ${className}`}
    >
      TV
    </span>
  );
}

/**
 * Marks what was written or corrected for the portfolio where a TP was unfinished, so that Timéo can
 * read it again. Only while the site runs locally (`npm run dev`): the deployed site never shows it.
 */
export function ReviewMark({ kind, note }: { kind: "added" | "fixed"; note?: string }) {
  if (!import.meta.env.DEV) return null;
  return (
    <span
      title={note}
      className="ml-2 inline-flex h-5 items-center rounded-full border border-amber-500/60 bg-amber-400/15 px-2 align-middle font-tech text-[9.5px] font-bold uppercase tracking-[0.08em] text-amber-600"
    >
      {kind === "added" ? "À relire · ajouté" : "À relire · corrigé"}
    </span>
  );
}
