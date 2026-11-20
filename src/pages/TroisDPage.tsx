import SiteLayout from "../components/Layout";
import { Facts, Figure, PageHead, Row, SectionHead } from "../components/ui";
import { CREATURE_HUNTERS as CH, TOOLS_3D } from "../data/troisd";
import { withBase } from "../lib/site";

/** A render, served as WebP when the browser can read it. */
function Render({ src, caption, eager = false }: { src: string; caption: string; eager?: boolean }) {
  const base = src.replace(/\.jpg$/, "");
  return (
    <figure>
      <a href={withBase(src)} target="_blank" rel="noopener noreferrer" aria-label={`Ouvrir le rendu en grand : ${caption}`}>
        <picture>
          <source type="image/webp" srcSet={`${withBase(`${base}-800.webp`)} 800w, ${withBase(`${base}-1600.webp`)} 1400w`} sizes="(min-width: 1200px) 1120px, 92vw" />
          <img src={withBase(src)} alt={caption} loading={eager ? "eager" : "lazy"} className="shot" />
        </picture>
      </a>
      <figcaption className="caption">{caption}</figcaption>
    </figure>
  );
}

export default function TroisDPage() {
  return (
    <SiteLayout title="3D" description="La 3D de Timéo Vaast : les créatures, les armes et les décors de Creature Hunters, sculptés par le code dans Roblox.">
      <PageHead
        title="3D"
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
        <Render src={CH.figures[0].src} caption={CH.figures[0].caption} eager />
      </section>

      <section className="wrap mt-24">
        <SectionHead title={CH.title} note={CH.kind} />
        <p className="mt-7 max-w-[920px] text-[clamp(21px,2.3vw,28px)] font-medium leading-[1.35] tracking-[-0.02em]">{CH.summary}</p>
        <div className="rule-rows mt-10 border-t border-rule">
          {CH.how.map((h) => (
            <Row key={h.label} label={h.label}>
              <p className="t-body">{h.text}</p>
            </Row>
          ))}
        </div>
      </section>

      <section className="wrap mt-24">
        <SectionHead title="Créatures et boss" note="Avant et après la refonte, avec le nombre de pièces" />
        <div className="mt-8 grid gap-12">
          {CH.figures.slice(1).map((f) => (
            <Figure key={f.src} shot={f} />
          ))}
        </div>
      </section>

      <section className="wrap mt-24">
        <SectionHead title="L'Armurerie" note="Armes, reliques et boutique" />
        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <Render src={CH.armory[1].src} caption={CH.armory[1].caption} />
          </div>
          <Render src={CH.armory[0].src} caption={CH.armory[0].caption} />
          <Render src={CH.armory[2].src} caption={CH.armory[2].caption} />
          <Render src={CH.armory[3].src} caption={CH.armory[3].caption} />
          <Render src={CH.armory[4].src} caption={CH.armory[4].caption} />
        </div>
      </section>

      <section className="wrap mt-24">
        <SectionHead title="Mes outils 3D" />
        <ul className="rule-rows">
          {TOOLS_3D.map((t) => (
            <li key={t.name} className="grid gap-1 py-4 sm:grid-cols-[260px_1fr] sm:gap-8">
              <p className="text-[17px] font-semibold">{t.name}</p>
              <p className="text-[15.5px] text-soft">{t.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
