import { Fragment } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import SiteLayout from "../components/Layout";
import { PageHero, Section, SectionHead } from "../components/ui";
import { CATEGORY_BY_KEY, COMPETENCES } from "../data/competences";
import { PROFILE, SKILLS } from "../data/profile";
import { REALISATIONS, periodLabel } from "../data/realisations";
import type { CompetenceKey, Realisation } from "../data/types";
import { ACCENTS, accentStyle } from "../lib/accents";

const SHORT: Record<CompetenceKey, string> = {
  patrimoine: "Patrimoine informatique",
  incidents: "Incidents et demandes",
  presence: "Présence en ligne",
  projet: "Mode projet",
  service: "Mise à disposition d'un service",
  devpro: "Développement professionnel",
};

/** The rows of the E4 table, grouped like the official sheet. */
const GROUPS: { title: string; items: Realisation[]; empty?: string }[] = [
  { title: "Réalisations en cours de formation", items: REALISATIONS.filter((r) => r.category !== "perso") },
  { title: "Réalisations personnelles — Vody Studio", items: REALISATIONS.filter((r) => r.category === "perso") },
  { title: "Réalisations en milieu professionnel — première année", items: [], empty: "Le stage de première année : en cours de recherche." },
  { title: "Réalisations en milieu professionnel — seconde année", items: [], empty: "À venir." },
];

