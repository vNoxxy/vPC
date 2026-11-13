import { Link, useParams } from "react-router";
import SiteLayout from "../components/Layout";
import { Dot, Facts, Figure, Inline, PageHead, Row, SectionHead } from "../components/ui";
import { COMPETENCES } from "../data/competences";
import { PROJECTS, PROJECT_BY_SLUG, periodLabel } from "../data/realisations";
import { ACCENTS } from "../lib/accents";
import NotFoundPage from "./NotFoundPage";

/** One Vody Studio project, read as a case study: what it was, what I did, what it proves. */
export default function ProjectPage() {
  const { slug = "" } = useParams();
  const r = PROJECT_BY_SLUG.get(slug);
  if (!r) return <NotFoundPage />;

  const index = PROJECTS.indexOf(r);
  const prev = PROJECTS[index - 1];
  const next = PROJECTS[index + 1];
  const shownCompetences = COMPETENCES.filter((c) => r.competences[c.key]?.length);

  return (
    <SiteLayout title={r.title} description={r.summary}>
      <PageHead
        before={
          <Link to="/vody-studio" viewTransition className="text-[15px] text-soft transition-colors hover:text-ink">
            ← Vody Studio
          </Link>
        }
        title={r.title}
        lead={r.summary}
        actions={
          r.live && (
            <a href={r.live.href} target="_blank" rel="noopener noreferrer" className="btn">
              {r.live.label} ↗
            </a>
          )
        }
        aside={
          <Facts
            rows={[
              { label: "Période", value: periodLabel(r).replace(/^./, (c) => c.toUpperCase()) },
              { label: "Cadre", value: r.format },
              { label: "Outils", value: <span className="font-medium">{r.tools.join(", ")}</span> },
              {
                label: "Compétences",
                value: (
                  <span className="flex flex-col gap-1">
                    {shownCompetences.map((c) => (
                      <Link key={c.key} to={`/competences#${c.key}`} viewTransition className="hover:text-blue-text">
                        {c.label}
                      </Link>
                    ))}
                  </span>
                ),
              },
            ]}
          />
        }
      />

      {r.cover && (
        <section className="wrap mb-20">
          <Figure shot={r.cover} priority />
        </section>
      )}

      {/* The story of the project, told like the AP fiche. */}
      <section className="wrap">
        <SectionHead title="Le projet" note={r.format} />
        <div className="rule-rows">
          {[
            { label: "Le contexte", text: r.context },
            { label: "Le besoin", text: r.need },
            { label: "Ce que j'ai fait", text: r.contribution },
            { label: "La difficulté", text: r.difficulty },
            { label: "La solution", text: r.solution },
          ].map((row) => (
            <Row key={row.label} label={row.label}>
              <p className="t-body">
                <Inline text={row.text} />
              </p>
            </Row>
          ))}
        </div>
        <div className="mt-14 grid gap-3 sm:grid-cols-[220px_1fr] sm:gap-8">
          <p className="text-[15px] font-bold">Ce que j'en retiens</p>
          <p className="text-[clamp(22px,2.4vw,30px)] font-medium leading-[1.3] tracking-[-0.025em]">{r.bilan}</p>
        </div>
      </section>

      <section className="wrap mt-20 grid gap-14 lg:mt-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead title="Compétences démontrées" note="Tableau de synthèse E4" />
          <ul className="rule-rows">
            {shownCompetences.map((c) => (
              <li key={c.key} className="py-5">
                <Link to={`/competences#${c.key}`} viewTransition className="flex items-center gap-2.5 text-[16px] font-bold hover:text-blue-text">
                  <Dot color={ACCENTS[c.accent]} />
                  {c.label}
                </Link>
                <ul className="mt-2.5 space-y-1.5 pl-[19px]">
                  {r.competences[c.key]!.map((i) => (
                    <li key={i} className="text-[15.5px] leading-relaxed text-[#2f3440]">
                      {c.activities[i]}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHead title="Preuves" />
          <ul className="rule-rows">
            {r.proofs.map((p) => (
              <li key={p} className="py-5 text-[15.5px] leading-relaxed text-[#2f3440]">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {r.shots && r.shots.length > 0 && (
        <section className="wrap mt-20 grid gap-10">
          {r.shots.map((shot) => (
            <Figure key={shot.src} shot={shot} />
          ))}
        </section>
      )}

      {r.code?.map((c) => (
        <section key={c.title} className="wrap mt-20">
          <SectionHead title={c.title} note={c.lang} />
          <pre className="code mt-6">{c.code}</pre>
        </section>
      ))}

      {/* The other projects, to read on. */}
      <nav aria-label="Autres projets" className="wrap mt-24">
        <div className="grid gap-6 border-t-[1.5px] border-ink pt-6 sm:grid-cols-2">
          {prev ? (
            <Link to={`/vody-studio/${prev.slug}`} viewTransition className="group">
              <span className="text-[14.5px] text-soft">← Précédent</span>
              <span className="mt-1 block text-[22px] font-semibold leading-tight tracking-[-0.02em] group-hover:text-blue-text">{prev.short}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/vody-studio/${next.slug}`} viewTransition className="group sm:text-right">
              <span className="text-[14.5px] text-soft">Suivant →</span>
              <span className="mt-1 block text-[22px] font-semibold leading-tight tracking-[-0.02em] group-hover:text-blue-text">{next.short}</span>
            </Link>
          )}
        </div>
      </nav>
    </SiteLayout>
  );
}
