import type { CSSProperties } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { CATEGORY_BY_KEY } from "../data/competences";
import { periodLabel } from "../data/realisations";
import type { Realisation } from "../data/types";
import { accentStyle } from "../lib/accents";
import type { Tone } from "./ui";

/** A réalisation as a card that leads to its page, in its bloc's color. */
export default function RealisationCard({ r, tone, index, style }: { r: Realisation; tone: Tone; index?: number; style?: CSSProperties }) {
  const category = CATEGORY_BY_KEY[r.category];
  return (
    <Link
      to={`/realisations/${r.slug}`}
      viewTransition
      style={{ ...accentStyle(category.accent, tone), ...style }}
      className="card lift group flex h-full flex-col p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="tag tag-accent">
          <i aria-hidden className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          {category.label}
        </span>
        {index !== undefined && <span className="font-tech text-[12px] font-bold text-[var(--fg-faint)]">{String(index + 1).padStart(2, "0")}</span>}
      </div>
      <h3 className="mt-6 text-[15px] font-extrabold uppercase leading-snug tracking-[0.05em]">{r.title}</h3>
      <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-[var(--fg-muted)]">{r.summary}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="font-tech text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--fg-faint)]">{periodLabel(r)}</span>
        <FontAwesomeIcon icon={faArrowRight} className="text-[12px] text-[var(--accent-text)] transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
