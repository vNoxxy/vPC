import { useState, type CSSProperties } from "react";
import { Link, useParams } from "react-router";
import { Curtain, Lines, Reveal } from "../components/Reveal";
import { ArrowLeft, ArrowRight, ArrowUpRight, Dot, Figure, Inline, Magnetic, Picture } from "../components/ui";
import { COMPETENCES } from "../data/competences";
import { PROJECTS, PROJECT_BY_SLUG, periodLabel } from "../data/realisations";
import type { CodeProof } from "../data/types";
import { ACCENTS, rgbChannels } from "../lib/accents";
import { usePageMeta } from "../lib/usePageMeta";
import NotFoundPage from "./NotFoundPage";

/** A piece of code in an editor's window, with a button to copy it. */
function CodeWindow({ proof }: { proof: CodeProof }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(proof.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // No clipboard: the code stays selectable.
    }
  };
  return (
    <div className="overflow-hidden rounded-[20px] border border-[var(--line)] bg-[#08090c]">
      <div className="flex items-center gap-4 border-b border-[var(--line)] px-5 py-3.5">
        <span aria-hidden className="flex gap-1.5">
          <i className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <i className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <i className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="label truncate !text-[10.5px]">Extrait · {proof.lang}</span>
        <span className="ml-auto" />
        <button type="button" onClick={copy} className="chip !h-7 transition-colors hover:border-accent hover:text-fg" aria-live="polite">
          {copied ? "Copié ✓" : "Copier"}
        </button>
      </div>
      <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-[1.8] text-[#d4d8df] sm:p-8">
        {proof.code.split("\n").map((line, i) => (
          <span key={i} className="block">
            <span aria-hidden className="mr-6 inline-block w-5 select-none text-right text-faint">
              {i + 1}
            </span>
            <span className={line.trimStart().startsWith("//") ? "italic text-[#7d8696]" : ""}>{line || " "}</span>
          </span>
        ))}
      </pre>
    </div>
  );
}

