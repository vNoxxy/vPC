import { useRef, type CSSProperties } from "react";
import { Link } from "react-router";
import { Lines, Reveal } from "../components/Reveal";
import { ArrowRight, Facts, Magnetic, PageHero, SectionLabel } from "../components/ui";
import { EDUCATION, EXPERIENCE, INTERESTS, LANGUAGES, PROFILE, type Step } from "../data/profile";
import { useScrollProgress } from "../lib/motion";
import { usePageMeta } from "../lib/usePageMeta";

/** A vertical timeline whose line fills as it is scrolled through. */
function Timeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  useScrollProgress(ref);
  return (
    <ol ref={ref} className="relative mt-12 pl-8 sm:pl-14">
      <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-[var(--line-strong)] sm:left-[7px]" />
      <span
        aria-hidden
        className="absolute left-[5px] top-2 w-px origin-top bg-gradient-to-b from-accent to-[var(--accent-soft)] shadow-[0_0_12px_var(--accent)] sm:left-[7px]"
        style={{ bottom: 8, transform: "scaleY(clamp(0, calc((var(--p, 1) - 0.2) * 2.2), 1))" }}
      />
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 80} className="relative pb-14 last:pb-0">
          <span aria-hidden className={`absolute -left-8 top-2 h-[11px] w-[11px] rounded-full border-2 sm:-left-14 sm:h-[15px] sm:w-[15px] ${s.tag === "En cours" ? "border-accent bg-accent shadow-[0_0_16px_var(--accent)]" : "border-[var(--line-strong)] bg-bg"}`} />
          <div className="grid gap-3 lg:grid-cols-[220px_1fr] lg:gap-12">
            <p className="num pt-1 text-[13px] text-soft">{s.period}</p>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="t-h3">{s.title}</h3>
                {s.tag && <span className={`chip !h-7 ${s.tag === "En cours" ? "!border-accent text-accent" : ""}`}>{s.tag}</span>}
              </div>
              <p className="mt-2 text-[15.5px] font-medium text-soft">{s.place}</p>
              <p className="t-body mt-4 max-w-[720px]">{s.text}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export default function ParcoursPage() {
  usePageMeta("Parcours", "Formation, expériences en entreprise, recherche de stage, langues et centres d'intérêt de Timéo Vaast.");
  return (
    <>
      <PageHero
        label="Parcours"
        title={["De la maintenance", <span className="serif text-accent-soft">au développement.</span>]}
        lead={PROFILE.pitch}
        actions={
          <>
            <Magnetic>
              <Link to="/cv" viewTransition className="btn">
                Voir mon CV <ArrowRight />
              </Link>
            </Magnetic>
            <a href="#stage" className="btn btn-ghost">
              Proposer un stage
            </a>
          </>
        }
        aside={
          <Facts
            rows={[
              { label: "Aujourd'hui", value: "BTS SIO, option SLAM" },
              { label: "Avant", value: "Bac pro MSPC, mention Bien" },
              { label: "Entreprise", value: "Vody Studio, depuis 2026" },
              { label: "Permis", value: PROFILE.driving },
              { label: "En ce moment", value: "Recherche de stage", live: true },
            ]}
          />
        }
      />

      <section className="wrap mt-8">
        <SectionLabel index="01">Formation</SectionLabel>
        <Timeline steps={EDUCATION} />
      </section>

      <section className="wrap mt-28 lg:mt-36">
        <SectionLabel index="02">Expériences en entreprise</SectionLabel>
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {EXPERIENCE.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 100} className="spot card flex flex-col p-8">
              <p className="num text-[12.5px] text-accent">{e.period}</p>
              <h3 className="mt-8 text-[clamp(30px,2.8vw,40px)] font-semibold leading-none tracking-[-0.04em]">{e.title}</h3>
              <p className="mt-2 text-[14.5px] text-soft">{e.place}</p>
              <p className="mt-6 text-[15.5px] leading-relaxed text-[#c3c8d1]">{e.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* The internship search of the first year (the E4 table's "milieu professionnel" rows). */}
      <section id="stage" className="wrap mt-28 scroll-mt-24 lg:mt-36">
        <SectionLabel index="03">Stage de première année</SectionLabel>
        <div className="relative mt-12 overflow-hidden rounded-[32px] border border-[var(--line)] bg-[linear-gradient(150deg,#0f1520,#07080b_65%)] p-8 sm:p-12 lg:p-16">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[rgba(74,222,128,0.15)] blur-[120px]" />
          <p className="label relative flex items-center gap-3 text-[var(--signal)]">
            <i aria-hidden className="live-dot" /> Recherche en cours
          </p>
          <Lines lines={["Je cherche un stage", <span className="serif text-accent-soft">en développement ou en support.</span>]} className="t-h2 relative mt-8 max-w-[1000px]" />
          <div className="relative mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="label mb-5">Ce que je recherche</h3>
              <ul className="rows text-[16px] leading-relaxed text-[#c3c8d1]">
                <li className="py-4">Développer ou faire évoluer une application, un site ou un outil interne.</li>
                <li className="py-4">Ou participer au support : postes de travail, gestion de parc, demandes des utilisateurs.</li>
                <li className="py-4">Dans une organisation où je peux observer, apprendre et me rendre utile.</li>
              </ul>
            </div>
            <div>
              <h3 className="label mb-5">Ma démarche</h3>
              <ul className="rows text-[16px] leading-relaxed text-[#c3c8d1]">
                <li className="py-4">Un CV et une lettre adaptés à chaque entreprise, dont une candidature à l'INERIS, à Verneuil-en-Halatte, dont les activités scientifiques m'intéressent.</li>
                <li className="py-4">Chaque contact noté dans le tableau de suivi de recherche du lycée : date, entreprise, personne contactée, réponse.</li>
                <li className="py-4">Une attestation de rendez-vous signée pour chaque entretien en entreprise.</li>
              </ul>
            </div>
          </div>
          <div className="relative mt-12 flex flex-wrap gap-3">
            <Magnetic>
              <Link to="/contact" viewTransition className="btn">
                Proposer un stage <ArrowRight />
              </Link>
            </Magnetic>
            <Link to="/documents?dossier=stage" viewTransition className="btn btn-ghost">
              Les documents de stage
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap mt-28 lg:mt-36">
        <SectionLabel index="04">Qualités</SectionLabel>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROFILE.qualities.map((q, i) => (
            <Reveal as="li" key={q.name} delay={i * 80} className="spot card p-7">
              <p className="num text-[12px] text-faint">0{i + 1}</p>
              <h3 className="serif mt-10 text-[40px] leading-none text-accent-soft">{q.name}</h3>
              <p className="mt-5 text-[15px] leading-relaxed text-soft">{q.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="wrap mt-28 grid gap-20 lg:mt-36 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionLabel index="05">Langues</SectionLabel>
          <ul className="mt-10 space-y-8">
            {LANGUAGES.map((l, i) => (
              <Reveal as="li" key={l.name} delay={i * 80}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[22px] font-semibold tracking-[-0.02em]">{l.name}</span>
                  <span className="text-[14.5px] text-soft">{l.level}</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <LangBar value={l.value} />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <SectionLabel index="06">Centres d'intérêt</SectionLabel>
          <ul className="rows mt-10">
            {INTERESTS.map((it, i) => (
              <Reveal as="li" key={it.name} delay={i * 80} className="py-6">
                <p className="text-[22px] font-semibold tracking-[-0.02em]">{it.name}</p>
                <p className="mt-1.5 text-[15.5px] text-soft">{it.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/** A level bar that fills once the parent has been revealed. */
function LangBar({ value }: { value: number }) {
  return (
    <span
      className="lang-bar block h-full rounded-full bg-gradient-to-r from-accent to-[var(--accent-soft)]"
      style={{ "--v": `${value}%` } as CSSProperties}
    />
  );
}
