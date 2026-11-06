import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import SiteLayout from "../components/Layout";
import { DashList, PageHero, Section, SectionHead } from "../components/ui";
import { EDUCATION, EXPERIENCE, INTERESTS, LANGUAGES, PROFILE, type Step } from "../data/profile";
import { accentStyle } from "../lib/accents";

function Timeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="rows">
      {steps.map((s) => (
        <li key={s.title} className="grid gap-3 p-6 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-8 lg:p-7">
          <p className="font-tech text-[11.5px] font-bold uppercase tracking-[0.08em] text-[var(--fg-faint)]">{s.period}</p>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-[15px] font-extrabold uppercase tracking-[0.05em]">{s.title}</h3>
              {s.tag && <span className="tag tag-accent">{s.tag}</span>}
            </div>
            <p className="mt-1 text-[14px] font-semibold text-[var(--accent-text)]">{s.place}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--fg-muted)]">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function ParcoursPage() {
  return (
    <SiteLayout title="Parcours" description="Formation, expériences en entreprise, recherche de stage, langues et centres d'intérêt de Timéo Vaast.">
      <PageHero
        kicker={<p className="kicker kicker-plain">Parcours</p>}
        wordmark="Parcours"
        dimension="Brevet 2023 · Bac pro MSPC 2026 · BTS SIO 2026 — 2028"
        title="De la *maintenance industrielle* au *développement*"
        description={PROFILE.pitch}
        action={
          <Link to="/cv" viewTransition className="btn btn-lg btn-solid">
            <FontAwesomeIcon icon={faFileLines} /> Mon CV
          </Link>
        }
      />

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHead compact kicker="Formation" title="Mes *études*" lede="Deux mentions Bien, puis le BTS SIO pour faire de l'informatique mon métier." />
          <Timeline steps={EDUCATION} />
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHead
            compact
            kicker="Expériences"
            title="Trois stages en *entreprise*"
            lede="Pendant mon bac pro : la maintenance, l'amélioration d'une ligne de production et le travail en équipe, toujours avec les règles de sécurité."
          />
          <Timeline steps={EXPERIENCE} />
        </div>
      </Section>

      {/* The internship search of the first year (the E4 table's "milieu professionnel" rows). */}
      <Section tone="light" id="stage" className="scroll-mt-16" style={accentStyle("cyan")}>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHead
            compact
            kicker="Stage de BTS"
            title="Je cherche mon stage de *première année*"
            lede="Un stage en développement d'applications ou en support informatique, pour découvrir le métier dans une vraie organisation."
          />
          <div className="space-y-4">
            <div className="card p-6 lg:p-7">
              <h3 className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--accent-text)]">Ce que je recherche</h3>
              <DashList
                className="mt-4"
                items={[
                  "Développer ou faire évoluer une application, un site ou un outil interne.",
                  "Ou participer au support : postes de travail, gestion de parc, demandes des utilisateurs.",
                  "Dans une organisation où je peux observer, apprendre et me rendre utile.",
                ]}
              />
            </div>
            <div className="card p-6 lg:p-7">
              <h3 className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--accent-text)]">Ma démarche</h3>
              <DashList
                className="mt-4"
                items={[
                  "Un CV et une lettre de motivation adaptés à chaque entreprise, dont une candidature à l'INERIS, à Verneuil-en-Halatte, dont les activités scientifiques m'intéressent.",
                  "Chaque contact noté dans le tableau de suivi de recherche du lycée : date, entreprise, personne contactée, réponse.",
                  "Une attestation de rendez-vous signée pour chaque entretien en entreprise.",
                ]}
              />
            </div>
            <div className="tone-accent flex flex-col gap-5 rounded-[var(--r-card)] p-6 sm:flex-row sm:items-center sm:justify-between lg:p-7">
              <p className="text-[15.5px] font-semibold leading-relaxed">Vous accueillez des stagiaires en informatique ? Je vous envoie mon CV.</p>
              <Link to="/contact" viewTransition className="btn btn-solid shrink-0">
                Me contacter
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card p-6 lg:p-8">
            <p className="kicker">Langues</p>
            <ul className="mt-7 space-y-5">
              {LANGUAGES.map((l) => (
                <li key={l.name}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[15px] font-bold">{l.name}</span>
                    <span className="font-tech text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--fg-faint)]">{l.level}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--line)]">
                    <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${l.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-7 text-[14px] text-[var(--fg-muted)]">{PROFILE.driving}.</p>
          </div>
          <div className="card p-6 lg:p-8">
            <p className="kicker">Centres d'intérêt</p>
            <ul className="mt-7 space-y-5">
              {INTERESTS.map((i) => (
                <li key={i.name}>
                  <p className="text-[15px] font-bold">{i.name}</p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-[var(--fg-muted)]">{i.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
