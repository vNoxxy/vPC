import { Link, useParams } from "react-router";
import SiteLayout from "../components/Layout";
import { Dot, Facts, Figure, Inline, PageHead, Row, SectionHead } from "../components/ui";
import { CATEGORY_BY_KEY, COMPETENCES } from "../data/competences";
import { REALISATIONS, REALISATION_BY_SLUG, periodLabel } from "../data/realisations";
import type { Realisation } from "../data/types";
import { ACCENTS } from "../lib/accents";
import { documentsFor, type Doc } from "../lib/documents";
import NotFoundPage from "./NotFoundPage";

const docLabel = (d: Doc) => `Télécharger le document${d.suffix ? ` (${d.suffix})` : ""}`;

/**
 * While the site runs locally, a TP whose file is not there yet says which document to export and
 * under which name; once deployed, a missing document simply shows nothing.
 */
function MissingDocument({ r }: { r: Realisation }) {
  if (!import.meta.env.DEV || !r.drive) return null;
  return (
    <p className="rounded-[12px] border border-dashed border-amber-500 bg-amber-50 px-4 py-3 text-[14.5px] leading-relaxed text-amber-900">
      Visible en local seulement : exporte « {r.drive} » en PDF et enregistre-le sous <code className="code-inline">documents/{r.slug}.pdf</code>.
    </p>
  );
}

/** One réalisation, read as a case study: what it was, what I did, what it proves, and the document. */
export default function RealisationPage() {
  const { slug = "" } = useParams();
  const r = REALISATION_BY_SLUG.get(slug);
  if (!r) return <NotFoundPage />;

  const category = CATEGORY_BY_KEY[r.category];
  const index = REALISATIONS.indexOf(r);
  const prev = REALISATIONS[index - 1];
  const next = REALISATIONS[index + 1];
  const shownCompetences = COMPETENCES.filter((c) => r.competences[c.key]?.length);
  const docs = documentsFor(r.slug);

  return (
    <SiteLayout title={r.title} description={r.summary}>
      <PageHead
        before={
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px]">
            <Link to="/realisations" viewTransition className="text-soft transition-colors hover:text-ink">
              ← Réalisations
            </Link>
            <Link to={`/realisations?bloc=${category.key}`} viewTransition className="flex items-center gap-2 font-semibold hover:text-blue-text">
              <Dot color={ACCENTS[category.accent]} />
              {category.label}, {category.name.charAt(0).toLowerCase() + category.name.slice(1)}
            </Link>
          </div>
        }
        title={r.title}
        lead={r.summary}
        actions={
          <>
            {docs.map((d) => (
              <a key={d.url} href={d.url} download={d.downloadName} className="btn">
                {docLabel(d)} <small>{d.ext}</small>
              </a>
            ))}
            {r.live && (
              <a href={r.live.href} target="_blank" rel="noopener noreferrer" className={docs.length ? "link-u text-[15px]" : "btn"}>
                {r.live.label} ↗
              </a>
            )}
            {docs.length === 0 && <MissingDocument r={r} />}
          </>
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

      {/* The story of the work, told like the AP fiche. */}
      <section className="wrap">
        <SectionHead title="La fiche" note={r.format} />
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
            {docs.map((d) => (
              <li key={d.url} className="py-5">
                <a href={d.url} download={d.downloadName} className="link-u text-[16px]">
                  {docLabel(d)}, {d.ext}
                </a>
              </li>
            ))}
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

      {/* The neighbours in the list, to read on. */}
      <nav aria-label="Autres réalisations" className="wrap mt-24">
        <div className="grid gap-6 border-t-[1.5px] border-ink pt-6 sm:grid-cols-2">
          {prev ? (
            <Link to={`/realisations/${prev.slug}`} viewTransition className="group">
              <span className="text-[14.5px] text-soft">← Précédente</span>
              <span className="mt-1 block text-[22px] font-semibold leading-tight tracking-[-0.02em] group-hover:text-blue-text">{prev.short}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/realisations/${next.slug}`} viewTransition className="group sm:text-right">
              <span className="text-[14.5px] text-soft">Suivante →</span>
              <span className="mt-1 block text-[22px] font-semibold leading-tight tracking-[-0.02em] group-hover:text-blue-text">{next.short}</span>
            </Link>
          )}
        </div>
      </nav>
    </SiteLayout>
  );
}
