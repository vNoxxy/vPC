import IndexList from "../components/IndexList";
import SiteLayout from "../components/Layout";
import { Figure, SectionHead, VodyBrand } from "../components/ui";
import { PROFILE } from "../data/profile";
import { PROJECTS } from "../data/realisations";
import { DOCUMENTS } from "../lib/documents";
import { withBase } from "../lib/site";

/**
 * From a TP to code in production: where a notion of the courses shows up in my own projects. `doc` is
 * found in the name of the work on the Documents page, which is then offered for download.
 */
const LINKS: { notion: string; tp: string; doc: string; where: string }[] = [
  { notion: "Hachage et sel", tp: "Sécuriser un compte", doc: "Sécuriser un compte", where: "Les mots de passe de vodystudio.fr sont hachés avec bcrypt, jamais stockés en clair." },
  { notion: "MFA", tp: "Authentification sûre", doc: "authentification plus sûre", where: "La double authentification par codes TOTP est proposée sur chaque compte client." },
  { notion: "Limiter les essais", tp: "Authentification sûre", doc: "authentification plus sûre", where: "Les routes de connexion refusent les essais répétés depuis une même adresse." },
  { notion: "Moindre privilège", tp: "Audit TechNova", doc: "Audit de sécurité de TechNova", where: "Les modules des clients de vBot tournent en bac à sable et ne voient que leur propre serveur." },
  { notion: "Vulnérabilité et contexte", tp: "Audit TechNova", doc: "Audit de sécurité de TechNova", where: "L'audit FiveM note la gravité d'un constat selon ce qu'il faut pour l'exploiter." },
  { notion: "Règles d'utilisation, RGPD", tp: "Charte informatique", doc: "La charte informatique", where: "Aucun traceur avant consentement, et des pages légales qui disent ce que le code fait." },
];

export default function VodyPage() {
  return (
    <SiteLayout title="Vody Studio" description="Vody Studio, la micro-entreprise de développement de Timéo Vaast, et ses projets : vodystudio.fr, vBot, Forge, l'audit FiveM.">
      <section className="wrap pt-6 sm:pt-10">
        <div className="night grid overflow-hidden lg:grid-cols-[440px_1fr]">
          <div className="flex flex-col p-7 sm:p-10 lg:py-14 lg:pl-12 lg:pr-0">
            <VodyBrand />
            <h1 className="mt-9 text-[clamp(32px,3.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.04em]">Ma micro-entreprise de développement.</h1>
            <p className="mt-5 text-[17px] leading-[1.6] text-white/80">
              Des sites, des applications et des outils pour les serveurs FiveM et Discord, en service pour de vrais clients. C'est là que j'applique, chaque semaine, ce que j'apprends en BTS.
            </p>
            <dl className="mt-8 border-t border-white/15 text-[15px]">
              {[
                ["Statut", "Timéo Vaast EI, micro-entreprise"],
                ["Immatriculation", "21 octobre 2026"],
                ["Activité", "Programmation informatique (APE 6201Z)"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[116px_1fr] gap-3 border-b border-white/15 py-3 sm:grid-cols-[130px_1fr] sm:gap-4">
                  <dt className="text-white/55">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <a href={PROFILE.vody} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-9 self-start">
              Visiter vodystudio.fr ↗
            </a>
          </div>
          <div className="flex items-end pl-7 pt-2 sm:pl-10 lg:pl-10 lg:pt-14">
            <img
              src={withBase("/images/vodystudio-tableau-de-bord.jpg")}
              alt="L'espace client de vodystudio.fr, avec des données de démonstration"
              className="block w-full max-w-none rounded-tl-[14px] border-l border-t border-white/10 lg:w-[880px]"
            />
          </div>
        </div>
      </section>

      <section className="wrap mt-24">
        <SectionHead title="Les projets" note="Quatre projets en production, une fiche chacun" />
        <IndexList items={PROJECTS} />
      </section>

      <section className="wrap mt-24">
        <Figure shot={{ src: "/images/vodystudio-accueil.jpg", caption: "L'accueil de vodystudio.fr : le site présente les services du studio en quatre langues." }} />
      </section>

      {/* The bridge between the courses and the studio. */}
      <section className="wrap mt-24">
        <SectionHead title="Du TP au code" note="Ce que j'apprends en cours, appliqué dans mes projets" />
        <ul className="rule-rows">
          {LINKS.map((l) => {
            const doc = DOCUMENTS.find((d) => d.name.includes(l.doc));
            return (
              <li key={l.notion} className="grid gap-2 py-5 lg:grid-cols-[230px_220px_1fr] lg:items-baseline lg:gap-8">
                <p className="text-[17px] font-semibold">{l.notion}</p>
                {doc ? (
                  <a href={doc.url} download={doc.downloadName} className="text-[15px] text-soft underline decoration-rule underline-offset-[3px] hover:text-blue-text">
                    TP : {l.tp} ↓
                  </a>
                ) : (
                  <p className="text-[15px] text-soft">TP : {l.tp}</p>
                )}
                <p className="text-[15.5px] leading-relaxed text-[#2f3440]">{l.where}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </SiteLayout>
  );
}
