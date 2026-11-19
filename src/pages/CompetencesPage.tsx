import { Fragment, useState, type CSSProperties } from "react";
import { Link } from "react-router";
import CompetenceGrid from "../components/CompetenceGrid";
import { Lines, Reveal } from "../components/Reveal";
import { Dot, Facts, PageHero, SectionLabel } from "../components/ui";
import { CATEGORY_BY_KEY, COMPETENCES } from "../data/competences";
import { PROFILE, SKILLS } from "../data/profile";
import { WORKS, periodLabel } from "../data/realisations";
import type { CompetenceKey, Work } from "../data/types";
import { ACCENTS } from "../lib/accents";
import { ACTIVITY_COUNT, COVERAGE, COVERED_COUNT } from "../lib/coverage";
import { siteAddress } from "../lib/site";
import { usePageMeta } from "../lib/usePageMeta";

const SHORT: Record<CompetenceKey, string> = {
  patrimoine: "Patrimoine",
  incidents: "Incidents",
  presence: "Présence en ligne",
  projet: "Mode projet",
  service: "Mise à dispo.",
  devpro: "Dév. pro.",
};

/** A row's name: a project links to its page; the BTS work has none, its documents are on the Documents page. */
function WorkName({ r, className = "" }: { r: Work; className?: string }) {
  if (r.category !== "perso") return <span className={className}>{r.short}</span>;
  return (
    <Link to={`/vody-studio/${r.slug}`} viewTransition className={`link ${className}`}>
      {r.short}
    </Link>
  );
}

/** The rows of the E4 table, grouped like the official sheet. */
const GROUPS: { title: string; items: Work[]; empty?: string }[] = [
  { title: "Réalisations en cours de formation", items: WORKS.filter((r) => r.category !== "perso") },
  { title: "Réalisations personnelles, Vody Studio", items: WORKS.filter((r) => r.category === "perso") },
  { title: "En milieu professionnel, première année", items: [], empty: "Le stage de première année : en cours de recherche." },
  { title: "En milieu professionnel, seconde année", items: [], empty: "À venir." },
];

