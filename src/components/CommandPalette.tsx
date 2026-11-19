import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router";
import { PROFILE } from "../data/profile";
import { PROJECTS } from "../data/realisations";
import { DOCUMENTS } from "../lib/documents";
import { NAV } from "../lib/nav";

/** Anything can open the palette: the header's button, the footer's, or ⌘K / Ctrl+K anywhere. */
const EVENT = "palette:open";
export const openPalette = () => window.dispatchEvent(new Event(EVENT));

interface Item {
  id: string;
  group: string;
  label: string;
  hint?: string;
  keywords?: string;
  run: () => void;
}

/** Lower case and without accents, so "reseau" finds "Réseau". */
const plain = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/**
 * A developer's way around the portfolio: a search box over the pages, the projects, the documents to
 * download and a few actions, driven from the keyboard (↑ ↓ to choose, Entrée to go, Échap to close).
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const show = () => setOpen(true);
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener(EVENT, show);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(EVENT, show);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const previous = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => inputRef.current?.focus());
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const go = (to: string) => () => navigate(to, { viewTransition: true });
    const flash = (text: string) => {
      setToast(text);
      window.setTimeout(() => setToast(""), 1600);
    };
    return [
      ...NAV.map((n) => ({ id: `nav${n.to}`, group: "Pages", label: n.label, hint: n.to, run: go(n.to) })),
      { id: "nav/contact", group: "Pages", label: "Contact", hint: "/contact", run: go("/contact") },
      { id: "nav/cv", group: "Pages", label: "CV", hint: "/cv", keywords: "curriculum", run: go("/cv") },
      ...PROJECTS.map((p) => ({ id: `p-${p.slug}`, group: "Projets", label: p.short, hint: p.kind, keywords: `${p.title} ${p.tools.join(" ")}`, run: go(`/vody-studio/${p.slug}`) })),
      {
        id: "copy",
        group: "Actions",
        label: "Copier mon adresse e-mail",
        hint: PROFILE.email,
        keywords: "mail contact",
        run: () => {
          void navigator.clipboard?.writeText(PROFILE.email).then(() => flash("Adresse copiée"));
        },
      },
      { id: "mail", group: "Actions", label: "Écrire un e-mail", hint: "mailto", run: () => (window.location.href = `mailto:${PROFILE.email}`) },
      { id: "gh", group: "Actions", label: "Ouvrir GitHub", hint: "github.com/vnoxxy", run: () => window.open(PROFILE.github, "_blank", "noopener") },
      { id: "vody", group: "Actions", label: "Visiter vodystudio.fr", hint: "↗", run: () => window.open(PROFILE.vody, "_blank", "noopener") },
      ...DOCUMENTS.map((d) => ({
        id: `d-${d.path}`,
        group: "Documents",
        label: d.name,
        hint: `${d.ext}${d.group ? ` · ${d.group}` : ""}`,
        run: () => {
          const a = document.createElement("a");
          a.href = d.url;
          a.download = d.downloadName;
          a.click();
        },
      })),
    ];
  }, [navigate]);

  const words = plain(query).split(/\s+/).filter(Boolean);
  const results = items
    .filter((item) => (words.length ? words.every((w) => plain(`${item.label} ${item.hint ?? ""} ${item.keywords ?? ""} ${item.group}`).includes(w)) : item.group !== "Documents"))
    .slice(0, 40);

  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const choose = (item: Item | undefined) => {
    if (!item) return;
    setOpen(false);
    item.run();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <>
      {toast && (
        <div role="status" data-anim="rise" className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-fg px-5 py-3 text-[14px] font-semibold text-bg shadow-2xl">
          {toast} ✓
        </div>
      )}
      {open && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Navigation rapide">
          <button type="button" aria-label="Fermer" tabIndex={-1} onClick={() => setOpen(false)} data-anim="fade" className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm" />
          <div data-anim="rise" className="relative w-full max-w-[640px] overflow-hidden rounded-[20px] border border-[var(--line-strong)] bg-[#0d0f13]/95 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(61,149,242,0.08)] backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-[var(--line)] px-5">
              <span aria-hidden className="num text-[15px] text-accent">
                ›
              </span>
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Une page, un projet, un TP…"
                className="h-[60px] w-full bg-transparent text-[17px] text-fg outline-none placeholder:text-faint focus-visible:outline-none"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[active] ? `pal-${active}` : undefined}
              />
              <span className="kbd">Échap</span>
            </div>
            <ul ref={listRef} id="palette-list" role="listbox" className="max-h-[min(440px,56vh)] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-4 py-10 text-center text-[15px] text-soft">Rien ne correspond à « {query} ».</li>}
              {results.map((item, i) => (
                <li key={item.id} role="presentation">
                  {(i === 0 || results[i - 1].group !== item.group) && <p className="label px-3 pb-1.5 pt-3 !text-[10.5px] text-faint">{item.group}</p>}
                  <button
                    type="button"
                    id={`pal-${i}`}
                    role="option"
                    aria-selected={i === active}
                    data-index={i}
                    onMouseMove={() => setActive(i)}
                    onClick={() => choose(item)}
                    className={`flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-left text-[15px] transition-colors ${i === active ? "bg-white/[0.07] text-fg" : "text-[#c3c8d1]"}`}
                  >
                    <span className="truncate">{item.label}</span>
                    <span className="num shrink-0 truncate text-[12px] text-faint">{item.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 border-t border-[var(--line)] px-5 py-3 text-[12px] text-faint">
              <span>
                <span className="kbd">↑</span> <span className="kbd">↓</span> choisir
              </span>
              <span>
                <span className="kbd">↵</span> ouvrir
              </span>
              <span className="ml-auto num">{DOCUMENTS.length} documents indexés</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
