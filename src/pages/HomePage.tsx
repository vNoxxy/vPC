import { Link } from "react-router";
import IndexList from "../components/IndexList";
import SiteLayout from "../components/Layout";
import { Facts, Figure, SectionHead, VodyBrand } from "../components/ui";
import { COMPETENCES } from "../data/competences";
import { PROFILE } from "../data/profile";
import { PROJECTS, PROJECT_BY_SLUG } from "../data/realisations";
import { DOCUMENTS, SECTIONS } from "../lib/documents";
import { withBase } from "../lib/site";

const FORGE = PROJECT_BY_SLUG.get("forge")!;

export default function HomePage() {
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

      {/* The BTS work, straight away: a line per section of the Documents page. */}
      <section className="wrap">
        <SectionHead title="Cours, TP et exercices" note={`${DOCUMENTS.length} documents à télécharger`} />
        <ul>
          {SECTIONS.map((s) => (
            <li key={s.key} className="border-b border-rule">
              <Link
                to={`/documents?dossier=${s.key}`}
                viewTransition
                className="index-row -mx-3 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-5 px-3 py-4 sm:-mx-[18px] sm:px-[18px] sm:py-5"
              >
                <span className="text-[25px] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[30px] lg:text-[34px]">{s.label}</span>
                <span className="index-soft whitespace-nowrap text-[14.5px] text-soft lg:text-[15px]">
                  {s.docs.length} document{s.docs.length > 1 ? "s" : ""} <span className="index-arrow">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* The projects, with their screenshot under the pointer. */}
      <section className="wrap mt-24 lg:mt-28">
        <SectionHead title="Projets" note="Chez Vody Studio, en production" />
        <IndexList items={PROJECTS} />
      </section>

      {/* The studio, with its real client area. */}
      <section className="wrap mt-24 lg:mt-28">
        <div className="night grid overflow-hidden lg:grid-cols-[400px_1fr]">
          <div className="flex flex-col p-7 sm:p-10 lg:py-12 lg:pl-12 lg:pr-0">
            <VodyBrand />
            <p className="mt-7 text-[17px] leading-[1.6] text-white/80 sm:text-[18px]">
              Ma micro-entreprise, immatriculée en octobre 2026. Des sites, des applications et des outils pour les serveurs FiveM et Discord. Ce que j'apprends en BTS, je l'applique ici sur de vrais projets.
            </p>
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
          <Link to={`/vody-studio/${FORGE.slug}`} viewTransition className="link-u mt-6 text-[16px]">
            Le projet Forge
          </Link>
        </div>
        {FORGE.cover && <Figure shot={FORGE.cover} />}
      </section>

      {/* The figures, said in a sentence rather than shown in boxes. */}
      <section className="wrap mt-28 lg:mt-32">
        <p className="max-w-[1060px] text-[clamp(28px,3.6vw,46px)] font-medium leading-[1.22] tracking-[-0.035em]">
          Depuis la rentrée 2026 :{" "}
          <Link to="/documents" viewTransition className="font-bold text-blue-text hover:underline">
            {DOCUMENTS.length} documents
          </Link>{" "}
          de cours et de TP à télécharger, les{" "}
          <Link to="/competences" viewTransition className="font-bold text-blue-text hover:underline">{COMPETENCES.length} compétences</Link> du tableau E4 couvertes, et{" "}
          <Link to="/vody-studio" viewTransition className="font-bold text-blue-text hover:underline">{PROJECTS.length} projets</Link> en ligne chez Vody Studio.
        </p>
      </section>
    </SiteLayout>
  );
}
