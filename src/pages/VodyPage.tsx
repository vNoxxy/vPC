import type { CSSProperties } from "react";
import { Link } from "react-router";
import Bridge from "../components/Bridge";
import NetworkField from "../components/NetworkField";
import { Curtain, Lines, Reveal } from "../components/Reveal";
import { ArrowRight, ArrowUpRight, Figure, Magnetic, Picture, SectionLabel, VodyBrand } from "../components/ui";
import { PROFILE } from "../data/profile";
import { PROJECTS } from "../data/realisations";
import { ACCENTS } from "../lib/accents";
import { usePageMeta } from "../lib/usePageMeta";

const COUNT_WORDS: Record<number, string> = { 3: "Trois", 4: "Quatre", 5: "Cinq", 6: "Six", 7: "Sept", 8: "Huit" };

export default function VodyPage() {
  usePageMeta("Vody Studio", "Vody Studio, la micro-entreprise de développement de Timéo Vaast, et ses projets : vodystudio.fr, vBot, Forge, l'audit FiveM et l'application WhyNot?.");
  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-36 sm:pt-44">
        <NetworkField className="absolute inset-0 opacity-60" density={0.6} />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,transparent_10%,var(--bg)_80%)]" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent/25 blur-[150px]" />
        <div className="wrap relative text-center">
          <div className="flex justify-center" data-anim="rise">
            <VodyBrand large />
          </div>
          <Lines
            as="h1"
            lines={["Ma micro-entreprise", <span className="serif text-accent-soft">de développement.</span>]}
            className="mx-auto mt-10 max-w-[1100px] t-display"
            delay={100}
          />
          <Reveal delay={300} className="t-lead mx-auto mt-8 max-w-[680px]">
            Des sites, des applications et des outils pour les serveurs FiveM et Discord, en service pour de vrais clients. C'est là que j'applique, chaque semaine, ce que j'apprends en BTS.
          </Reveal>
          <Reveal delay={400} className="mt-10 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <a href={PROFILE.vody} target="_blank" rel="noopener noreferrer" className="btn">
                Visiter vodystudio.fr <ArrowUpRight />
              </a>
            </Magnetic>
            <a href="#projets" className="btn btn-ghost">
              Les projets
            </a>
          </Reveal>
          <Reveal delay={500} className="mx-auto mt-16 grid max-w-[880px] grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--line)] text-left sm:grid-cols-3">
            {[
              ["Statut", "Timéo Vaast EI, micro-entreprise"],
              ["Immatriculation", "21 octobre 2026"],
              ["Activité", "Programmation informatique, APE 6201Z"],
            ].map(([k, v]) => (
              <div key={k} className="bg-bg/90 p-5 backdrop-blur">
                <p className="label !text-[10.5px]">{k}</p>
                <p className="mt-2 text-[15px] font-medium">{v}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="wrap mt-10">
        <Curtain>
          <Picture
            src="/images/vodystudio-tableau-de-bord.jpg"
            alt="L'espace client de vodystudio.fr, avec des données de démonstration"
            priority
            sizes="(min-width: 1360px) 1280px, 92vw"
            className="shot shadow-[0_60px_160px_-40px_rgba(61,149,242,0.45)]"
          />
        </Curtain>
        <p className="mt-4 flex gap-3 text-[14px] text-soft">
          <span className="label !text-[11px] text-accent">Fig.</span>
          L'espace client : chaque produit du studio au même endroit (données de démonstration).
        </p>
      </section>

      <section id="projets" className="wrap scroll-mt-24 pt-28 lg:pt-40">
        <SectionLabel index="01">Les projets</SectionLabel>
        <Lines lines={[`${COUNT_WORDS[PROJECTS.length] ?? PROJECTS.length} produits,`, <span className="serif text-accent-soft">une fiche chacun.</span>]} className="t-h2 mt-10" />
        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {PROJECTS.map((p, i) => {
            const color = ACCENTS[p.accent];
            return (
              <Reveal as="li" key={p.slug} delay={(i % 2) * 100}>
                <Link
                  to={`/vody-studio/${p.slug}`}
                  viewTransition
                  data-cursor="Voir"
                  className="spot card group flex h-full flex-col overflow-hidden !rounded-[28px]"
                  style={{ "--spot-color": color } as CSSProperties}
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--line)]" style={{ background: `color-mix(in srgb, ${color} 12%, #0a0b0e)` }}>
                    {p.cover && (
                      <Picture
                        src={p.cover.src}
                        alt={p.cover.caption}
                        sizes="(min-width: 768px) 640px, 92vw"
                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
                      />
                    )}
                    <span className="absolute left-5 top-5 rounded-full bg-bg/80 px-3 py-1.5 backdrop-blur">
                      <span className="num text-[12px]" style={{ color }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="num text-[12px] text-soft"> · {p.kind}</span>
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7 sm:p-9">
                    <h3 className="text-[clamp(32px,3.4vw,48px)] font-semibold leading-none tracking-[-0.045em]">{p.short}</h3>
                    <p className="mt-4 text-[16px] leading-relaxed text-soft">{p.summary}</p>
                    <span className="mt-8 inline-flex items-center gap-2 pt-2 text-[15px] font-semibold sm:mt-auto">
                      <span className="link-line">Étude de cas</span> <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <section className="wrap mt-28 lg:mt-40">
        <Figure shot={{ src: "/images/vodystudio-accueil.jpg", caption: "L'accueil de vodystudio.fr : le site présente les services du studio en quatre langues." }} />
      </section>

      <section className="wrap pt-28 lg:pt-40">
        <SectionLabel index="02">Du TP au code</SectionLabel>
        <div className="mb-12 mt-10 grid gap-8 lg:mb-16 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Lines lines={["Ce que j'apprends en cours,", <span className="serif text-accent-soft">appliqué dans mes projets.</span>]} className="t-h2" />
          <Reveal delay={150} className="t-lead lg:pb-2">
            Le BTS et le studio avancent ensemble : chaque notion de sécurité devient une protection réelle.
          </Reveal>
        </div>
        <Bridge />
      </section>
    </>
  );
}
