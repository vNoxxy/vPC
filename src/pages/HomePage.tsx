import { useRef, type CSSProperties } from "react";
import { Link } from "react-router";
import Bridge from "../components/Bridge";
import CompetenceGrid from "../components/CompetenceGrid";
import Marquee from "../components/Marquee";
import NetworkField from "../components/NetworkField";
import ProjectStack from "../components/ProjectStack";
import { Curtain, Lines, Reveal } from "../components/Reveal";
import ScrollText from "../components/ScrollText";
import { ArrowDown, ArrowRight, ArrowUpRight, Counter, Magnetic, Picture, SectionLabel, VodyBrand } from "../components/ui";
import { EXPERIENCE, PROFILE } from "../data/profile";
import { PROJECTS } from "../data/realisations";
import { VEILLE } from "../data/veille";
import deck from "../data/veille-deck/deck.json";
import { ACTIVITY_COUNT, COVERED_COUNT } from "../lib/coverage";
import { DOCUMENTS, SECTIONS } from "../lib/documents";
import { useParisTime, useScrollProgress } from "../lib/motion";
import { usePageMeta } from "../lib/usePageMeta";

/** "Cinq produits", rather than "5 produits", at the start of a sentence. */
const COUNT_WORDS: Record<number, string> = { 3: "Trois", 4: "Quatre", 5: "Cinq", 6: "Six", 7: "Sept", 8: "Huit" };

const STACK = ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Lua", "Prisma", "Stripe", "discord.js", "Linux", "GLPI", "Tailwind CSS", "Vitest", "Blender", "Unreal Engine"];

function Hero() {
  const time = useParisTime();
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <NetworkField className="absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,transparent_20%,var(--bg)_85%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-1/4 h-[480px] w-[480px] rounded-full bg-accent/25 blur-[140px]" />

      <div className="wrap intro relative flex flex-1 flex-col pb-8 pt-28 sm:pt-32">
        <div className="flex flex-wrap items-center justify-between gap-4" style={{ "--d": 100 } as CSSProperties}>
          <Link to="/parcours#stage" viewTransition className="inline-flex items-center gap-3 rounded-full border border-[var(--line-strong)] bg-bg/40 py-2 pl-3.5 pr-4 text-[14px] backdrop-blur transition-colors hover:border-[var(--signal)]">
            <i aria-hidden className="live-dot" />
            Je cherche un stage de 1re année
            <ArrowRight className="text-soft" />
          </Link>
          <p className="label hidden sm:block">
            Chantilly, FR — <span className="num text-fg">{time}</span>
          </p>
        </div>

        <div className="mt-auto grid items-end gap-10 pt-16 lg:grid-cols-[1fr_400px] lg:gap-12">
          <Lines
            as="h1"
            delay={150}
            className="font-semibold leading-[0.82] tracking-[-0.06em] text-[clamp(84px,25vw,300px)] lg:text-[clamp(84px,18.5vw,300px)]"
            lines={[
              "Timéo",
              <>
                Vaast<span className="text-accent">.</span>
              </>,
            ]}
          />
          <div className="pb-2 lg:pb-6" style={{ "--d": 700 } as CSSProperties}>
            <p className="text-[clamp(22px,2vw,28px)] font-medium leading-[1.25] tracking-[-0.025em]">
              Je développe des applications <span className="serif text-[1.12em] text-accent-soft">et j'apprends à les protéger.</span>
            </p>
            <p className="mt-5 text-[15.5px] leading-relaxed text-soft">
              Étudiant en BTS SIO option SLAM au lycée Jean Rostand de Chantilly, et fondateur de Vody Studio, ma micro-entreprise de développement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a href="#projets" className="btn">
                  Voir les projets <ArrowDown className="arrow" />
                </a>
              </Magnetic>
              <Link to="/cv" viewTransition className="btn btn-ghost">
                Mon CV
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--line)] pt-6 text-[13.5px] sm:grid-cols-4" style={{ "--d": 900 } as CSSProperties}>
          {[
            ["BTS SIO · SLAM", "2026 — 2028"],
            ["Vody Studio", "Depuis oct. 2026"],
            ["Veille", "IA & cybersécurité"],
          ].map(([a, b], i) => (
            <p key={a} className="flex flex-col gap-1">
              <span className="num text-[11px] text-faint">0{i + 1}</span>
              <span className="font-medium">{a}</span>
              <span className="text-soft">{b}</span>
            </p>
          ))}
          <a href="#qui" className="hidden items-end justify-end gap-3 text-soft transition-colors hover:text-fg sm:flex">
            <span className="label !text-[11px]">Défiler</span>
            <span aria-hidden className="scroll-cue h-12 w-px bg-[var(--line-strong)]" />
          </a>
        </div>
      </div>
    </section>
  );
}