/** One Vody Studio project, read as a case study: what it was, what I did, what it proves. */
export default function ProjectPage() {
  const { slug = "" } = useParams();
  const r = PROJECT_BY_SLUG.get(slug);
  usePageMeta(r?.title, r?.summary);
  if (!r) return <NotFoundPage />;

  const color = ACCENTS[r.accent];
  const index = PROJECTS.indexOf(r);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const nextColor = ACCENTS[next.accent];
  const shownCompetences = COMPETENCES.filter((c) => r.competences[c.key]?.length);

  const story = [
    { label: "Le contexte", text: r.context },
    { label: "Le besoin", text: r.need },
    { label: "Ce que j'ai fait", text: r.contribution },
  ];

  return (
    <div style={{ "--accent": color, "--accent-rgb": rgbChannels(color), "--spot-color": color } as CSSProperties} key={r.slug}>
      {/* The head: the project's own color, its title, and its facts. */}
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <div aria-hidden className="pointer-events-none absolute -left-40 -top-60 h-[640px] w-[900px] rounded-full opacity-30 blur-[150px]" style={{ background: color }} />
        <div className="wrap relative">
          <div className="flex flex-wrap items-center justify-between gap-4" data-anim="rise">
            <Link to="/vody-studio" viewTransition className="group inline-flex items-center gap-2 text-[14.5px] text-soft transition-colors hover:text-fg">
              <ArrowLeft className="transition-transform duration-500 group-hover:-translate-x-1" /> Vody Studio
            </Link>
            <span className="num text-[13px] text-soft">
              Projet <span style={{ color }}>{String(index + 1).padStart(2, "0")}</span> / {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </div>
          <p className="label mt-14 flex items-center gap-3" data-anim="rise" style={{ "--d": 80 } as CSSProperties}>
            <span className="h-px w-8" style={{ background: color }} />
            <span style={{ color }}>{r.kind}</span>
          </p>
          <Lines as="h1" lines={[r.short]} className="mt-6 font-semibold leading-[0.88] tracking-[-0.055em] text-[clamp(64px,12vw,190px)]" delay={100} />
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <Reveal delay={250}>
              <p className="text-[clamp(22px,2.2vw,30px)] font-medium leading-[1.3] tracking-[-0.025em]">{r.summary}</p>
              {r.live && (
                <Magnetic className="mt-9">
                  <a href={r.live.href} target="_blank" rel="noopener noreferrer" className="btn">
                    Voir {r.live.label} en ligne <ArrowUpRight />
                  </a>
                </Magnetic>
              )}
            </Reveal>
            <Reveal delay={350}>
              <dl className="rows text-[15px]">
                <div className="grid grid-cols-[120px_1fr] gap-4 py-3.5">
                  <dt className="label !text-[11px]">Période</dt>
                  <dd className="font-medium">{periodLabel(r).replace(/^./, (c) => c.toUpperCase())}</dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-4 py-3.5">
                  <dt className="label !text-[11px]">Cadre</dt>
                  <dd className="flex items-center gap-2.5 font-medium">
                    <i aria-hidden className="live-dot" />
                    {r.format}
                  </dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-4 py-3.5">
                  <dt className="label !text-[11px]">Outils</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {r.tools.map((t) => (
                      <span key={t} className="chip !h-7 !text-[11.5px]">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {r.cover && (
        <section className="wrap">
          <Curtain>
            <div className="relative overflow-hidden rounded-[28px] border border-[var(--line)] p-4 sm:p-8 lg:p-14" style={{ background: `color-mix(in srgb, ${color} 12%, #0a0b0e)` }}>
              <div aria-hidden className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:48px_48px]" />
              <div className="relative mx-auto max-w-[1100px]">
                <Picture src={r.cover.src} alt={r.cover.caption} priority sizes="(min-width: 1360px) 1100px, 90vw" className="mx-auto block max-h-[78vh] w-auto rounded-[16px] border border-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]" />
              </div>
            </div>
          </Curtain>
          <p className="mt-4 flex gap-3 text-[14px] text-soft">
            <span className="label !text-[11px] text-accent">Fig. 01</span>
            {r.cover.caption}
          </p>
        </section>
      )}

      {/* The story, told like the AP fiche: a chapter per question. */}
      <section className="wrap mt-28 lg:mt-40">
        <div className="rows">
          {story.map((row, i) => (
            <Reveal key={row.label} className="grid gap-4 py-10 lg:grid-cols-[320px_1fr] lg:gap-16 lg:py-14">
              <p className="flex items-baseline gap-4">
                <span className="num text-[13px] text-accent">0{i + 1}</span>
                <span className="text-[19px] font-semibold tracking-[-0.01em]">{row.label}</span>
              </p>
              <p className="max-w-[820px] text-[clamp(19px,1.6vw,23px)] leading-[1.6] text-[#c9ced6]">
                <Inline text={row.text} />
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The hard part and how it was solved, side by side. */}
      <section className="wrap mt-20 lg:mt-28">
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="card p-8 sm:p-12">
            <p className="label flex items-center gap-3">
              <span className="num text-[#ff5a63]">04</span> La difficulté
            </p>
            <p className="mt-8 text-[clamp(22px,2vw,28px)] font-medium leading-[1.35] tracking-[-0.02em]">
              <Inline text={r.difficulty} />
            </p>
          </Reveal>
          <Reveal delay={120} className="spot card relative overflow-hidden p-8 sm:p-12">
            <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full opacity-25 blur-[100px]" style={{ background: color }} />
            <p className="label relative flex items-center gap-3">
              <span className="num text-accent">05</span> La solution
            </p>
            <p className="relative mt-8 text-[18px] leading-[1.7] text-[#c9ced6]">
              <Inline text={r.solution} />
            </p>
          </Reveal>
        </div>
      </section>

      {r.code?.map((c) => (
        <section key={c.title} className="wrap mt-20 lg:mt-28">
          <Reveal className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="t-h3">{c.title}</h2>
            <span className="label">Preuve · extrait réel</span>
          </Reveal>
          <Reveal>
            <CodeWindow proof={c} />
          </Reveal>
        </section>
      ))}

      {r.shots && r.shots.length > 0 && (
        <section className="wrap mt-20 grid gap-12 lg:mt-28">
          {r.shots.map((shot) => (
            <Figure key={shot.src} shot={shot} />
          ))}
        </section>
      )}

      {/* What it proves. */}
      <section className="wrap mt-28 grid gap-16 lg:mt-40 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="label mb-8">Compétences démontrées · E4</p>
          <ul className="rows">
            {shownCompetences.map((c, i) => (
              <Reveal as="li" key={c.key} delay={i * 60} className="py-6">
                <Link to={`/competences#${c.key}`} viewTransition className="group flex items-center gap-3 text-[18px] font-semibold tracking-[-0.01em]">
                  <Dot color={ACCENTS[c.accent]} glow />
                  <span className="link">{c.label}</span>
                </Link>
                <ul className="mt-3 space-y-1.5 pl-[22px]">
                  {r.competences[c.key]!.map((ai) => (
                    <li key={ai} className="text-[15.5px] leading-relaxed text-soft">
                      {c.activities[ai]}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-8">Preuves</p>
          <ol className="rows">
            {r.proofs.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 60} className="flex gap-5 py-6 text-[16.5px] leading-relaxed text-[#c9ced6]">
                <span className="num pt-1 text-[12px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                {p}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* The lesson, said large. */}
      <section className="wrap mt-28 lg:mt-40">
        <Reveal className="relative">
          <span aria-hidden className="serif absolute -left-2 -top-16 text-[180px] leading-none text-accent opacity-30 sm:-left-6">
            “
          </span>
          <p className="label mb-8">Ce que j'en retiens</p>
          <p className="max-w-[1100px] text-[clamp(28px,3.6vw,54px)] font-medium leading-[1.15] tracking-[-0.035em]">{r.bilan}</p>
        </Reveal>
      </section>

      {/* The next project, as a door. */}
      <nav aria-label="Projet suivant" className="wrap mt-32 lg:mt-44">
        <Link
          to={`/vody-studio/${next.slug}`}
          viewTransition
          data-cursor="Suivant"
          className="spot card group relative block overflow-hidden !rounded-[32px] p-8 sm:p-12 lg:p-16"
          style={{ "--spot-color": nextColor } as CSSProperties}
        >
          <div aria-hidden className="pointer-events-none absolute -right-20 top-0 h-full w-1/2 opacity-0 blur-[100px] transition-opacity duration-700 group-hover:opacity-30" style={{ background: nextColor }} />
          <p className="label relative">Projet suivant</p>
          <div className="relative mt-6 flex items-end justify-between gap-6">
            <p className="text-[clamp(48px,9vw,140px)] font-semibold leading-[0.9] tracking-[-0.05em] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-3">{next.short}</p>
            <span className="mb-3 grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] text-[22px] transition-colors duration-500 group-hover:border-transparent group-hover:text-bg sm:h-24 sm:w-24" style={{ backgroundColor: "transparent" }}>
              <span className="absolute h-16 w-16 scale-0 rounded-full transition-transform duration-500 group-hover:scale-100 sm:h-24 sm:w-24" style={{ background: nextColor }} />
              <ArrowRight className="relative" />
            </span>
          </div>
          <p className="relative mt-4 text-[16px] text-soft">{next.kind}</p>
        </Link>
      </nav>
    </div>
  );
}
