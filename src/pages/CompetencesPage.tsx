import { Fragment } from "react";
import { Link } from "react-router";
import SiteLayout from "../components/Layout";
import { Dot, Facts, PageHead, SectionHead } from "../components/ui";
import { CATEGORY_BY_KEY, COMPETENCES } from "../data/competences";
import { PROFILE, SKILLS } from "../data/profile";
import { REALISATIONS, periodLabel } from "../data/realisations";
import type { CompetenceKey, Realisation } from "../data/types";
import { ACCENTS } from "../lib/accents";
import { siteAddress } from "../lib/site";

const SHORT: Record<CompetenceKey, string> = {
  patrimoine: "Patrimoine",
  incidents: "Incidents et demandes",
  presence: "Présence en ligne",
  projet: "Mode projet",
  service: "Mise à disposition",
  devpro: "Dév. professionnel",
};

/** The rows of the E4 table, grouped like the official sheet. */
const GROUPS: { title: string; items: Realisation[]; empty?: string }[] = [
  { title: "Réalisations en cours de formation", items: REALISATIONS.filter((r) => r.category !== "perso") },
  { title: "Réalisations personnelles, Vody Studio", items: REALISATIONS.filter((r) => r.category === "perso") },
  { title: "En milieu professionnel, première année", items: [], empty: "Le stage de première année : en cours de recherche." },
  { title: "En milieu professionnel, seconde année", items: [], empty: "À venir." },
];

export default function CompetencesPage() {
  return (
    <SiteLayout title="Compétences" description="Le tableau de synthèse E4 de Timéo Vaast : chaque compétence reliée aux réalisations qui la prouvent.">
      <PageHead
        title="Compétences"
        lead="Le tableau de synthèse de l'épreuve E4, construit à partir des fiches elles-mêmes : chaque coche renvoie à une réalisation, et chaque réalisation à son document."
        aside={
          <Facts
            rows={[
              { label: "Nom", value: "VAAST Timéo" },
              { label: "Centre", value: PROFILE.school },
              { label: "Option", value: "SLAM" },
              { label: "Portfolio", value: siteAddress() },
            ]}
          />
        }
      />

      {/* The synthesis table, as on the official sheet: one row per réalisation, one column per competency. */}
      <section className="wrap">
        <SectionHead title="Tableau de synthèse" note="Épreuve E4, session 2028" />
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-left text-[14.5px]">
            <thead>
              <tr className="border-b border-rule">
                <th className="py-4 pr-4 align-bottom text-[13px] font-semibold text-soft">Réalisation</th>
                <th className="px-3 py-4 align-bottom text-[13px] font-semibold text-soft">Période</th>
                {COMPETENCES.map((c) => (
                  <th key={c.key} className="w-[96px] px-2 py-4 text-center align-bottom">
                    <a href={`#${c.key}`} className="inline-flex flex-col items-center gap-2 text-[12.5px] font-semibold leading-tight hover:text-blue-text">
                      <Dot color={ACCENTS[c.accent]} />
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
                    <td colSpan={8} className="pb-2 pt-8 text-[14px] font-bold">
                      {g.title}
                    </td>
                  </tr>
                  {g.items.length === 0 && (
                    <tr className="border-y border-rule">
                      <td colSpan={8} className="py-3.5 text-soft">
                        {g.empty}
                      </td>
                    </tr>
                  )}
                  {g.items.map((r) => (
                    <tr key={r.slug} className="border-y border-rule transition-colors hover:bg-white">
                      <td className="py-3 pr-4">
                        <Link to={`/realisations/${r.slug}`} viewTransition className="font-semibold hover:text-blue-text">
                          {r.short}
                        </Link>
                        <span className="ml-2.5 text-[13px] text-faint">{CATEGORY_BY_KEY[r.category].label}</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-[13.5px] text-soft">{periodLabel(r)}</td>
                      {COMPETENCES.map((c) => (
                        <td key={c.key} className="px-2 py-3 text-center">
                          {r.competences[c.key]?.length ? (
                            <span title={c.label} className="inline-block h-3 w-3 rounded-full" style={{ background: ACCENTS[c.accent] }}>
                              <span className="sr-only">{c.label}</span>
                            </span>
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[14px] text-soft lg:hidden">Le tableau défile de gauche à droite.</p>
      </section>

      {/* Each competency, its activities, and the réalisations behind each one. */}
      <section className="wrap mt-24 space-y-20">
        {COMPETENCES.map((c) => (
          <div key={c.key} id={c.key} className="scroll-mt-24">
            <div className="border-b-[1.5px] border-ink pb-4">
              <h2 className="t-sec flex items-center gap-3">
                <Dot color={ACCENTS[c.accent]} className="h-3 w-3" />
                {c.label}
              </h2>
            </div>
            <ul className="rule-rows">
              {c.activities.map((activity, ai) => {
                const proofs = REALISATIONS.filter((r) => r.competences[c.key]?.includes(ai));
                return (
                  <li key={activity} className="grid gap-2 py-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
                    <p className="text-[15.5px] font-semibold leading-relaxed">{activity}</p>
                    <p className="text-[15.5px] leading-relaxed text-soft">
                      {proofs.length
                        ? proofs.map((r, i) => (
                            <Fragment key={r.slug}>
                              {i > 0 && ", "}
                              <Link to={`/realisations/${r.slug}`} viewTransition className="text-ink underline decoration-rule underline-offset-[3px] hover:text-blue-text hover:decoration-current">
                                {r.short}
                              </Link>
                            </Fragment>
                          ))
                        : "À démontrer en stage ou en deuxième année."}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>

      {/* The tools, each with where it shows: a skill comes with its proof. */}
      <section className="wrap mt-24">
        <SectionHead title="Ce que j'utilise" note="Et où on le voit dans ce portfolio" />
        <div className="grid gap-x-12 lg:grid-cols-3">
          {SKILLS.map((g) => (
            <div key={g.title} className="pt-6">
              <h3 className="text-[15px] font-bold">{g.title}</h3>
              <ul className="rule-rows mt-3 border-t border-rule">
                {g.items.map((s) => (
                  <li key={s.name} className="py-3">
                    <p className="text-[15.5px] font-semibold">{s.name}</p>
                    <p className="text-[14px] text-soft">{s.where}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