/** The studio's wordmark, sliding sideways with the scroll. */
function VodyBand() {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref);
  return (
    <section ref={ref} className="relative mt-32 overflow-hidden lg:mt-44">
      <p
        aria-hidden
        className="whitespace-nowrap font-brand font-extrabold leading-none tracking-[0.02em] text-transparent [-webkit-text-stroke:1.5px_rgba(61,149,242,0.5)] text-[clamp(90px,17vw,280px)]"
        style={{ transform: "translateX(calc(10% - var(--p, 0.5) * 45%))" }}
      >
        VODY STUDIO — VODY STUDIO
      </p>
      <div className="wrap -mt-6 sm:-mt-12">
        <div className="relative overflow-hidden rounded-[32px] border border-[var(--line)] bg-[linear-gradient(160deg,#0f1520,#07080b_60%)]">
          <div aria-hidden className="absolute -right-20 -top-20 h-[460px] w-[460px] rounded-full bg-accent/30 blur-[130px]" />
          <div className="relative grid lg:grid-cols-[420px_1fr]">
            <div className="flex flex-col p-8 sm:p-12">
              <Reveal>
                <VodyBrand large />
              </Reveal>
              <Lines
                lines={["Ma micro-entreprise", <span className="serif text-accent-soft">de développement.</span>]}
                className="mt-10 text-[clamp(32px,3.2vw,46px)] font-semibold leading-[1.02] tracking-[-0.04em]"
              />
              <Reveal delay={200} className="mt-7 text-[17px] leading-relaxed text-soft">
                Immatriculée en octobre 2026 : des sites, des applications et des outils pour les serveurs FiveM et Discord. Ce que j'apprends en BTS, je l'applique ici sur de vrais projets.
              </Reveal>
              <Reveal delay={300} className="mt-10 flex flex-wrap gap-3 lg:mt-auto lg:pt-10">
                <a href={PROFILE.vody} target="_blank" rel="noopener noreferrer" className="btn">
                  vodystudio.fr <ArrowUpRight />
                </a>
                <Link to="/vody-studio" viewTransition className="btn btn-ghost">
                  Le studio
                </Link>
              </Reveal>
            </div>
            <Curtain className="flex items-end pl-8 pt-2 sm:pl-12 lg:pl-0 lg:pt-16">
              <Picture
                src="/images/vodystudio-tableau-de-bord.jpg"
                alt="L'espace client de vodystudio.fr, avec des données de démonstration"
                sizes="(min-width: 1024px) 900px, 92vw"
                className="block w-full max-w-none rounded-tl-[18px] border-l border-t border-white/10 lg:w-[900px]"
              />
            </Curtain>
          </div>
        </div>
      </div>
    </section>
  );
}

