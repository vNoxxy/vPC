import { Link, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faArrowUpRightFromSquare, faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import SiteLayout from "../components/Layout";
import { Inline, PageHero, Section } from "../components/ui";
import { CATEGORY_BY_KEY, COMPETENCES } from "../data/competences";
import { REALISATIONS, REALISATION_BY_SLUG, periodLabel } from "../data/realisations";
import type { Realisation } from "../data/types";
import { documentsFor, type Doc } from "../lib/documents";
import NotFoundPage from "./NotFoundPage";

const docLabel = (d: Doc) => `Télécharger${d.suffix ? ` — ${d.suffix}` : ""} · ${d.ext}`;

/**
 * The TP as handed in, to download. While the site runs locally, a TP whose file is not there yet says
 * which document to export and under which name; once deployed, it simply shows nothing.
 */
function DocumentPanel({ r, docs }: { r: Realisation; docs: Doc[] }) {
  if (docs.length === 0) {
    if (!import.meta.env.DEV || !r.drive) return null;
    return (
      <div className="rounded-[var(--r-card)] border border-dashed border-amber-500/70 bg-amber-400/10 p-6 sm:p-7">
        <p className="font-tech text-[10.5px] font-bold uppercase tracking-[0.12em] text-amber-500">Document à déposer · visible en local seulement</p>
        <p className="mt-3 text-[15px] leading-relaxed">
          Exporte « {r.drive} » en PDF et enregistre-le sous <code className="code-inline">documents/{r.slug}.pdf</code>.
        </p>
      </div>
    );
  }
  return (
    <div className="tone-accent rounded-[var(--r-card)] p-6 sm:p-7">
      <p className="font-tech text-[10.5px] font-bold uppercase tracking-[0.12em] text-[var(--fg-faint)]">Le document</p>
      <p className="mt-3 text-[16px] font-semibold leading-relaxed">Le TP tel que je l'ai rendu, avec mes réponses et mes procédures.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {docs.map((d) => (
          <a key={d.url} href={d.url} download={d.downloadName} className="btn btn-solid h-auto min-h-11 max-w-full whitespace-normal py-3 text-center">
            <FontAwesomeIcon icon={faFileArrowDown} /> {docLabel(d)}
          </a>
        ))}
      </div>
    </div>
  );
}