export default function CompetencesPage() {
  usePageMeta("Compétences", "Le tableau de synthèse E4 de Timéo Vaast : chaque compétence reliée aux réalisations qui la prouvent.");
  // The column under the pointer lights up, so a competency can be read down the table.
  const [col, setCol] = useState<CompetenceKey | null>(null);

  return (
    <>
      <PageHero
        label="Compétences · Épreuve E4"
        title={["Ce que je sais faire,", <span className="serif text-accent-soft">et ce qui le prouve.</span>]}
        lead={
          <>
            Le tableau de synthèse de l'épreuve E4 : chaque ligne est un TP, un exercice ou un projet, et chaque point une compétence qu'il démontre. Les documents sont sur la{" "}
            <Link to="/documents" viewTransition className="link-line text-fg">
              page Documents
            </Link>
            .
          </>
        }
        aside={
          <Facts
            rows={[
              { label: "Nom", value: "VAAST Timéo" },
              { label: "Centre", value: PROFILE.school },
              { label: "Option", value: "SLAM" },
              { label: "Portfolio", value: siteAddress() },
              { label: "Couverture", value: `${COVERED_COUNT} activités sur ${ACTIVITY_COUNT}` },
            ]}
          />
        }
      />

      <section className="wrap">
        <CompetenceGrid />
      </section>

      {/* The synthesis table, as on the official sheet: one row per réalisation, one column per competency. */}
      <section className="wrap mt-28 lg:mt-36">
        <SectionLabel index="01">Tableau de synthèse · session 2028</SectionLabel>
        <Reveal className="relative mt-10 overflow-x-auto rounded-[24px] border border-[var(--line)] bg-surface">
          <table className="w-full min-w-[980px] border-collapse text-left text-[14.5px]" onMouseLeave={() => setCol(null)}>
            <thead>
              <tr className="border-b border-[var(--line-strong)]">
                <th className="sticky left-0 z-10 bg-surface px-6 py-5 align-bottom">
                  <span className="label !text-[10.5px]">Réalisation</span>
                </th>
                <th className="px-3 py-5 align-bottom">
                  <span className="label !text-[10.5px]">Période</span>
                </th>
                {COMPETENCES.map((c) => (
                  <th key={c.key} className={`w-[104px] px-2 py-5 text-center align-bottom transition-colors ${col === c.key ? "bg-white/[0.04]" : ""}`} onMouseEnter={() => setCol(c.key)}>
                    <a href={`#${c.key}`} className="inline-flex flex-col items-center gap-2.5 text-[12.5px] font-semibold leading-tight hover:text-accent">
                      <Dot color={ACCENTS[c.accent]} glow />
                      {SHORT[c.key]}
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GROUPS.map((g) => (
                <Fragment key={g.title}>
                  <tr>
                    <td colSpan={8} className="sticky left-0 px-6 pb-3 pt-8">
                      <span className="label !text-[11px] text-accent">{g.title}</span>
                    </td>
                  </tr>
                  {g.items.length === 0 && (
                    <tr className="border-t border-[var(--line)]">
                      <td colSpan={8} className="px-6 py-4 text-soft">
                        {g.empty}
                      </td>
                    </tr>
                  )}
                  {g.items.map((r) => (
                    <tr key={r.slug} className="group border-t border-[var(--line)] transition-colors hover:bg-white/[0.03]">
                      <td className="sticky left-0 z-10 bg-surface px-6 py-3.5 transition-colors group-hover:bg-[#111419]">
                        <WorkName r={r} className="font-semibold" />
                        <span className="num ml-3 text-[11px] text-faint">{CATEGORY_BY_KEY[r.category].label}</span>
                      </td>
                      <td className="num whitespace-nowrap px-3 py-3.5 text-[12px] text-soft">{periodLabel(r)}</td>
                      {COMPETENCES.map((c) => {
                        const on = Boolean(r.competences[c.key]?.length);
                        return (
                          <td key={c.key} className={`px-2 py-3.5 text-center transition-colors ${col === c.key ? "bg-white/[0.04]" : ""}`} onMouseEnter={() => setCol(c.key)}>
                            {on ? (
                              <span title={c.label} className="inline-block h-3 w-3 rounded-full" style={{ background: ACCENTS[c.accent], boxShadow: `0 0 12px ${ACCENTS[c.accent]}` }}>
                                <span className="sr-only">{c.label}</span>
                              </span>
                            ) : (
                              <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-white/10" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="mt-4 text-[13.5px] text-faint lg:hidden">Le tableau défile de gauche à droite.</p>
      </section>

      {/* Each competency, its activities, and the réalisations behind each one. */}
      <section className="wrap mt-28 space-y-24 lg:mt-36">
        {COVERAGE.map(({ competence: c, proofs, covered }, ci) => {
          const color = ACCENTS[c.accent];
          return (
            <div key={c.key} id={c.key} className="scroll-mt-28" style={{ "--spot-color": color } as CSSProperties}>
              <div className="grid gap-6 border-b border-[var(--line-strong)] pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="num text-[13px]" style={{ color }}>
                    Compétence {ci + 1}
                  </p>
                  <Lines lines={[c.label]} className="t-h2 mt-4 max-w-[900px] !text-[clamp(30px,3.6vw,52px)]" />
                </div>
                <p className="num text-[13px] text-soft">
                  <span className="text-[28px] text-fg">{covered}</span> / {proofs.length} activités prouvées
                </p>
              </div>
              <ul>
                {c.activities.map((activity, ai) => {
                  const works = proofs[ai];
                  return (
                    <Reveal as="li" key={activity} delay={ai * 40} className="grid gap-3 border-b border-[var(--line)] py-6 lg:grid-cols-[40px_minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
                      <span className="num pt-1 text-[12px] text-faint">{String(ai + 1).padStart(2, "0")}</span>
                      <p className="flex gap-3 text-[16.5px] font-medium leading-relaxed">
                        <span aria-hidden className="mt-[9px] h-2 w-2 shrink-0 rounded-full" style={{ background: works.length ? color : "rgba(255,255,255,0.12)", boxShadow: works.length ? `0 0 10px ${color}` : undefined }} />
                        {activity}
                      </p>
                      <p className="flex flex-wrap gap-2">
                        {works.length ? (
                          works.map((r) => (
                            <span key={r.slug} className="chip">
                              <WorkName r={r} className={r.category === "perso" ? "text-fg" : ""} />
                            </span>
                          ))
                        ) : (
                          <span className="text-[15px] italic text-faint">À démontrer en stage ou en deuxième année.</span>
                        )}
                      </p>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>

      {/* The tools, each with where it shows: a skill comes with its proof. */}
      <section className="wrap mt-28 lg:mt-40">
        <SectionLabel index="02">Ce que j'utilise</SectionLabel>
        <Lines lines={["Des outils,", <span className="serif text-accent-soft">et où les voir à l'œuvre.</span>]} className="t-h2 mt-10" />
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {SKILLS.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 100} className="card p-7 sm:p-8">
              <h3 className="label text-accent">{g.title}</h3>
              <ul className="mt-6">
                {g.items.map((s) => (
                  <li key={s.name} className="flex items-baseline justify-between gap-4 border-t border-[var(--line)] py-3.5">
                    <span className="text-[16px] font-medium">{s.name}</span>
                    <span className="text-right text-[13px] text-faint">{s.where}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