function Veille() {
  return (
    <section className="wrap mt-32 lg:mt-44">
      <SectionLabel index="05">Veille technologique</SectionLabel>
      <Reveal className="mt-10">
        <Link to="/veille" viewTransition data-cursor="Lire" className="spot card group relative grid overflow-hidden !rounded-[32px] lg:grid-cols-[1.3fr_1fr]">
          <div className="relative p-8 sm:p-12 lg:p-16">
            <p className="label text-accent">{VEILLE.subject}</p>
            <p className="mt-6 text-[clamp(30px,3.6vw,54px)] font-medium leading-[1.08] tracking-[-0.035em]">
              L'intelligence artificielle rend-elle nos systèmes d'information <span className="serif text-accent-soft">plus sûrs, ou plus fragiles ?</span>
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px] text-soft">
              <span className="inline-flex items-center gap-2 font-semibold text-fg">
                <span className="link-line">Explorer la veille</span> <ArrowRight />
              </span>
              <span className="num text-[13px]">{deck.order.length} diapositives · 4 angles · un journal</span>
            </div>
          </div>
          {/* A radar sweeping for threats: what a watch does. */}
          <div aria-hidden className="relative hidden min-h-[360px] items-center justify-center overflow-hidden border-l border-[var(--line)] lg:flex">
            <div className="relative aspect-square w-[78%]">
              {[1, 0.75, 0.5, 0.25].map((s) => (
                <span key={s} className="absolute rounded-full border border-[var(--line-strong)]" style={{ inset: `${(1 - s) * 50}%` }} />
              ))}
              <span className="absolute left-1/2 top-0 h-full w-px bg-[var(--line)]" />
              <span className="absolute left-0 top-1/2 h-px w-full bg-[var(--line)]" />
              <span className="radar-sweep absolute inset-0 rounded-full" />
              {[
                { x: 68, y: 30, c: "#ff5a63", d: "0.6s" },
                { x: 30, y: 62, c: "#8cc2fb", d: "2.4s" },
                { x: 58, y: 74, c: "#8cc2fb", d: "3.1s" },
                { x: 24, y: 28, c: "#ff5a63", d: "4.1s" },
              ].map((b) => (
                <span key={`${b.x}-${b.y}`} className="radar-blip absolute h-2.5 w-2.5 rounded-full" style={{ left: `${b.x}%`, top: `${b.y}%`, background: b.c, boxShadow: `0 0 16px ${b.c}`, "--delay": b.d } as CSSProperties} />
              ))}
            </div>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}

