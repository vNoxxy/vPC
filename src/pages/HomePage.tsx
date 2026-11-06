import type { CSSProperties } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SiteLayout from "../components/Layout";
import RealisationCard from "../components/RealisationCard";
import { DimLine, HeroPlanes, Rich, Section, SectionHead, Wordmark } from "../components/ui";
import { CATEGORIES, CATEGORY_BY_KEY, COMPETENCES } from "../data/competences";
import { PROFILE, SKILLS } from "../data/profile";
import { REALISATIONS, byNewest, periodLabel } from "../data/realisations";
import { VEILLE } from "../data/veille";
import { ACCENTS, accentStyle } from "../lib/accents";

const FEATURED = REALISATIONS.filter((r) => r.featured);
const LATEST = REALISATIONS.filter((r) => !r.featured && r.category !== "perso")
  .sort(byNewest)
  .slice(0, 4);

const STEPS = [
  { year: "2023", title: "Brevet, mention Bien", text: "Collège Lucie & Raymond Aubrac." },
  { year: "2026", title: "Bac pro MSPC, mention Bien", text: "La maintenance industrielle : comprendre une machine pour la réparer." },
  { year: "2026", title: "BTS SIO, option SLAM", text: "Lycée Jean Rostand, Chantilly : le développement d'applications." },
  { year: "2026", title: "Vody Studio", text: "Ma micro-entreprise, immatriculée en octobre : le code devient mon métier." },
];

