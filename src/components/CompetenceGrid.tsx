import type { CSSProperties } from "react";
import { Link } from "react-router";
import { ACCENTS } from "../lib/accents";
import { COVERAGE } from "../lib/coverage";
import { Reveal } from "./Reveal";
import { ArrowRight } from "./ui";

/** The six competencies of the E4 table as cards: how many of their activities are already proved, and by how much work. */
export default function CompetenceGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {COVERAGE.map(({ competence: c, proofs, covered, works }, i) => {
        const color = ACCENTS[c.accent];
        return (
          <Reveal as="li" key={c.key} delay={(i % 3) * 90} className="h-full">
            <Link
              to={`/competences#${c.key}`}
              viewTransition
              className="spot card group flex h-full flex-col p-7 transition-transform duration-500 hover:-translate-y-1"
              style={{ "--spot-color": color } as CSSProperties}
            >
              <div className="flex items-center justify-between">
                <span className="num text-[13px]" style={{ color }}>
                  C{i + 1}
                </span>
                <ArrowRight className="text-faint transition-all duration-500 group-hover:translate-x-1 group-hover:text-fg" />
              </div>
              <h3 className="mt-8 text-[22px] font-semibold leading-[1.15] tracking-[-0.025em]">{c.label}</h3>
              <div className="mt-auto pt-10">
                {/* One segment per activity, lit when a piece of work proves it. */}
                <div className="flex gap-1.5" aria-hidden>
                  {proofs.map((p, ai) => (
                    <span
                      key={ai}
                      className="h-1.5 flex-1 rounded-full transition-[box-shadow] duration-500"
                      style={{ background: p.length ? color : "rgba(255,255,255,0.08)", boxShadow: p.length ? `0 0 14px -2px ${color}` : undefined }}
                    />
                  ))}
                </div>
                <p className="mt-4 flex justify-between text-[14px] text-soft">
                  <span>
                    <span className="num text-fg">{covered}</span>/{proofs.length} activités prouvées
                  </span>
                  <span className="num">{works} réal.</span>
                </p>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
