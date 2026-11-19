import { Fragment, useState } from "react";
import { useSearchParams } from "react-router";
import FilterTabs from "../components/FilterTabs";
import SiteLayout from "../components/Layout";
import { Dot, PageHead, SectionHead } from "../components/ui";
import { CATEGORIES } from "../data/competences";
import { ACCENTS } from "../lib/accents";
import { DOCUMENTS, SECTIONS, sizeLabel, type Doc } from "../lib/documents";

/** Lower case and without accents, so "reseau" finds "Réseau". */
const plain = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/** A group named after a bloc ("Bloc 1", "AP") shows the bloc's dot and full name, as everywhere on the site. */
function GroupHeading({ group }: { group: string }) {
  const category = CATEGORIES.find((c) => c.label === group);
  if (!category) return <>{group}</>;
  return (
    <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
      <Dot color={ACCENTS[category.accent]} />
      {category.label}
      <span className="font-medium text-soft">{category.name}</span>
    </span>
  );
}

/**
 * Every course, TP and exercise of the BTS, to download: one line per file, nothing more. The sections
 * are the folders of public/documents (see lib/documents.ts).
 */
export default function DocumentsPage() {
  const [params, setParams] = useSearchParams();
  const asked = params.get("dossier");
  const current = SECTIONS.some((s) => s.key === asked) ? asked! : "all";
  const [query, setQuery] = useState("");

  const words = plain(query).split(/\s+/).filter(Boolean);
  const matches = (d: Doc) => words.every((w) => plain(`${d.name} ${d.group}`).includes(w));
  const shown = SECTIONS.filter((s) => current === "all" || s.key === current)
    .map((s) => ({ ...s, docs: s.docs.filter(matches) }))
    .filter((s) => s.docs.length);

  const options = [{ key: "all", label: "Tout", count: DOCUMENTS.length }, ...SECTIONS.map((s) => ({ key: s.key, label: s.label, count: s.docs.length }))];

  return (
    <SiteLayout title="Cours, TP et exercices" description="Les cours, les TP et les exercices du BTS SIO de Timéo Vaast, à télécharger.">
      <PageHead
        title="Cours, TP et exercices"
        lead="Mes TP et exercices, les cours et les énoncés du BTS SIO, à télécharger."
        aside={
          DOCUMENTS.length > 0 && (
            <label className="block border-t-[1.5px] border-ink pt-4">
              <span className="field-label">Chercher un document</span>
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="GLPI, réseau, phishing…" className="field" />
            </label>
          )
        }
      />

      <section className="wrap">
        {DOCUMENTS.length === 0 ? (
          <div className="border-t-[1.5px] border-ink py-6">
            <p className="t-body">Les documents arrivent bientôt.</p>
            {import.meta.env.DEV && (
              <p className="mt-3 text-[14px] text-soft">
                Pour toi seul, en local : dépose les fichiers dans <code className="code-inline">public/documents</code>, un dossier par section.
              </p>
            )}
          </div>
        ) : (
          <>
            {SECTIONS.length > 1 && (
              <FilterTabs
                label="Choisir une section"
                options={options}
                value={current}
                onChange={(key) => setParams(key === "all" ? {} : { dossier: key }, { replace: true, preventScrollReset: true })}
              />
            )}
            {shown.length === 0 && <p className="t-body pt-8">Aucun document ne correspond à « {query.trim()} ».</p>}
            <div className="space-y-16 pt-10">
              {shown.map((s) => (
                <div key={s.key}>
                  <SectionHead title={s.label} note={`${s.docs.length} document${s.docs.length > 1 ? "s" : ""}`} />
                  <ul>
                    {s.docs.map((d, i) => (
                      <Fragment key={d.path}>
                        {d.group && d.group !== s.docs[i - 1]?.group && (
                          <li className="pb-2 pt-9 text-[15px] font-bold first:pt-4">
                            <GroupHeading group={d.group} />
                          </li>
                        )}
                        <li className="border-b border-rule">
                          <a
                            href={d.url}
                            download={d.downloadName}
                            className="index-row -mx-3 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-5 px-3 py-3.5 sm:-mx-[18px] sm:grid-cols-[minmax(0,1fr)_130px_auto] sm:px-[18px] sm:py-4"
                          >
                            <span className="break-words text-[17px] font-semibold leading-snug tracking-[-0.015em] sm:text-[19px]">{d.name}</span>
                            <span className="index-soft whitespace-nowrap text-[13.5px] text-soft sm:text-[14.5px]">
                              {[d.ext, sizeLabel(d.size)].filter(Boolean).join(", ")}
                              <span aria-hidden className="ml-2 sm:hidden">
                                ↓
                              </span>
                            </span>
                            <span className="hidden whitespace-nowrap text-[14.5px] font-semibold sm:inline">Télécharger ↓</span>
                          </a>
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </SiteLayout>
  );
}