/** One réalisation, told like the AP Portfolio fiche: why, what I did, what it proves, and the document to download. */
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

  const story: { label: string; text: string }[] = [
    { label: "Contexte", text: r.context },
    { label: "Besoin", text: r.need },
    { label: "Ma contribution", text: r.contribution },
    { label: "Difficulté rencontrée", text: r.difficulty },
    { label: "Solution", text: r.solution },
  ];

  return (
    <SiteLayout title={r.title} description={r.summary} accent={category.accent}>
      <PageHero
        kicker={
          <Link to={`/realisations?bloc=${category.key}`} viewTransition className="kicker kicker-plain hover:bg-[color-mix(in_srgb,var(--accent-text)_10%,transparent)]">
            {category.label} · {category.name}
          </Link>
        }
        wordmark={r.wordmark}
        dimension={`${r.format} · ${periodLabel(r)}`}
        title={r.title}
        description={r.summary}
        action={
          <>
            <Link to="/realisations" viewTransition className="btn btn-lg btn-outline">
              <FontAwesomeIcon icon={faArrowLeft} /> Toutes les réalisations
            </Link>
            {docs[0] && (
              <a href={docs[0].url} download={docs[0].downloadName} className="btn btn-lg btn-solid">
                <FontAwesomeIcon icon={faFileArrowDown} /> Télécharger le document
              </a>
            )}
            {r.live && (
              <a href={r.live.href} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-solid">
                {r.live.label} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            )}
          </>
        }
      />

      {/* The fiche: a summary column that stays in view, and the story told in five rows. */}
      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="kicker">La fiche</p>
            <dl className="mt-7 space-y-6">
              <div>
                <dt className="field-label">Période</dt>
                <dd className="text-[15px] font-semibold">{periodLabel(r)}</dd>
              </div>
              <div>
                <dt className="field-label">Cadre</dt>
                <dd className="text-[15px] font-semibold">{r.format}</dd>
              </div>
              <div>
                <dt className="field-label">Outils et technologies</dt>
                <dd className="flex flex-wrap gap-2">
                  {r.tools.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="field-label">Compétences E4</dt>
                <dd className="flex flex-wrap gap-2">
                  {shownCompetences.map((c) => (
                    <Link key={c.key} to={`/competences#${c.key}`} viewTransition className="tag tag-accent h-auto min-h-6 whitespace-normal py-1 hover:bg-[color-mix(in_srgb,var(--accent-text)_10%,transparent)]">
                      {c.label}
                    </Link>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>

          <ol className="rows">
            {story.map((row, i) => (
              <li key={row.label} className="grid gap-2 p-6 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6 lg:p-7">
                <p className="flex items-baseline gap-2.5 sm:block">
                  <span className="font-tech text-[11px] font-bold text-[var(--fg-faint)]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-[var(--accent-text)] sm:mt-1.5 sm:block">{row.label}</span>
                </p>
                <p className="text-[15.5px] leading-relaxed">
                  <Inline text={row.text} />
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* What it proves: the competencies with their activities, the proofs, the assessment. */}
      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="kicker">Ce que ça prouve</p>
            <h2 className="h-section mt-6">Compétences démontrées</h2>
            <ul className="mt-8 space-y-4">
              {shownCompetences.map((c) => (
                <li key={c.key} className="card p-5 sm:p-6">
                  <p className="text-[13px] font-extrabold uppercase tracking-[0.06em] text-[var(--accent-text)]">{c.label}</p>
                  <ul className="mt-3 space-y-2">
                    {r.competences[c.key]!.map((i) => (
                      <li key={i} className="flex gap-2.5 text-[14.5px] leading-relaxed text-[var(--fg-muted)]">
                        <span aria-hidden className="text-[var(--accent-text)]">▸</span>
                        {c.activities[i]}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h-section lg:mt-[62px]">Preuves</h2>
            <div className="mt-8 [&:empty]:hidden">
              <DocumentPanel r={r} docs={docs} />
            </div>
            <ul className="rows mt-6">
              {r.proofs.map((p, i) => (
                <li key={p} className="flex gap-4 p-5 sm:p-6">
                  <span className="font-tech text-[12px] font-bold text-[var(--fg-faint)]">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[15px] leading-relaxed">{p}</p>
                </li>
              ))}
            </ul>
            <div className="tone-accent mt-6 rounded-[var(--r-card)] p-6 sm:p-7">
              <p className="font-tech text-[10.5px] font-bold uppercase tracking-[0.12em] text-[var(--fg-faint)]">Bilan</p>
              <p className="mt-3 text-[16px] font-semibold leading-relaxed">{r.bilan}</p>
            </div>
          </div>
        </div>

        {r.shots && r.shots.length > 0 && (
          <div className="mt-12">
            <p className="font-tech text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--fg-faint)]">Captures</p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {r.shots.map((shot) => (
                <li key={shot.src}>
                  <figure className="card overflow-hidden">
                    <a href={shot.src} target="_blank" rel="noopener noreferrer">
                      <img src={shot.src} alt={shot.caption} loading="lazy" className="w-full bg-white/5 object-cover" />
                    </a>
                    <figcaption className="p-4 text-[13.5px] leading-relaxed text-[var(--fg-muted)]">{shot.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        )}

        {r.code?.map((c) => (
          <div key={c.title} className="mt-12">
            <p className="font-tech text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--fg-faint)]">Extrait de code</p>
            <h3 className="mt-2 text-[15px] font-extrabold uppercase tracking-[0.05em]">{c.title}</h3>
            <div className="relative mt-4">
              <span className="absolute right-3 top-2.5 font-tech text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">{c.lang}</span>
              <pre className="code">{c.code}</pre>
            </div>
          </div>
        ))}
      </Section>

      {/* The neighbours in the list, to read on. */}
      <Section tone="dark" divider innerClassName="py-12">
        <nav aria-label="Autres réalisations" className="grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link to={`/realisations/${prev.slug}`} viewTransition className="card lift group flex items-center gap-4 p-5">
              <FontAwesomeIcon icon={faArrowLeft} className="text-[var(--accent-text)] transition-transform group-hover:-translate-x-1" />
              <span className="min-w-0">
                <span className="block font-tech text-[10.5px] font-bold uppercase tracking-[0.1em] text-[var(--fg-faint)]">Précédente</span>
                <span className="block truncate text-[14.5px] font-bold">{prev.title}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/realisations/${next.slug}`} viewTransition className="card lift group flex items-center justify-end gap-4 p-5 text-right">
              <span className="min-w-0">
                <span className="block font-tech text-[10.5px] font-bold uppercase tracking-[0.1em] text-[var(--fg-faint)]">Suivante</span>
                <span className="block truncate text-[14.5px] font-bold">{next.title}</span>
              </span>
              <FontAwesomeIcon icon={faArrowRight} className="text-[var(--accent-text)] transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </nav>
      </Section>
    </SiteLayout>
  );
}