export default function HomePage() {
  // Everything I use, as two rows of tags that slowly run by, each with its group's color.
  const tagRows = [
    SKILLS[0].items.concat(SKILLS[2].items).map((s) => ({ label: s.name, color: ACCENTS.violet.hex })),
    SKILLS[1].items
      .map((s) => ({ label: s.name, color: ACCENTS.green.hex }))
      .concat(
        ["Phishing", "Hachage & sel", "MFA", "Moindre privilège", "Audit de sécurité"].map((label) => ({ label, color: ACCENTS.red.hex })),
        ["Veille informationnelle", "Feedly"].map((label) => ({ label, color: ACCENTS.orange.hex })),
      ),
  ];

  const stats = [
    { value: REALISATIONS.length, label: "Réalisations détaillées" },
    { value: COMPETENCES.length, label: "Compétences du tableau E4" },
    { value: REALISATIONS.filter((r) => r.category === "perso").length, label: "Projets en production" },
    { value: 3, label: "Blocs du BTS couverts" },
  ];

  return (
    <SiteLayout>
      {/* Hero: my name across the sheet over the curved planes, then a few figures. */}
      <section className="tone-dark relative">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <HeroPlanes />
        </div>
        <div className="guides relative pb-16 pt-12 sm:pt-16 lg:pb-24 lg:pt-20">
          <div className="flex flex-col items-center text-center">
            <p className="kicker kicker-plain">Portfolio · BTS SIO</p>
            <Wordmark text="Timéo Vaast" className="mt-7" />
            <DimLine text="BTS SIO · Option SLAM · Lycée Jean Rostand · Session 2028" className="mt-5 hidden w-full max-w-[1000px] sm:flex" />
            <h1 className="h-subline mt-8 max-w-[900px]">
              <Rich plain text="Étudiant en *développement d'applications*, je construis, je teste et je *sécurise* ce que j'écris." />
            </h1>
            <p className="lede mt-5 max-w-[640px]">
              Première année de BTS SIO, un bac pro de maintenance industrielle derrière moi, et une micro-entreprise de développement, Vody Studio. Voici ce que je sais faire, preuves à l'appui.
            </p>
            <div className="hero-actions mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/realisations" viewTransition className="btn btn-lg btn-solid">
                Voir mes réalisations
              </Link>
              <Link to="/parcours" viewTransition className="btn btn-lg btn-outline">
                Mon parcours
              </Link>
            </div>
          </div>
          <ul className="mx-auto mt-14 grid max-w-[980px] grid-cols-2 gap-3 lg:mt-16 lg:grid-cols-4">
            {stats.map((s) => (
              <li key={s.label} className="rounded-[var(--r-card)] border border-[var(--line-strong)] bg-[var(--bg)] p-5 text-left">
                <p className="text-[40px] font-extrabold leading-none tracking-[-0.04em]">{s.value}</p>
                <p className="mt-2 font-tech text-[10.5px] font-bold uppercase leading-snug tracking-[0.1em] text-[var(--fg-faint)]">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who I am, what I use as running tags, then what I bring. */}
      <Section tone="light" id="a-propos" className="scroll-mt-16">
        <div className="max-w-[940px]">
          <p className="kicker">À propos</p>
          <p className="mt-7 text-[clamp(22px,2.7vw,35px)] font-semibold leading-[1.28] tracking-[-0.025em]">
            <Rich plain text="Je viens de la *maintenance industrielle*, je code par passion depuis des années, et depuis octobre 2026 j'en fais mon métier avec *Vody Studio*." />
          </p>
          <p className="lede mt-6 max-w-[720px]">
            En cours, j'apprends à installer, dépanner et sécuriser les services d'une organisation ; à côté, je développe et je mets en ligne les projets de mon studio. Ce portfolio relie
            les deux : chaque compétence renvoie à ce que j'ai réellement fait.
          </p>
        </div>

        <div className="mx-[calc(50%-50vw)] mt-14 space-y-3 lg:mt-16">
          {tagRows.map((row, r) => (
            <div key={r} className="marquee">
              <div className="marquee-track" style={{ "--marquee-duration": r ? "74s" : "62s", animationDirection: r ? "reverse" : "normal" } as CSSProperties}>
                {[0, 1].map((copy) => (
                  <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-3">
                    {row.map((tag) => (
                      <li
                        key={tag.label}
                        className="flex h-12 items-center gap-2.5 whitespace-nowrap rounded-full border border-[var(--line-strong)] bg-[var(--card)] px-5 text-[14.5px] font-semibold"
                      >
                        <i aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: tag.color }} />
                        {tag.label}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {PROFILE.qualities.map((q, i) => (
            <li key={q.name} className="card p-6">
              <div className="flex items-center justify-between">
                <i aria-hidden className="h-3 w-3 rounded-full bg-[var(--accent)]" />
                <span className="font-tech text-[12px] font-bold text-[var(--fg-faint)]">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-6 text-[14.5px] font-extrabold uppercase tracking-[0.06em]">{q.name}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--fg-muted)]">{q.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Three réalisations on panels of their bloc's color, then the latest TPs. */}
      <Section tone="dark">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            kicker="Réalisations"
            title="Ce que j'ai *réalisé*, et ce que ça prouve"
            lede="Chaque fiche raconte le contexte, ma contribution, la difficulté rencontrée et sa solution, puis les compétences et les preuves."
          />
          <Link to="/realisations" viewTransition className="btn btn-lg btn-outline shrink-0">
            Toutes les réalisations
          </Link>
        </div>

        <div className="mt-12 space-y-4">
          {FEATURED.map((r) => {
            const category = CATEGORY_BY_KEY[r.category];
            return (
              <article
                key={r.slug}
                style={accentStyle(category.accent)}
                className="tone-accent relative isolate grid overflow-hidden rounded-[var(--r-panel)] lg:min-h-[340px] lg:grid-cols-[1.1fr_1fr]"
              >
                <div className="flex flex-col p-7 sm:p-9 lg:p-11">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="tag">{category.label}</span>
                    <span className="font-tech text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--fg-faint)]">{periodLabel(r)}</span>
                  </div>
                  <h3 className="h-card mt-8 max-w-[520px]">{r.title}</h3>
                  <p className="mt-4 max-w-[480px] text-[15px] leading-relaxed text-[var(--fg-muted)]">{r.summary}</p>
                  <div className="mt-auto pt-9">
                    <Link to={`/realisations/${r.slug}`} viewTransition className="btn btn-solid">
                      Lire la fiche
                    </Link>
                  </div>
                </div>
                {/* What the fiche proves, drawn as the sheet's own ruled list. */}
                <div className="flex flex-col justify-center border-t border-[var(--line)] p-7 sm:p-9 lg:border-l lg:border-t-0 lg:p-11">
                  <p className="font-tech text-[10.5px] font-bold uppercase tracking-[0.12em] text-[var(--fg-faint)]">La difficulté</p>
                  <p className="mt-2 text-[15px] leading-relaxed">{r.difficulty}</p>
                  <p className="mt-6 font-tech text-[10.5px] font-bold uppercase tracking-[0.12em] text-[var(--fg-faint)]">La solution</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-muted)]">{r.solution}</p>
                </div>
              </article>
            );
          })}
        </div>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LATEST.map((r) => (
            <li key={r.slug}>
              <RealisationCard r={r} tone="dark" />
            </li>
          ))}
        </ul>
      </Section>

      {/* The parts of the BTS, each with its own color, leading to its réalisations. */}
      <Section tone="light">
        <SectionHead kicker="Le BTS SIO" title="Trois blocs, des *ateliers*, et mon studio" lede="Les réalisations sont rangées comme le référentiel du BTS : une couleur par bloc." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((c) => {
            const count = REALISATIONS.filter((r) => r.category === c.key).length;
            return (
              <li key={c.key} style={accentStyle(c.accent, "light")}>
                <Link to={`/realisations?bloc=${c.key}`} viewTransition className="card lift group flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <i aria-hidden className="h-3 w-3 rounded-full bg-[var(--accent)]" />
                    <span className="font-tech text-[12px] font-bold text-[var(--fg-faint)]">{count} fiches</span>
                  </div>
                  <h3 className="mt-6 text-[14.5px] font-extrabold uppercase tracking-[0.06em] text-[var(--accent-text)]">{c.label}</h3>
                  <p className="mt-1 text-[13px] font-semibold leading-snug">{c.name}</p>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[var(--fg-muted)]">{c.text}</p>
                  <FontAwesomeIcon icon={faArrowRight} className="mt-5 self-start text-[12px] text-[var(--accent-text)] transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* The road so far, one card per step. */}
      <Section tone="dark">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead kicker="Parcours" title="De la *maintenance* au développement" />
          <Link to="/parcours" viewTransition className="btn btn-lg btn-outline shrink-0">
            Formation et expériences
          </Link>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="card p-6 lg:p-7">
              <div className="flex items-baseline justify-between gap-3">
                <span className="outline-num text-[44px]">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-tech text-[12px] font-bold text-[var(--fg-faint)]">{s.year}</span>
              </div>
              <h3 className="mt-6 text-[15px] font-extrabold uppercase leading-snug tracking-[0.06em]">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--fg-muted)]">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* The watch and the internship search, side by side. */}
      <Section tone="light" divider>
        <div className="grid gap-4 lg:grid-cols-2">
          <Link to="/veille" viewTransition style={accentStyle("orange", "light")} className="card lift group flex flex-col p-7 lg:p-9">
            <p className="kicker">Veille technologique</p>
            <h2 className="h-card mt-6">{VEILLE.subject}</h2>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--fg-muted)]">{VEILLE.question}</p>
            <span className="mt-6 flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.08em] text-[var(--accent-text)]">
              Lire ma veille
              <FontAwesomeIcon icon={faArrowRight} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <Link to="/parcours#stage" viewTransition style={accentStyle("cyan", "light")} className="card lift group flex flex-col p-7 lg:p-9">
            <p className="kicker">Stage</p>
            <h2 className="h-card mt-6">Je cherche mon stage de première année</h2>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--fg-muted)]">
              En développement d'applications ou en support informatique. Trois stages en entreprise derrière moi pendant mon bac pro, et l'envie de découvrir l'informatique de l'intérieur.
            </p>
            <span className="mt-6 flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.08em] text-[var(--accent-text)]">
              Ma recherche de stage
              <FontAwesomeIcon icon={faArrowRight} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
