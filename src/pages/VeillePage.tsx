import type { CSSProperties } from "react";
import { Link } from "react-router";
import { Lines, Reveal } from "../components/Reveal";
import SlideDeck, { SLIDE_COUNT } from "../components/SlideDeck";
import { ArrowUpRight, Facts, PageHero, SectionLabel } from "../components/ui";
import { AXES, JOURNAL, SOURCES, TOOLS, VEILLE } from "../data/veille";
import { ACCENTS, type AccentKey } from "../lib/accents";
import { DOCUMENTS } from "../lib/documents";
import { usePageMeta } from "../lib/usePageMeta";

/** The presentation's PDF, kept with the AP documents. */
const PDF = DOCUMENTS.find((d) => d.ext === "PDF" && d.name.includes("diaporama"));

const STAGES = ["Planifier sa veille", "Sélectionner des ressources", "Collecter l'information", "Analyser l'information", "Diffuser l'information"];

/** Each angle keeps the color of its slides in the deck. */
const AXIS_COLORS: AccentKey[] = ["red", "orange", "green", "violet"];

export default function VeillePage() {
  usePageMeta("Veille technologique", `La veille technologique de Timéo Vaast en BTS SIO : ${VEILLE.subject}.`);
  return (
    <>
      <PageHero
        label="Veille technologique"
        title={["L'IA et la", <span className="serif text-accent-soft">cybersécurité.</span>]}
        lead={<span className="text-fg">{VEILLE.question}</span>}
        aside={
          <Facts
            rows={[
              { label: "Présentation", value: "En atelier, du 4 au 18 décembre 2026" },
              {
                label: "Méthode",
                value: (
                  <>
                    Apprise en AP,{" "}
                    <Link to="/documents?dossier=mes-tp-et-exercices" viewTransition className="link-line">
                      les exercices
                    </Link>
                  </>
                ),
              },
              { label: "Outil", value: "Feedly et des alertes" },
              { label: "Articles retenus", value: String(JOURNAL.length) },
            ]}
          />
        }
      />

      {/* The presentation itself, as given in AP. */}
      <section className="wrap">
        <SectionLabel index="01">Le diaporama · {SLIDE_COUNT} diapositives</SectionLabel>
        <Reveal variant="scale" className="pt-10">
          <SlideDeck pdf={PDF} />
        </Reveal>
      </section>

      <section className="wrap mt-28 lg:mt-40">
        <SectionLabel index="02">Pourquoi ce sujet</SectionLabel>
        <Reveal className="mt-10 max-w-[1100px] text-[clamp(24px,2.6vw,38px)] font-medium leading-[1.3] tracking-[-0.03em]">{VEILLE.why}</Reveal>
        <ol className="mt-16 grid gap-px overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-5">
          {STAGES.map((s, i) => (
            <Reveal as="li" key={s} delay={i * 70} className="bg-bg p-6">
              <span className="num text-[12px] text-accent">Étape {i + 1}</span>
              <p className="mt-6 text-[16px] font-medium leading-snug">{s}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="wrap mt-28 lg:mt-40">
        <SectionLabel index="03">Ce que je suis</SectionLabel>
        <Lines lines={["Quatre angles", <span className="serif text-accent-soft">sur un même sujet.</span>]} className="t-h2 mt-10" />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {AXES.map((axis, i) => {
            const color = ACCENTS[AXIS_COLORS[i]];
            return (
              <Reveal key={axis.title} delay={(i % 2) * 100} className="spot card relative overflow-hidden p-8 sm:p-10" style={{ "--spot-color": color } as CSSProperties}>
                <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-[80px]" style={{ background: color }} />
                <p className="label relative" style={{ color }}>
                  Angle {i + 1} sur 4
                </p>
                <h3 className="t-h3 relative mt-6">{axis.title}</h3>
                <p className="relative mt-4 text-[16.5px] leading-relaxed text-[#c3c8d1]">{axis.text}</p>
                <ul className="relative mt-6 space-y-3 border-t border-[var(--line)] pt-6 text-[15px] leading-relaxed text-soft">
                  {axis.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* What I kept from my reading, the newest first. */}
      <section className="wrap mt-28 lg:mt-40">
        <SectionLabel index="04">Journal de veille</SectionLabel>
        <Lines lines={["Ce que j'ai retenu", <span className="serif text-accent-soft">de chaque article.</span>]} className="t-h2 mt-10" />
        <ol className="rows mt-14">
          {JOURNAL.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 50} className="grid gap-3 py-9 lg:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
              <p className="num text-[13px] text-accent">{e.date}</p>
              <div>
                <h3 className="text-[21px] font-semibold leading-snug tracking-[-0.02em]">{e.title}</h3>
                <p className="mt-2 text-[14.5px] text-soft">
                  {e.href ? (
                    <a href={e.href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5 hover:text-fg">
                      {e.source} <ArrowUpRight />
                    </a>
                  ) : (
                    e.source
                  )}
                </p>
              </div>
              <p className="border-l-2 border-[var(--line-strong)] pl-5 text-[16px] leading-relaxed text-[#c3c8d1]">{e.takeaway}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="wrap mt-28 grid gap-16 lg:mt-40 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
        <div>
          <SectionLabel index="05">Sources</SectionLabel>
          <ul className="rows mt-10">
            {SOURCES.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="row-hover group grid gap-1 px-2 py-5 sm:grid-cols-[1fr_auto] sm:gap-6 sm:px-4">
                  <span>
                    <span className="inline-flex items-center gap-2 text-[17.5px] font-semibold tracking-[-0.01em]">
                      {s.name} <ArrowUpRight className="text-faint transition-colors group-hover:text-accent" />
                    </span>
                    <span className="mt-1 block text-[14.5px] text-soft">{s.why}</span>
                  </span>
                  <span className="label !text-[10.5px] sm:pt-1.5">{s.kind}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionLabel index="06">Outils</SectionLabel>
          <ul className="mt-10 space-y-4">
            {TOOLS.map((t, i) => (
              <Reveal as="li" key={t.name} delay={i * 80} className="card p-7">
                <p className="text-[19px] font-semibold">{t.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-soft">{t.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
