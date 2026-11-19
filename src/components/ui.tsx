import { Fragment, type ReactNode } from "react";
import type { Shot } from "../data/types";
import { withBase } from "../lib/site";

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

/**
 * The top of a page: its title, a sentence or two, and on a wide screen a short sheet of facts on
 * the right. `before` sits above the title (a way back), `actions` under the text.
 */
export function PageHead({
  title,
  lead,
  before,
  actions,
  aside,
}: {
  title: string;
  lead?: ReactNode;
  before?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="wrap pb-14 pt-10 sm:pt-14 lg:pb-20 lg:pt-[70px]">
      {before && <div className="mb-8">{before}</div>}
      <div className={`grid gap-10 ${aside ? "lg:grid-cols-[1.55fr_1fr] lg:gap-[72px]" : ""}`}>
        <div>
          <h1 className="t-page">{title}</h1>
          {lead && <div className="mt-6 max-w-[720px] text-[18px] leading-[1.6] text-[#2f3440] sm:text-[19px]">{lead}</div>}
          {actions && <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">{actions}</div>}
        </div>
        {aside && <div className="lg:pt-3">{aside}</div>}
      </div>
    </section>
  );
}

/** A short sheet of facts: a label on the left, its value on the right, ruled by hairlines. */
export function Facts({ rows }: { rows: { label: string; value: ReactNode; live?: boolean }[] }) {
  return (
    <dl className="border-t-[1.5px] border-ink">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[112px_1fr] gap-4 border-b border-rule py-3 text-[15px] sm:grid-cols-[128px_1fr]">
          <dt className="text-soft">{row.label}</dt>
          <dd className="flex items-baseline gap-2 font-semibold">
            {row.live && <i aria-hidden className="dot translate-y-[-1px] bg-[#2fbf71]" />}
            <span className="min-w-0">{row.value}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The strong rule a section opens on, its name on the left and a note on the right. */
export function SectionHead({ title, note, id, as: Tag = "h2" }: { title: string; note?: ReactNode; id?: string; as?: "h2" | "h3" }) {
  return (
    <div id={id} className="sec-head scroll-mt-24">
      <Tag className="text-[17px] font-bold">{title}</Tag>
      {note && <p>{note}</p>}
    </div>
  );
}

/** A label and its text side by side on a wide screen, stacked on a phone; meant for a `rule-rows` list. */
export function Row({ label, children, labelClass = "" }: { label: ReactNode; children: ReactNode; labelClass?: string }) {
  return (
    <div className="grid gap-2 py-5 sm:grid-cols-[220px_1fr] sm:gap-8">
      <div className={`text-[15px] font-bold ${labelClass}`}>{label}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function Dot({ color, className = "" }: { color: string; className?: string }) {
  return <i aria-hidden className={`dot ${className}`} style={{ background: color }} />;
}

/** A screenshot with its caption. */
export function Figure({ shot, className = "", priority = false }: { shot: Shot; className?: string; priority?: boolean }) {
  return (
    <figure className={className}>
      <a href={withBase(shot.src)} target="_blank" rel="noopener noreferrer" aria-label="Ouvrir l'image en grand">
        <img src={withBase(shot.src)} alt={shot.caption} loading={priority ? "eager" : "lazy"} className="shot" />
      </a>
      <figcaption className="caption">{shot.caption}</figcaption>
    </figure>
  );
}

/** Vody Studio's name as the studio writes it: its round mark and the wordmark in Syne. */
export function VodyBrand({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 sm:gap-3.5 ${className}`}>
      <img src={withBase("/images/vody-logo.jpg")} alt="" className="h-10 w-10 rounded-full sm:h-12 sm:w-12" />
      <span className="whitespace-nowrap font-brand text-[17px] font-extrabold tracking-[0.06em] sm:text-[21px]">VODY STUDIO</span>
    </span>
  );
}
