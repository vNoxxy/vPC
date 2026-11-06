import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import SiteLayout from "../components/Layout";
import { Monogram, Section } from "../components/ui";
import { EDUCATION, EXPERIENCE, INTERESTS, LANGUAGES, PROFILE, SKILLS } from "../data/profile";

function Heading({ children }: { children: string }) {
  return <h2 className="border-b border-[var(--line-strong)] pb-2 font-tech text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">{children}</h2>;
}

/**
 * The CV as one A4 sheet: read on screen, printed or saved as PDF with the browser (Ctrl+P). Only the
 * e-mail address is on it: the phone number and the street address stay on the CV sent to a company.
 */
export default function CvPage() {
  return (
    <SiteLayout title="CV" description="Le CV de Timéo Vaast, étudiant en BTS SIO option SLAM.">
      <Section tone="dark" className="no-print" innerClassName="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="kicker kicker-plain">Curriculum vitæ</p>
          <p className="mt-4 max-w-[560px] text-[14.5px] text-[var(--fg-muted)]">Pour le garder en PDF : « Imprimer », puis « Enregistrer au format PDF ».</p>
        </div>
        <button type="button" onClick={() => window.print()} className="btn btn-lg btn-solid">
          <FontAwesomeIcon icon={faPrint} /> Imprimer ou enregistrer en PDF
        </button>
      </Section>

      <Section tone="light" className="print-sheet" innerClassName="py-10 sm:py-14">
        <article className="mx-auto max-w-[860px] text-[var(--fg)]">
          <header className="flex flex-col gap-6 border-b border-[var(--line-strong)] pb-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Monogram className="h-14 w-14 text-[18px]" />
              <div>
                <h1 className="font-display text-[30px] font-extrabold uppercase leading-none tracking-[-0.01em]">
                  {PROFILE.firstName} {PROFILE.lastName}
                </h1>
                <p className="mt-2 text-[15px] font-semibold text-[var(--accent-text)]">{PROFILE.title}</p>
              </div>
            </div>
            <ul className="space-y-1 text-[13.5px] text-[var(--fg-muted)] sm:text-right">
              <li>
                <a href={`mailto:${PROFILE.email}`} className="font-semibold text-[var(--fg)]">
                  {PROFILE.email}
                </a>
              </li>
              <li>{PROFILE.driving}</li>
              <li>Portfolio : {typeof window === "undefined" ? "" : window.location.host}</li>
            </ul>
          </header>

          <p className="mt-6 text-[14.5px] leading-relaxed text-[var(--fg-muted)]">
            En première année de BTS SIO au lycée Jean Rostand de Chantilly, je recherche un stage en développement ou en support informatique. Fondateur de Vody Studio, ma micro-entreprise de
            développement.
          </p>

          <div className="mt-8 grid gap-10 sm:grid-cols-[1.45fr_1fr]">
            <div className="space-y-8">
              <section>
                <Heading>Formation</Heading>
                <ul className="mt-4 space-y-4">
                  {EDUCATION.map((e) => (
                    <li key={e.title}>
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-[14.5px] font-extrabold">{e.title}</p>
                        <p className="shrink-0 font-tech text-[11px] font-bold text-[var(--fg-faint)]">{e.period}</p>
                      </div>
                      <p className="text-[13px] font-semibold text-[var(--accent-text)]">
                        {e.place}
                        {e.tag && e.tag !== "En cours" ? ` · ${e.tag}` : ""}
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-[var(--fg-muted)]">{e.text}</p>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <Heading>Expériences</Heading>
                <ul className="mt-4 space-y-4">
                  <li>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-[14.5px] font-extrabold">Vody Studio — fondateur</p>
                      <p className="shrink-0 font-tech text-[11px] font-bold text-[var(--fg-faint)]">Depuis 2026</p>
                    </div>
                    <p className="text-[13px] font-semibold text-[var(--accent-text)]">Micro-entreprise de développement</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-[var(--fg-muted)]">
                      Conception, développement et mise en ligne de vodystudio.fr, d'un bot Discord et d'outils pour serveurs FiveM.
                    </p>
                  </li>
                  {EXPERIENCE.map((e) => (
                    <li key={e.title}>
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-[14.5px] font-extrabold">{e.title}</p>
                        <p className="shrink-0 font-tech text-[11px] font-bold text-[var(--fg-faint)]">{e.period}</p>
                      </div>
                      <p className="text-[13px] font-semibold text-[var(--accent-text)]">{e.place}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-[var(--fg-muted)]">{e.text}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="space-y-8">
              {SKILLS.map((g) => (
                <section key={g.title}>
                  <Heading>{g.title}</Heading>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <li key={s.name} className="tag">
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
              <section>
                <Heading>Qualités</Heading>
                <p className="mt-4 text-[13.5px] text-[var(--fg-muted)]">{PROFILE.qualities.map((q) => q.name).join(" · ")}</p>
              </section>
              <section>
                <Heading>Langues</Heading>
                <ul className="mt-4 space-y-1 text-[13.5px]">
                  {LANGUAGES.map((l) => (
                    <li key={l.name}>
                      <span className="font-bold">{l.name}</span> <span className="text-[var(--fg-muted)]">— {l.level}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <Heading>Centres d'intérêt</Heading>
                <ul className="mt-4 space-y-1 text-[13.5px] text-[var(--fg-muted)]">
                  {INTERESTS.map((i) => (
                    <li key={i.name}>{i.name}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </article>
      </Section>
    </SiteLayout>
  );
}
