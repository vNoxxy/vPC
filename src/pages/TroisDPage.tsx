import type { CSSProperties } from "react";
import { Curtain, Lines, Reveal } from "../components/Reveal";
import { Facts, PageHero, Picture, SectionLabel } from "../components/ui";
import { CREATURE_HUNTERS as CH, TOOLS_3D } from "../data/troisd";
import type { Shot } from "../data/types";
import { withBase } from "../lib/site";
import { usePageMeta } from "../lib/usePageMeta";

/** A render on its pale stage, opening like a curtain, with its caption. */
function Render({ shot, priority = false, sizes = "(min-width: 1360px) 1280px, 92vw" }: { shot: Shot; priority?: boolean; sizes?: string }) {
  return (
    <figure>
      <Curtain>
        <a href={withBase(shot.src)} target="_blank" rel="noopener noreferrer" data-cursor="Zoom" aria-label={`Ouvrir le rendu en grand : ${shot.caption}`} className="block overflow-hidden rounded-[22px]">
          <Picture
            src={shot.src}
            alt={shot.caption}
            sizes={sizes}
            priority={priority}
            className="block w-full transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.02]"
          />
        </a>
      </Curtain>
      <figcaption className="mt-4 flex gap-3 text-[14px] leading-snug text-soft">
        <span className="label !text-[11px] text-accent">Rendu</span>
        {shot.caption}
      </figcaption>
    </figure>
  );
}

export default function TroisDPage() {
  usePageMeta("3D", "La 3D de Timéo Vaast : les créatures, les armes et les décors de Creature Hunters, sculptés par le code dans Roblox.");
  return (
    <div style={{ "--accent": "#8f6fe8", "--accent-rgb": "143 111 232", "--accent-soft": "#c4b2ff" } as CSSProperties}>
      <PageHero
        label="3D"
        title={["Des créatures", <span className="serif text-accent-soft">sculptées par le code.</span>]}
        lead="À côté du code, je fais de la 3D. Ici, les modèles de Creature Hunters, mon jeu Roblox : créatures, boss, armes et décors, tous construits par mon propre code, sans aucun modèle importé."
        aside={
          <Facts
            rows={[
              { label: "Projet", value: CH.title },
              { label: "Période", value: CH.period },
              { label: "Méthode", value: "Modèles procéduraux en Luau" },
              { label: "Outils", value: TOOLS_3D.map((t) => t.name.split(" & ")[0]).join(", ") },
            ]}
          />
        }
      />

      <section className="wrap">
        <Render shot={CH.figures[0]} priority />
      </section>

      <section className="wrap mt-28 lg:mt-40">
        <SectionLabel index="01">{CH.title}</SectionLabel>
        <Reveal className="mt-10 max-w-[1100px] text-[clamp(24px,2.6vw,38px)] font-medium leading-[1.3] tracking-[-0.03em]">{CH.summary}</Reveal>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2">
          {CH.how.map((h, i) => (
            <Reveal as="li" key={h.label} delay={(i % 2) * 90} className="spot card p-7 sm:p-9">
              <p className="num text-[12px] text-accent">0{i + 1}</p>
              <h3 className="t-h3 mt-6">{h.label}</h3>
              <p className="mt-4 text-[16px] leading-relaxed text-[#c3c8d1]">{h.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="wrap mt-28 lg:mt-40">
        <SectionLabel index="02">Créatures et boss</SectionLabel>
        <Lines lines={["Avant, après :", <span className="serif text-accent-soft">deux fois plus de détails.</span>]} className="t-h2 mt-10" />
        <Reveal delay={150} className="t-lead mt-6 max-w-[720px]">
          Chaque modèle a été entièrement resculpté. Le nombre sous chaque version est son nombre de pièces.
        </Reveal>
        <div className="mt-14 grid gap-16">
          {CH.figures.slice(1).map((f) => (
            <Render key={f.src} shot={f} />
          ))}
        </div>
      </section>

      <section className="wrap mt-28 lg:mt-40">
        <SectionLabel index="03">L'Armurerie</SectionLabel>
        <Lines lines={["Vingt armes,", <span className="serif text-accent-soft">et la boutique qui les expose.</span>]} className="t-h2 mt-10" />
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="lg:col-span-2">
            <Render shot={CH.armory[1]} />
          </div>
          <Render shot={CH.armory[0]} sizes="(min-width: 1024px) 640px, 92vw" />
          <Render shot={CH.armory[2]} sizes="(min-width: 1024px) 640px, 92vw" />
          <Render shot={CH.armory[3]} sizes="(min-width: 1024px) 640px, 92vw" />
          <Render shot={CH.armory[4]} sizes="(min-width: 1024px) 640px, 92vw" />
        </div>
      </section>

      <section className="wrap mt-28 lg:mt-40">
        <SectionLabel index="04">Mes outils 3D</SectionLabel>
        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {TOOLS_3D.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 80} className="card p-7">
              <p className="text-[20px] font-semibold tracking-[-0.02em]">{t.name}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-soft">{t.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
