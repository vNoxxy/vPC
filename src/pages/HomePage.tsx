import { Link } from "react-router";
import IndexList from "../components/IndexList";
import SiteLayout from "../components/Layout";
import { Facts, Figure, SectionHead, VodyBrand } from "../components/ui";
import { COMPETENCES } from "../data/competences";
import { PROFILE } from "../data/profile";
import { HOME_SELECTION, REALISATIONS, REALISATION_BY_SLUG } from "../data/realisations";
import { documentsFor } from "../lib/documents";
import { withBase } from "../lib/site";

const PROJECTS = REALISATIONS.filter((r) => r.category === "perso");
const FORGE = REALISATION_BY_SLUG.get("forge")!;
const CASE = REALISATION_BY_SLUG.get("audit-technova")!;

export default function HomePage() {
  const caseDoc = documentsFor(CASE.slug)[0];

  return (
    <SiteLayout>
      {/* Who I am in one sentence, and the facts beside it. */}
      <section className="wrap grid gap-10 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.55fr_1fr] lg:gap-[72px] lg:pb-20 lg:pt-[70px]">
        <h1 className="t-lead">
          Je suis en BTS SIO à Chantilly. J'apprends à développer des applications et à les protéger, et je fais tourner Vody Studio, ma micro-entreprise.
        </h1>
        <div className="lg:pt-2.5">
          <Facts
            rows={[
              { label: "Formation", value: "BTS SIO, option SLAM" },
              { label: "Session", value: "2028" },
              { label: "Avant", value: "Bac pro MSPC, mention Bien" },
              { label: "Studio", value: "Vody Studio, depuis octobre 2026" },
              { label: "En ce moment", value: <Link to="/parcours#stage" viewTransition className="hover:text-blue-text">Je cherche un stage de 1re année</Link>, live: true },
            ]}
          />
        </div>
      </section>

      {/* The index of the work, straight away. */}
      <section className="wrap">
        <SectionHead title="Réalisations" note={`${REALISATIONS.length} fiches, chacune avec son document`} />
        <IndexList items={HOME_SELECTION} />
        <Link to="/realisations" viewTransition className="link-u mt-7 text-[16px]">
          Voir les {REALISATIONS.length} réalisations
        </Link>
      </section>

      {/* The studio, with its real client area. */}
      <section className="wrap mt-24 lg:mt-28">
        <div className="night grid overflow-hidden lg:grid-cols-[400px_1fr]">
          <div className="flex flex-col p-7 sm:p-10 lg:py-12 lg:pl-12 lg:pr-0">
            <VodyBrand />
            <p className="mt-7 text-[17px] leading-[1.6] text-white/80 sm:text-[18px]">
              Ma micro-entreprise, immatriculée en octobre 2026. Des sites, des applications et des outils pour les serveurs FiveM et Discord. Ce que j'apprends en BTS, je l'applique ici sur de vrais projets.
            </p>
            <ul className="mt-7 border-t border-white/15">
              {PROJECTS.map((r) => (
                <li key={r.slug} className="border-b border-white/15">
                  <Link to={`/realisations/${r.slug}`} viewTransition className="flex items-baseline justify-between gap-4 py-3 text-[15.5px] transition-colors hover:text-blue-light">
                    {r.short}
                    <span className="text-right text-[14px] text-white/55">{r.kind}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-auto lg:pt-8">
              <a href={PROFILE.vody} target="_blank" rel="noopener noreferrer" className="link-u text-[16px] text-blue-light hover:text-white">
                vodystudio.fr ↗
              </a>
              <Link to="/vody-studio" viewTransition className="link-u text-[16px] text-white/80 hover:text-white">
                La page du studio
              </Link>
            </div>
          </div>
          <div className="flex items-end pl-7 pt-2 sm:pl-10 lg:pl-10 lg:pt-12">
            <img
              src={withBase("/images/vodystudio-tableau-de-bord.jpg")}
              alt="L'espace client de vodystudio.fr, avec des données de démonstration"
              loading="lazy"
              className="block w-full max-w-none rounded-tl-[14px] border-l border-t border-white/10 lg:w-[860px]"
            />
          </div>
        </div>
      </section>

      {/* One project shown large, with what makes it work. */}
      <section className="wrap mt-24 grid gap-8 lg:mt-28 lg:grid-cols-[1fr_2.1fr] lg:items-end lg:gap-12">
        <div>
          <h2 className="t-sec">Forge, l'éditeur où l'on programme en reliant des blocs</h2>
          <p className="t-body mt-4">{FORGE.solution}</p>
          <Link to={`/realisations/${FORGE.slug}`} viewTransition className="link-u mt-6 text-[16px]">
            La fiche de Forge
          </Link>
        </div>
        {FORGE.cover && <Figure shot={FORGE.cover} />}
      </section>

      {/* One fiche, read as a case study. */}
      <section className="wrap mt-24 lg:mt-28">
        <div className="border-t-[1.5px] border-ink pt-6">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:justify-between lg:gap-10">
            <h2 className="t-sec max-w-[680px]">{CASE.title}</h2>
            <p className="text-[15px] text-soft">Bloc 3, TD individuel, 1er octobre 2026</p>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-0">
            {[
              { title: "Le problème", text: CASE.context },
              { title: "Ce que j'ai fait", text: CASE.contribution },
              { title: "Ce que j'en retiens", text: CASE.bilan },
            ].map((col, i) => (
              <div key={col.title} className={i > 0 ? "md:border-l md:border-rule md:pl-7" : "md:pr-7"}>
                <h3 className="text-[15px] font-bold">{col.title}</h3>
                <p className="t-body mt-2.5 text-[16px]">{col.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link to={`/realisations/${CASE.slug}`} viewTransition className="btn">
              Lire la fiche
            </Link>
            {caseDoc && (
              <a href={caseDoc.url} download={caseDoc.downloadName} className="link-u text-[15px]">
                Télécharger le document ({caseDoc.ext})
              </a>
            )}
          </div>
        </div>
      </section>

      {/* The figures, said in a sentence rather than shown in boxes. */}
      <section className="wrap mt-28 lg:mt-32">
        <p className="max-w-[1060px] text-[clamp(28px,3.6vw,46px)] font-medium leading-[1.22] tracking-[-0.035em]">
          Depuis la rentrée 2026 : <Link to="/realisations" viewTransition className="font-bold text-blue-text hover:underline">{REALISATIONS.length} réalisations</Link> documentées, les{" "}
          <Link to="/competences" viewTransition className="font-bold text-blue-text hover:underline">{COMPETENCES.length} compétences</Link> du tableau E4 couvertes, et{" "}
          <Link to="/vody-studio" viewTransition className="font-bold text-blue-text hover:underline">{PROJECTS.length} projets</Link> en ligne chez Vody Studio.
        </p>
      </section>
    </SiteLayout>
  );
}
