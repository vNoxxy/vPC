import { Reveal } from "../components/Reveal";
import { usePageMeta } from "../lib/usePageMeta";
import { EDUCATION, EXPERIENCE, INTERESTS, LANGUAGES, PROFILE, SKILLS } from "../data/profile";
import { siteAddress } from "../lib/site";

function Heading({ children }: { children: string }) {
  return <h2 className="border-b-[1.5px] border-[#0b0c10] pb-2 text-[13px] font-bold uppercase tracking-[0.08em]">{children}</h2>;
}

/**
 * The CV as one A4 sheet: read on screen, printed or saved as PDF with the browser (Ctrl+P). Only the
 * e-mail address is on it: the phone number and the street address stay on the CV sent to a company.
 */
export default function CvPage() {
  usePageMeta("CV", "Le CV de Timéo Vaast, étudiant en BTS SIO option SLAM.");
  return (
    <>
      <section className="wrap no-print flex flex-col gap-6 pb-12 pt-36 sm:flex-row sm:items-end sm:justify-between sm:pt-44">
        <div data-anim="rise">
          <p className="label mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            Curriculum vitæ
          </p>
          <h1 className="t-display">
            Mon <span className="serif text-accent-soft">CV.</span>
          </h1>
          <p className="mt-5 text-[15.5px] text-soft">Une page A4. Pour la garder en PDF : « Imprimer », puis « Enregistrer au format PDF ».</p>
        </div>
        <button type="button" onClick={() => window.print()} className="btn" data-anim="rise">
          Imprimer ou enregistrer en PDF
        </button>
      </section>

      <section className="wrap">
        <Reveal variant="scale">
        <article className="print-cv mx-auto max-w-[900px] rounded-[20px] bg-white p-6 text-[#0b0c10] shadow-[0_60px_160px_-40px_rgba(61,149,242,0.35)] sm:p-12 print:rounded-none print:p-0 print:shadow-none [&_.text-soft]:text-[#5b616d]">
          <header className="flex flex-col gap-5 border-b-[1.5px] border-[#0b0c10] pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[40px] font-semibold leading-none tracking-[-0.04em]">
                {PROFILE.firstName} {PROFILE.lastName}
              </h2>
              <p className="mt-2 text-[17px] font-medium text-soft">{PROFILE.title}</p>
            </div>
            <ul className="space-y-1 text-[14px] text-soft sm:text-right">
              <li>
                <a href={`mailto:${PROFILE.email}`} className="font-semibold text-[#0b0c10]">
                  {PROFILE.email}
                </a>
              </li>
              <li>{PROFILE.driving}</li>
              <li>Portfolio : {siteAddress()}</li>
            </ul>
          </header>

          <p className="mt-6 text-[15px] leading-relaxed text-[#2f3440]">
            En première année de BTS SIO au lycée Jean Rostand de Chantilly, je cherche un stage en développement ou en support informatique. Fondateur de Vody Studio, ma micro-entreprise
            de développement.
          </p>

          <div className="mt-8 grid gap-10 sm:grid-cols-[1.45fr_1fr]">
            <div className="space-y-8">
              <section>
                <Heading>Formation</Heading>
                <ul className="mt-4 space-y-4">
                  {EDUCATION.map((e) => (
                    <li key={e.title}>
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-[15px] font-bold">{e.title}</p>
                        <p className="shrink-0 text-[13px] text-soft">{e.period}</p>
                      </div>
                      <p className="text-[13.5px] font-semibold text-[#1d6cbe]">
                        {e.place}
                        {e.tag && e.tag !== "En cours" ? `, ${e.tag.toLowerCase()}` : ""}
                      </p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-soft">{e.text}</p>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <Heading>Expériences</Heading>
                <ul className="mt-4 space-y-4">
                  <li>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-[15px] font-bold">Vody Studio, fondateur</p>
                      <p className="shrink-0 text-[13px] text-soft">Depuis 2026</p>
                    </div>
                    <p className="text-[13.5px] font-semibold text-[#1d6cbe]">Micro-entreprise de développement</p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-soft">
                      Conception, développement et mise en ligne de vodystudio.fr, d'un bot Discord et d'outils pour serveurs FiveM.
                    </p>
                  </li>
                  {EXPERIENCE.map((e) => (
                    <li key={e.title}>
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-[15px] font-bold">{e.title}</p>
                        <p className="shrink-0 text-[13px] text-soft">{e.period}</p>
                      </div>
                      <p className="text-[13.5px] font-semibold text-[#1d6cbe]">{e.place}</p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-soft">{e.text}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="space-y-8">
              {SKILLS.map((g) => (
                <section key={g.title}>
                  <Heading>{g.title}</Heading>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-[#2f3440]">{g.items.map((s) => s.name).join(", ")}</p>
                </section>
              ))}
              <section>
                <Heading>Qualités</Heading>
                <p className="mt-3 text-[13.5px] text-[#2f3440]">{PROFILE.qualities.map((q) => q.name).join(", ")}</p>
              </section>
              <section>
                <Heading>Langues</Heading>
                <ul className="mt-3 space-y-1 text-[13.5px]">
                  {LANGUAGES.map((l) => (
                    <li key={l.name}>
                      <span className="font-bold">{l.name}</span> <span className="text-soft">: {l.level.toLowerCase()}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <Heading>Centres d'intérêt</Heading>
                <p className="mt-3 text-[13.5px] text-[#2f3440]">{INTERESTS.map((i) => i.name).join(", ")}</p>
              </section>
            </div>
          </div>
        </article>
        </Reveal>
      </section>
    </>
  );
}