export default function HomePage() {
  usePageMeta();
  return (
    <>
      <Hero />

      <Marquee
        className="border-y border-[var(--line)] py-6 sm:py-8"
        speed={55}
        items={STACK.map((s, i) => (
          <span key={s} className={`whitespace-nowrap text-[clamp(26px,3.4vw,48px)] font-semibold tracking-[-0.035em] ${i % 3 === 1 ? "serif font-normal text-soft" : ""}`}>
            {s}
          </span>
        ))}
      />

      {/* Who I am, lit word by word, and the figures beside it. */}
      <section id="qui" className="wrap scroll-mt-24 pt-32 lg:pt-44">
        <SectionLabel index="01">Qui je suis</SectionLabel>
        <ScrollText
          className="mt-12 max-w-[1180px] text-[clamp(30px,4.4vw,66px)] font-medium leading-[1.08] tracking-[-0.04em]"
          accent={["réparer", "programmer", "protéger", "production"]}
          text="J'ai d'abord appris à réparer des machines, en bac pro de maintenance industrielle. Aujourd'hui j'apprends à les programmer et à les protéger. Chez Vody Studio, chaque notion vue en cours finit en production, pour de vrais clients."
        />
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--line)] lg:grid-cols-4">
          {[
            { value: DOCUMENTS.length, label: "documents de cours et de TP à télécharger", to: "/documents" },
            { value: COVERED_COUNT, label: `activités du référentiel E4 déjà prouvées, sur ${ACTIVITY_COUNT}`, to: "/competences" },
            { value: PROJECTS.length, label: "projets menés chez Vody Studio", to: "/vody-studio" },
            { value: EXPERIENCE.length, label: "stages en entreprise pendant le bac pro", to: "/parcours" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="bg-bg">
              <Link to={s.to} viewTransition className="group flex h-full flex-col justify-between gap-8 p-6 transition-colors duration-500 hover:bg-surface sm:p-8">
                <span className="text-[clamp(56px,6vw,92px)] font-semibold leading-none tracking-[-0.05em] [&_.num]:font-sans">
                  <Counter value={s.value} pad={2} />
                </span>
                <span className="flex items-end justify-between gap-3 text-[14.5px] leading-snug text-soft">
                  {s.label}
                  <ArrowRight className="shrink-0 text-faint transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="projets" className="wrap scroll-mt-16 pt-32 lg:pt-44">
        <SectionLabel index="02">Projets</SectionLabel>
        <div className="mb-14 mt-10 grid gap-8 lg:mb-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Lines lines={["Des projets en ligne,", <span className="serif text-accent-soft">pas des maquettes.</span>]} className="t-h2" />
          <Reveal delay={150} className="t-lead lg:pb-2">
            {COUNT_WORDS[PROJECTS.length] ?? PROJECTS.length} produits de Vody Studio, conçus, codés et testés par moi, en ligne ou prêts à publier. Chacun raconté comme une étude de cas.
          </Reveal>
        </div>
        <ProjectStack items={PROJECTS} />
      </section>

      <section className="wrap pt-28 lg:pt-40">
        <SectionLabel index="03">Du TP au code</SectionLabel>
        <div className="mb-12 mt-10 grid gap-8 lg:mb-16 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Lines lines={["Ce que j'apprends en cours,", <span className="serif text-accent-soft">je le mets en production.</span>]} className="t-h2" />
          <Reveal delay={150} className="t-lead lg:pb-2">
            Chaque protection vue en Bloc 3 tourne aujourd'hui dans un de mes projets. Le TP se télécharge, le code est en ligne.
          </Reveal>
        </div>
        <Bridge />
      </section>

      <section className="wrap pt-28 lg:pt-40">
        <SectionLabel index="04">Compétences</SectionLabel>
        <div className="mb-12 mt-10 grid gap-8 lg:mb-16 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Lines lines={["Les six compétences", <span className="serif text-accent-soft">du référentiel E4.</span>]} className="t-h2" />
          <Reveal delay={150} className="lg:pb-2">
            <p className="t-lead">Chaque TP et chaque projet coche les activités qu'il démontre. Le tableau de synthèse se remplit tout seul.</p>
            <Link to="/competences" viewTransition className="mt-6 inline-flex items-center gap-2 font-semibold">
              <span className="link-line">Le tableau de synthèse</span> <ArrowRight />
            </Link>
          </Reveal>
        </div>
        <CompetenceGrid />
      </section>

      <Veille />

      <VodyBand />

      {/* The 3D side, with one render. */}
      <section className="wrap mt-32 lg:mt-44">
        <SectionLabel index="07">3D</SectionLabel>
        <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
          <div>
            <Lines lines={["Je fais aussi", <span className="serif text-accent-soft">de la 3D.</span>]} className="t-h2" />
            <Reveal delay={150} className="t-lead mt-6">
              Les créatures, les boss et les armes de Creature Hunters, mon jeu Roblox, sont sculptés par mon propre code, sans aucun modèle importé.
            </Reveal>
            <Reveal delay={250}>
              <Link to="/3d" viewTransition className="mt-8 inline-flex items-center gap-2 font-semibold">
                <span className="link-line">Voir mes modèles 3D</span> <ArrowRight />
              </Link>
            </Reveal>
          </div>
          <Curtain>
            <Link to="/3d" viewTransition data-cursor="Voir" className="block overflow-hidden rounded-[22px]">
              <Picture src="/images/3d/boss-ronce-sphinx.jpg" alt="Deux boss de Creature Hunters, avant et après leur refonte" sizes="(min-width: 1024px) 760px, 92vw" className="block w-full transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.03]" />
            </Link>
          </Curtain>
        </div>
      </section>

      {/* The BTS work: one line per section of the Documents page. */}
      <section className="wrap mt-32 lg:mt-44">
        <SectionLabel index="08">Cours, TP et exercices</SectionLabel>
        <div className="mb-10 mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Lines lines={["Tout mon BTS,", <span className="serif text-accent-soft">à télécharger.</span>]} className="t-h2" />
          <Reveal delay={150} className="t-lead lg:pb-2">
            {DOCUMENTS.length} documents : mes TP rendus, les cours et les énoncés, et les pièces de ma recherche de stage.
          </Reveal>
        </div>
        <ul className="rows">
          {SECTIONS.map((s, i) => (
            <Reveal as="li" key={s.key} delay={i * 80}>
              <Link to={`/documents?dossier=${s.key}`} viewTransition className="row-hover group grid grid-cols-[auto_1fr_auto] items-center gap-5 px-1 py-7 sm:gap-8 sm:px-4 sm:py-9">
                <span className="num text-[13px] text-faint">0{i + 1}</span>
                <span className="text-[clamp(28px,4vw,56px)] font-semibold leading-none tracking-[-0.04em] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2">{s.label}</span>
                <span className="flex items-center gap-4 text-[14.5px] text-soft">
                  <span className="num hidden sm:inline">{s.docs.length} fichiers</span>
                  <ArrowRight className="row-arrow text-[22px]" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
