import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import SiteLayout from "../components/Layout";
import { DashList, PageHero, Section, SectionHead } from "../components/ui";
import { AXES, JOURNAL, SOURCES, TOOLS, VEILLE } from "../data/veille";

const STAGES = ["Planifier sa veille", "Sélectionner des ressources", "Collecter l'information", "Analyser l'information", "Diffuser l'information"];

export default function VeillePage() {
  return (
    <SiteLayout title="Veille technologique" description={`Ma veille technologique de BTS SIO : ${VEILLE.subject}.`} accent="orange">
      <PageHero
        kicker={<p className="kicker kicker-plain">Veille technologique · AP</p>}
        wordmark="Veille"
        dimension={VEILLE.presentation}
        title={`*${VEILLE.subject}*`}
        description={VEILLE.question}
        action={
          <Link to="/realisations/preparer-une-veille" viewTransition className="btn btn-lg btn-outline">
            La méthode, vue en AP
          </Link>
        }
      />

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead compact kicker="Le sujet" title="Pourquoi *ce* sujet" />
          <div>
            <p className="text-[clamp(18px,1.8vw,22px)] font-semibold leading-[1.45] tracking-[-0.015em]">{VEILLE.why}</p>
            <ol className="mt-10 grid gap-3 sm:grid-cols-5">
              {STAGES.map((s, i) => (
                <li key={s} className="card p-4">
                  <span className="outline-num text-[28px]">{i + 1}</span>
                  <p className="mt-3 text-[12.5px] font-bold uppercase leading-snug tracking-[0.04em]">{s}</p>
                </li>
              ))}
            </ol>
            <p className="mt-3 font-tech text-[11px] text-[var(--fg-faint)]">Les cinq étapes de la veille informationnelle, appliquées à ce sujet.</p>
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <SectionHead kicker="Ce que je suis" title="Quatre *angles* sur le sujet" />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {AXES.map((axis, i) => (
            <article key={axis.title} className="card p-6 lg:p-8">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[15px] font-extrabold uppercase leading-snug tracking-[0.05em]">{axis.title}</h3>
                <span className="font-tech text-[12px] font-bold text-[var(--fg-faint)]">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed">{axis.text}</p>
              <DashList className="mt-5" items={axis.points} />
            </article>
          ))}
        </div>
      </Section>

      {/* What I kept from my reading, the newest first. */}
      <Section tone="light">
        <SectionHead kicker="Journal de veille" title="Ce que j'ai *retenu*" lede="Chaque article gardé, avec sa source et ce que j'en tire. Le journal s'allonge jusqu'à la présentation." />
        <ol className="rows mt-12">
          {JOURNAL.map((e) => (
            <li key={e.title} className="grid gap-3 p-6 lg:grid-cols-[150px_minmax(0,1fr)_minmax(0,1fr)] lg:gap-8 lg:p-7">
              <p className="font-tech text-[11.5px] font-bold uppercase tracking-[0.08em] text-[var(--accent-text)]">{e.date}</p>
              <div>
                <h3 className="text-[15px] font-bold leading-snug">{e.title}</h3>
                <p className="mt-1 text-[13.5px] text-[var(--fg-faint)]">
                  {e.href ? (
                    <a href={e.href} target="_blank" rel="noopener noreferrer" className="link font-semibold">
                      {e.source}
                    </a>
                  ) : (
                    e.source
                  )}
                </p>
              </div>
              <p className="text-[14.5px] leading-relaxed text-[var(--fg-muted)]">{e.takeaway}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <SectionHead compact kicker="Sources" title="Où je *lis*" lede="Choisies sur les quatre critères de l'exercice d'AP : rapidité, fiabilité, actualité, pertinence. Les sources officielles d'abord." />
            <ul className="rows mt-10">
              {SOURCES.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group grid gap-1 p-5 hover:bg-[var(--card-hover)] sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6">
                    <span>
                      <span className="flex items-center gap-2 text-[15px] font-bold">
                        {s.name}
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px] text-[var(--fg-faint)] group-hover:text-[var(--accent-text)]" />
                      </span>
                      <span className="mt-1 block text-[14px] text-[var(--fg-muted)]">{s.why}</span>
                    </span>
                    <span className="tag self-start">{s.kind}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h-section lg:mt-[62px]">Outils</h2>
            <ul className="mt-10 space-y-4">
              {TOOLS.map((t) => (
                <li key={t.name} className="card p-5">
                  <p className="text-[14px] font-extrabold uppercase tracking-[0.06em] text-[var(--accent-text)]">{t.name}</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--fg-muted)]">{t.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
