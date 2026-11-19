import { Fragment, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import FilterTabs from "../components/FilterTabs";
import { ArrowDown, Dot, PageHero } from "../components/ui";
import { CATEGORIES } from "../data/competences";
import { ACCENTS } from "../lib/accents";
import { DOCUMENTS, SECTIONS, sizeLabel, type Doc } from "../lib/documents";
import { usePageMeta } from "../lib/usePageMeta";

/** Lower case and without accents, so "reseau" finds "Réseau". */
const plain = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const EXT_COLOR: Record<string, string> = { PDF: "#ff5a63", DOCX: "#3d95f2", DOC: "#3d95f2", PPTX: "#f0702a", XLSX: "#3dbb7c" };

/** A group named after a bloc ("Bloc 1", "AP") shows the bloc's dot and full name, as everywhere on the site. */
function GroupHeading({ group }: { group: string }) {
  const category = CATEGORIES.find((c) => c.label === group);
  if (!category) return <>{group}</>;
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <Dot color={ACCENTS[category.accent]} glow />
      {category.label}
      <span className="font-normal text-soft">{category.name}</span>
    </span>
  );
}

/**
 * Every course, TP and exercise of the BTS, to download: one line per file. The sections are the
 * folders of public/documents (see lib/documents.ts).
 */
export default function DocumentsPage() {
  usePageMeta("Cours, TP et exercices", "Les cours, les TP et les exercices du BTS SIO de Timéo Vaast, à télécharger.");
  const [params, setParams] = useSearchParams();
  const asked = params.get("dossier");
  const current = SECTIONS.some((s) => s.key === asked) ? asked! : "all";
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const words = plain(query).split(/\s+/).filter(Boolean);
  const matches = (d: Doc) => words.every((w) => plain(`${d.name} ${d.group}`).includes(w));
  const shown = SECTIONS.filter((s) => current === "all" || s.key === current)
    .map((s) => ({ ...s, docs: s.docs.filter(matches) }))
    .filter((s) => s.docs.length);
  const count = shown.reduce((n, s) => n + s.docs.length, 0);

  const options = [{ key: "all", label: "Tout", count: DOCUMENTS.length }, ...SECTIONS.map((s) => ({ key: s.key, label: s.label, count: s.docs.length }))];

  return (
    <>
      <PageHero
        label="Documents"
        title={["Cours, TP", <span className="serif text-accent-soft">et exercices.</span>]}
        lead="Mes TP et exercices rendus, les cours et les énoncés du BTS SIO, et les pièces de ma recherche de stage. Tout se télécharge."
        aside={
          DOCUMENTS.length > 0 && (
            <label className="block">
              <span className="label field-label">Chercher un document</span>
              <span className="relative block">
                <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute left-5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-faint" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="9" cy="9" r="6" />
                  <path d="m14 14 4 4" strokeLinecap="round" />
                </svg>
                <input ref={inputRef} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="GLPI, réseau, phishing…" className="field !h-[60px] !rounded-full !pl-12 text-[17px]" />
              </span>
              <span className="mt-3 block text-[13.5px] text-faint">
                <span className="num text-soft">{count}</span> document{count > 1 ? "s" : ""} affiché{count > 1 ? "s" : ""}
              </span>
            </label>
          )
        }
      />

      <section className="wrap">
        {DOCUMENTS.length === 0 ? (
          <div className="card p-8">
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
            {shown.length === 0 && (
              <p className="t-lead pt-14">
                Aucun document ne correspond à « {query.trim()} ».{" "}
                <button type="button" className="link text-fg" onClick={() => (setQuery(""), inputRef.current?.focus())}>
                  Tout afficher
                </button>
              </p>
            )}
            <div className="space-y-24 pt-16">
              {shown.map((s) => (
                <div key={s.key}>
                  <div className="flex items-baseline justify-between gap-6 border-b border-[var(--line-strong)] pb-5">
                    <h2 className="t-h3">{s.label}</h2>
                    <span className="num text-[13px] text-soft">{String(s.docs.length).padStart(2, "0")} fichiers</span>
                  </div>
                  <ul>
                    {s.docs.map((d, i) => (
                      <Fragment key={d.path}>
                        {d.group && d.group !== s.docs[i - 1]?.group && <li className="pb-3 pt-10 text-[16px] font-semibold first:pt-6">{<GroupHeading group={d.group} />}</li>}
                        <li className="border-b border-[var(--line)]">
                          <a
                            href={d.url}
                            download={d.downloadName}
                            className="row-hover group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-2 py-4 sm:grid-cols-[auto_minmax(0,1fr)_110px_auto] sm:gap-6 sm:px-4 sm:py-5"
                          >
                            <span
                              className="num grid h-10 w-12 place-items-center rounded-lg border text-[10.5px] font-semibold"
                              style={{ color: EXT_COLOR[d.ext] ?? "var(--soft)", borderColor: `color-mix(in srgb, ${EXT_COLOR[d.ext] ?? "#9aa1ad"} 35%, transparent)` }}
                            >
                              {d.ext || "—"}
                            </span>
                            <span className="break-words text-[17px] font-medium leading-snug tracking-[-0.01em] transition-transform duration-500 group-hover:translate-x-1 sm:text-[19px]">{d.name}</span>
                            <span className="num hidden text-right text-[12.5px] text-faint sm:block">{sizeLabel(d.size)}</span>
                            <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line-strong)] transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                              <ArrowDown />
                              <span className="sr-only">Télécharger</span>
                            </span>
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
    </>
  );
}
