import { Link } from "react-router";
import SiteLayout from "../components/Layout";
import SlideDeck, { SLIDE_COUNT } from "../components/SlideDeck";
import { Facts, PageHead, Row, SectionHead } from "../components/ui";
import { AXES, JOURNAL, SOURCES, TOOLS, VEILLE } from "../data/veille";
import { DOCUMENTS } from "../lib/documents";

/** The presentation's PDF, kept with the AP documents. */
const PDF = DOCUMENTS.find((d) => d.ext === "PDF" && d.name.includes("diaporama"));

const STAGES = ["Planifier sa veille", "Sélectionner des ressources", "Collecter l'information", "Analyser l'information", "Diffuser l'information"];

export default function VeillePage() {
  return (
    <SiteLayout title="Veille technologique" description={`La veille technologique de Timéo Vaast en BTS SIO : ${VEILLE.subject}.`}>
      <PageHead
        title={VEILLE.subject}
        lead={VEILLE.question}
        before={<p className="text-[15px] font-semibold">Veille technologique</p>}
        aside={
          <Facts
            rows={[
              { label: "Présentation", value: "En atelier, du 4 au 18 décembre 2026" },
              {
                label: "Méthode",
                value: (
                  <>
                    Apprise en AP,{" "}
                    <Link to="/documents?dossier=mes-tp-et-exercices" viewTransition className="link-u">
                      les exercices
                    </Link>
                  </>
                ),
              },
              { label: "Outil", value: "Feedly et des alertes" },
              { label: "Articles retenus", value: String(JOURNAL.length) },
            ]}
          />
        }
      />

      {/* The presentation itself, as given in AP. */}
      <section className="wrap">
        <SectionHead title="Le diaporama" note={`La présentation en atelier, ${SLIDE_COUNT} diapositives`} />
        <div className="pt-7">
          <SlideDeck pdf={PDF} />
        </div>
      </section>

      <section className="wrap mt-24">
        <SectionHead title="Pourquoi ce sujet" />
        <p className="max-w-[920px] pt-7 text-[clamp(21px,2.3vw,28px)] font-medium leading-[1.35] tracking-[-0.02em]">{VEILLE.why}</p>
        <ol className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-[15px] text-soft">
          {STAGES.map((s, i) => (
            <li key={s}>
              <span className="font-semibold text-ink">{i + 1}.</span> {s}
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap mt-24">
        <SectionHead title="Ce que je suis" note="Quatre angles sur le sujet" />
        <div className="rule-rows">
          {AXES.map((axis) => (
            <Row key={axis.title} label={<span className="text-[17px]">{axis.title}</span>}>
              <p className="t-body">{axis.text}</p>
              <ul className="mt-3 space-y-2 text-[15.5px] leading-relaxed text-soft">
                {axis.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden>–</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Row>
          ))}
        </div>
      </section>

      {/* What I kept from my reading, the newest first. */}
      <section className="wrap mt-24">
        <SectionHead title="Journal de veille" note="Ce que j'ai retenu de chaque article" />
        <ul className="rule-rows">
          {JOURNAL.map((e) => (
            <li key={e.title} className="grid gap-2 py-6 lg:grid-cols-[150px_minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
              <p className="text-[15px] text-soft">{e.date}</p>
              <div>
                <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.015em]">{e.title}</h3>
                <p className="mt-1 text-[14.5px] text-soft">
                  {e.href ? (
                    <a href={e.href} target="_blank" rel="noopener noreferrer" className="underline decoration-rule underline-offset-[3px] hover:text-blue-text">
                      {e.source} ↗
                    </a>
                  ) : (
                    e.source
                  )}
                </p>
              </div>
              <p className="text-[15.5px] leading-relaxed text-[#2f3440]">{e.takeaway}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap mt-24 grid gap-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <SectionHead title="Sources" note="Les sources officielles d'abord" />
          <ul className="rule-rows">
            {SOURCES.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
                  <span>
                    <span className="text-[16.5px] font-semibold group-hover:text-blue-text">{s.name} ↗</span>
                    <span className="mt-1 block text-[14.5px] text-soft">{s.why}</span>
                  </span>
                  <span className="text-[13.5px] text-faint">{s.kind}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHead title="Outils" />
          <ul className="rule-rows">
            {TOOLS.map((t) => (
              <li key={t.name} className="py-4">
                <p className="text-[16.5px] font-semibold">{t.name}</p>
                <p className="mt-1 text-[14.5px] leading-relaxed text-soft">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
