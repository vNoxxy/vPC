import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import SiteLayout from "../components/Layout";
import RealisationCard from "../components/RealisationCard";
import { DashList, PageHero, Section, SectionHead } from "../components/ui";
import { PROFILE } from "../data/profile";
import { REALISATIONS } from "../data/realisations";

const PROJECTS = REALISATIONS.filter((r) => r.category === "perso");

/** From a TP to code in production: where a Bloc 3 notion shows up in my own projects. */
const LINKS: { notion: string; tp: { label: string; slug: string }; where: string }[] = [
  { notion: "Hachage et sel", tp: { label: "Sécuriser un compte", slug: "securiser-un-compte" }, where: "Les mots de passe de vodystudio.fr sont hachés avec bcrypt, jamais stockés en clair." },
  { notion: "MFA", tp: { label: "Authentification plus sûre", slug: "authentification-sure" }, where: "La double authentification par codes TOTP est proposée sur chaque compte client." },
  { notion: "Limitation des tentatives", tp: { label: "Authentification plus sûre", slug: "authentification-sure" }, where: "Les routes de connexion refusent les essais répétés depuis une même adresse." },
  { notion: "Moindre privilège", tp: { label: "Audit TechNova", slug: "audit-technova" }, where: "Les modules des clients de vBot tournent en bac à sable et ne voient que leur propre serveur." },
  { notion: "Vulnérabilité et contexte", tp: { label: "Audit TechNova", slug: "audit-technova" }, where: "L'audit FiveM note la gravité d'un constat selon ce qu'il faut pour l'exploiter." },
  { notion: "Règles d'utilisation, RGPD", tp: { label: "Charte informatique", slug: "charte-informatique" }, where: "Aucun traceur avant consentement sur vodystudio.fr, et des pages légales qui disent ce que le code fait." },
];

export default function VodyPage() {
  return (
    <SiteLayout title="Vody Studio" description="Vody Studio, la micro-entreprise de développement de Timéo Vaast, et ses projets : vodystudio.fr, vBot, Forge, l'audit FiveM.">
      <PageHero
        kicker={<p className="kicker kicker-plain">Réalisations personnelles</p>}
        wordmark="Vody Studio"
        dimension="Timéo Vaast EI · Immatriculée le 21/10/2026 · APE 6201Z"
        title="Ma *micro-entreprise* : des projets en production, pour de vrais clients"
        description="Sites web, applications et outils pour les serveurs FiveM et Discord. C'est là que je mets en pratique, chaque semaine, ce que j'apprends en BTS."
        action={
          <a href={PROFILE.vody} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-solid">
            vodystudio.fr <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        }
      />

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead compact kicker="L'entreprise" title="Pourquoi *créer* mon studio" />
          <div className="space-y-6">
            <p className="text-[clamp(18px,1.8vw,22px)] font-semibold leading-[1.45] tracking-[-0.015em]">
              Je codais déjà pour des serveurs de jeu et des communautés Discord. En octobre 2026, j'ai déclaré ma micro-entreprise pour le faire dans les règles : devis, factures, conditions de vente, et
              des clients qui comptent sur ce que je livre.
            </p>
            <DashList
              items={[
                "Entreprise individuelle, au régime de la micro-entreprise (franchise en base de TVA).",
                "Activité : programmation informatique (code APE 6201Z).",
                "Ce que le studio fait : sites et applications web, bots Discord, scripts et outils pour FiveM, audits de sécurité.",
                "Ce que j'y apprends en plus du BTS : le droit de la consommation, le RGPD, la relation client, la mise en production.",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <SectionHead kicker="Les projets" title="Quatre projets, une *fiche* chacun" lede="Comme les TP : le contexte, ma contribution, la difficulté, sa solution, les compétences et les preuves." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {PROJECTS.map((r, i) => (
            <li key={r.slug}>
              <RealisationCard r={r} tone="dark" index={i} />
            </li>
          ))}
        </ul>
      </Section>

      {/* The bridge between the courses and the studio. */}
      <Section tone="light">
        <SectionHead kicker="Du TP au code" title="Ce que j'apprends en cours, *appliqué* dans mes projets" />
        <ul className="rows mt-12">
          {LINKS.map((l) => (
            <li key={l.notion} className="grid gap-3 p-6 lg:grid-cols-[220px_200px_minmax(0,1fr)] lg:items-center lg:gap-8">
              <p className="text-[14px] font-extrabold uppercase tracking-[0.06em] text-[var(--accent-text)]">{l.notion}</p>
              <Link to={`/realisations/${l.tp.slug}`} viewTransition className="link text-[13.5px]">
                TP : {l.tp.label}
              </Link>
              <p className="text-[15px] leading-relaxed text-[var(--fg-muted)]">{l.where}</p>
            </li>
          ))}
        </ul>
      </Section>
    </SiteLayout>
  );
}
