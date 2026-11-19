import type { CSSProperties } from "react";
import { Link } from "react-router";
import { BRIDGE } from "../data/bridge";
import { PROJECT_BY_SLUG } from "../data/realisations";
import { ACCENTS } from "../lib/accents";
import { DOCUMENTS } from "../lib/documents";
import { Reveal } from "./Reveal";
import { ArrowDown } from "./ui";

/**
 * The bridge between the courses and the studio: a notion seen in a TP (whose document can be
 * downloaded), a wire, and where that notion now runs in production.
 */
export default function Bridge() {
  return (
    <ol className="rows">
      {BRIDGE.map((l, i) => {
        const doc = DOCUMENTS.find((d) => d.name.includes(l.doc));
        const project = PROJECT_BY_SLUG.get(l.project);
        const color = project ? ACCENTS[project.accent] : "var(--accent)";
        return (
          <Reveal as="li" key={l.notion} delay={i * 60} className="group grid gap-5 py-8 lg:grid-cols-[minmax(0,0.9fr)_120px_minmax(0,1.1fr)] lg:items-center lg:gap-8 lg:py-10">
            <div>
              <p className="num text-[12px] text-faint">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="t-h3 mt-2 transition-colors duration-300 group-hover:text-accent">{l.notion}</h3>
              {doc ? (
                <a href={doc.url} download={doc.downloadName} className="chip mt-4 transition-colors hover:border-accent hover:text-fg">
                  TP · {l.tp} <ArrowDown />
                </a>
              ) : (
                <span className="chip mt-4">TP · {l.tp}</span>
              )}
            </div>
            {/* The wire, and a packet running along it. */}
            <div aria-hidden className="relative hidden h-px bg-[var(--line-strong)] lg:block">
              <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-fg" />
              <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full" style={{ background: color }} />
              <span
                className="absolute top-1/2 h-[3px] w-6 -translate-y-1/2 rounded-full opacity-0 group-hover:animate-[wire_1.2s_cubic-bezier(.65,0,.35,1)_infinite] group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${color})` } as CSSProperties}
              />
            </div>
            <div>
              <p className="text-[18px] leading-relaxed text-[#c3c8d1] sm:text-[19px]">{l.where}</p>
              {project && (
                <Link to={`/vody-studio/${project.slug}`} viewTransition className="label mt-3 inline-flex items-center gap-2 !text-[11px] hover:text-fg">
                  <i className="dot" style={{ background: color }} /> {project.short}
                </Link>
              )}
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