export default function CompetencesPage() {
  return (
    <SiteLayout title="Compétences" description="Le tableau de synthèse E4 de mon BTS SIO : chaque compétence reliée aux réalisations qui la prouvent.">
      <PageHero
        kicker={<p className="kicker kicker-plain">Compétences · Épreuve E4</p>}
        wordmark="Compétences"
        dimension="Une compétence annoncée · une réalisation identifiable · une preuve"
        title="Chaque compétence *reliée* aux réalisations qui la *prouvent*"
        description="Le tableau de synthèse des réalisations professionnelles du BTS SIO, construit à partir des fiches elles-mêmes : il ne peut pas les contredire."
      />

      {/* The synthesis table, as on the official sheet: one row per réalisation, one column per competency. */}
      <Section tone="light">
        <SectionHead kicker="Tableau de synthèse" title="Épreuve E4 — *session 2028*" />
        <dl className="mt-8 grid gap-x-8 gap-y-4 text-[14px] sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Nom et prénom", "VAAST Timéo"],
            ["Centre de formation", PROFILE.school],
            ["Option", "SLAM"],
            ["Portfolio", typeof window === "undefined" ? "" : window.location.host],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="field-label">{k}</dt>
              <dd className="font-semibold">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 overflow-x-auto rounded-[var(--r-card)] border border-[var(--line-strong)] bg-[var(--card)]">
          <table className="w-full min-w-[980px] border-collapse text-left text-[13.5px]">
            <thead>
              <tr>
                <th className="w-[34%] px-5 py-4 align-bottom font-tech text-[10.5px] font-bold uppercase tracking-[0.1em] text-[var(--fg-faint)]">Réalisation</th>
                <th className="w-[13%] px-3 py-4 align-bottom font-tech text-[10.5px] font-bold uppercase tracking-[0.1em] text-[var(--fg-faint)]">Période</th>
                {COMPETENCES.map((c) => (
                  <th key={c.key} style={accentStyle(c.accent, "light")} className="px-2 py-4 text-center align-bottom">
                    <a href={`#${c.key}`} className="inline-block text-[11px] font-extrabold uppercase leading-tight tracking-[0.04em] text-[var(--accent-text)] hover:underline">
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
                    <td colSpan={8} className="border-t border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--fg)_4%,transparent)] px-5 py-3 text-[11.5px] font-extrabold uppercase tracking-[0.08em]">
                      {g.title}
                    </td>
                  </tr>
                  {g.items.length === 0 && (
                    <tr>
                      <td colSpan={8} className="border-t border-[var(--line)] px-5 py-4 text-[var(--fg-faint)]">
                        {g.empty}
                      </td>
                    </tr>
                  )}
                  {g.items.map((r) => (
                    <tr key={r.slug} className="border-t border-[var(--line)]">
                      <td className="px-5 py-3.5">
                        <Link to={`/realisations/${r.slug}`} viewTransition className="font-semibold hover:text-[var(--accent-text)] hover:underline">
                          {r.title}
                        </Link>
                        <span className="ml-2 font-tech text-[10.5px] font-bold uppercase text-[var(--fg-faint)]">{CATEGORY_BY_KEY[r.category].label}</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3.5 font-tech text-[11.5px] text-[var(--fg-muted)]">{periodLabel(r)}</td>
                      {COMPETENCES.map((c) => (
                        <td key={c.key} className="px-2 py-3.5 text-center">
                          {r.competences[c.key]?.length ? (
                            <span
                              title={c.label}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px]"
                              style={{ background: `color-mix(in srgb, ${ACCENTS[c.accent].hex} 18%, transparent)`, color: ACCENTS[c.accent].deep }}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                              <span className="sr-only">{c.label}</span>
                            </span>
                          ) : (
                            <span aria-hidden className="text-[var(--line-strong)]">·</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-tech text-[11.5px] text-[var(--fg-faint)] lg:hidden">Le tableau défile de gauche à droite.</p>
      </Section>

      {/* Each competency, its activities, and the réalisations behind each one. */}
      <Section tone="dark">
        <SectionHead kicker="Le détail" title="Six compétences, leurs *activités* et leurs preuves" />
        <div className="mt-12 space-y-4">
          {COMPETENCES.map((c, ci) => (
            <article key={c.key} id={c.key} style={accentStyle(c.accent, "dark")} className="card scroll-mt-24 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="outline-num text-[38px]">{String(ci + 1).padStart(2, "0")}</span>
                <h3 className="h-card mt-1 min-w-0">{c.label}</h3>
              </div>
              <ul className="rows mt-6">
                {c.activities.map((activity, ai) => {
                  const proofs = REALISATIONS.filter((r) => r.competences[c.key]?.includes(ai));
                  return (
                    <li key={activity} className="grid gap-3 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-8">
                      <p className="flex gap-2.5 text-[14.5px] font-semibold leading-relaxed">
                        <span aria-hidden className="text-[var(--accent-text)]">▸</span>
                        {activity}
                      </p>
                      <div className="flex flex-wrap content-start gap-2">
                        {proofs.length ? (
                          proofs.map((r) => (
                            <Link
                              key={r.slug}
                              to={`/realisations/${r.slug}`}
                              viewTransition
                              style={accentStyle(CATEGORY_BY_KEY[r.category].accent, "dark")}
                              className="tag tag-accent h-auto min-h-6 whitespace-normal py-1 hover:bg-[color-mix(in_srgb,var(--accent-text)_12%,transparent)]"
                            >
                              {r.wordmark}
                            </Link>
                          ))
                        ) : (
                          <span className="text-[13.5px] text-[var(--fg-faint)]">À démontrer en stage ou en deuxième année.</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* The tools, each with where it shows: a skill comes with its proof. */}
      <Section tone="light">
        <SectionHead kicker="Outils" title="Ce que j'utilise, et *où* je m'en sers" lede="Pas une liste de logos : chaque outil renvoie à l'endroit du portfolio où on le voit à l'œuvre." />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {SKILLS.map((g) => (
            <div key={g.title} className="card p-6">
              <h3 className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--accent-text)]">{g.title}</h3>
              <ul className="mt-4 space-y-3">
                {g.items.map((s) => (
                  <li key={s.name} className="border-t border-[var(--line)] pt-3">
                    <p className="text-[14.5px] font-bold">{s.name}</p>
                    <p className="text-[13.5px] text-[var(--fg-muted)]">{s.where}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
