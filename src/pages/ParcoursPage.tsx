import { Link } from "react-router";
import SiteLayout from "../components/Layout";
import { Facts, PageHead, SectionHead } from "../components/ui";
import { EDUCATION, EXPERIENCE, INTERESTS, LANGUAGES, PROFILE, type Step } from "../data/profile";

function Steps({ steps }: { steps: Step[] }) {
  return (
    <ul className="rule-rows">
      {steps.map((s) => (
        <li key={s.title} className="grid gap-2 py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
          <p className="text-[15px] text-soft">{s.period}</p>
          <div>
            <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.02em]">{s.title}</h3>
            <p className="mt-1 text-[15px] font-semibold text-soft">
              {s.place}
              {s.tag && <span className="font-medium">, {s.tag.toLowerCase()}</span>}
            </p>
            <p className="t-body mt-3 max-w-[720px]">{s.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function ParcoursPage() {
  return (
    <SiteLayout title="Parcours" description="Formation, expériences en entreprise, recherche de stage, langues et centres d'intérêt de Timéo Vaast.">
      <PageHead
        title="Parcours"
        lead={PROFILE.pitch}
        actions={
          <Link to="/cv" viewTransition className="btn">
            Voir mon CV
          </Link>
        }
        aside={
          <Facts
            rows={[
              { label: "Aujourd'hui", value: "BTS SIO, option SLAM" },
              { label: "Avant", value: "Bac pro MSPC, mention Bien" },
              { label: "Entreprise", value: "Vody Studio, depuis 2026" },
              { label: "Permis", value: PROFILE.driving },
            ]}
          />
        }
      />

      <section className="wrap">
        <SectionHead title="Formation" note="Deux mentions Bien, puis le BTS SIO" />
        <Steps steps={EDUCATION} />
      </section>

      <section className="wrap mt-24">
        <SectionHead title="Expériences" note="Trois stages en entreprise pendant le bac pro" />
        <Steps steps={EXPERIENCE} />
      </section>

      {/* The internship search of the first year (the E4 table's "milieu professionnel" rows). */}
      <section className="wrap mt-24">
        <SectionHead id="stage" title="Stage de première année" note="Recherche en cours" />
        <div className="grid gap-10 pt-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <p className="text-[clamp(22px,2.4vw,30px)] font-medium leading-[1.3] tracking-[-0.025em]">
            Je cherche un stage en développement d'applications ou en support informatique, pour découvrir le métier dans une vraie organisation.
          </p>
          <div className="space-y-8">
            <div>
              <h3 className="text-[15px] font-bold">Ce que je recherche</h3>
              <ul className="rule-rows mt-3 border-t border-rule text-[15.5px] leading-relaxed text-[#2f3440]">
                <li className="py-3">Développer ou faire évoluer une application, un site ou un outil interne.</li>
                <li className="py-3">Ou participer au support : postes de travail, gestion de parc, demandes des utilisateurs.</li>
                <li className="py-3">Dans une organisation où je peux observer, apprendre et me rendre utile.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[15px] font-bold">Ma démarche</h3>
              <ul className="rule-rows mt-3 border-t border-rule text-[15.5px] leading-relaxed text-[#2f3440]">
                <li className="py-3">
                  Un CV et une lettre adaptés à chaque entreprise, dont une candidature à l'INERIS, à Verneuil-en-Halatte, dont les activités scientifiques m'intéressent.
                </li>
                <li className="py-3">Chaque contact noté dans le tableau de suivi de recherche du lycée : date, entreprise, personne contactée, réponse.</li>
                <li className="py-3">Une attestation de rendez-vous signée pour chaque entretien en entreprise.</li>
              </ul>
            </div>
            <Link to="/contact" viewTransition className="btn">
              Proposer un stage
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap mt-24 grid gap-16 lg:grid-cols-2">
        <div>
          <SectionHead title="Langues" />
          <ul className="rule-rows">
            {LANGUAGES.map((l) => (
              <li key={l.name} className="flex items-baseline justify-between gap-4 py-4">
                <span className="text-[17px] font-semibold">{l.name}</span>
                <span className="text-[15px] text-soft">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHead title="Centres d'intérêt" />
          <ul className="rule-rows">
            {INTERESTS.map((i) => (
              <li key={i.name} className="py-4">
                <p className="text-[17px] font-semibold">{i.name}</p>
                <p className="mt-1 text-[15px] text-soft">{i.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
