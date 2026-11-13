import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { PROFILE } from "../data/profile";
import { usePageMeta } from "../lib/usePageMeta";

export const NAV: { to: string; label: string; end?: boolean }[] = [
  { to: "/", label: "Accueil", end: true },
  { to: "/parcours", label: "Parcours" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/competences", label: "Compétences" },
  { to: "/veille", label: "Veille" },
  { to: "/vody-studio", label: "Vody Studio" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const { pathname } = useLocation();

  // A link followed, or back pressed: the new page shows without the menu over it.
  useEffect(close, [pathname, close]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <header className="vt-header no-print sticky top-0 z-40 bg-paper">
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <Link to="/" viewTransition className="text-[17px] font-bold tracking-[-0.01em]">
          Timéo Vaast
        </Link>
        <nav aria-label="Navigation principale" className="hidden gap-7 text-[15px] font-medium lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              viewTransition
              className={({ isActive }) => (isActive ? "font-semibold text-ink" : "text-soft transition-colors hover:text-ink")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <Link to="/contact" viewTransition className="link-u hidden text-[15px] sm:inline-flex">
            Me contacter
          </Link>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="link-u text-[15px] lg:hidden">
            {open ? "Fermer" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Menu" data-anim="fade" className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-paper lg:hidden">
          <ul className="wrap pb-10 pt-2">
            {[...NAV, { to: "/contact", label: "Contact", end: false }].map((item) => (
              <li key={item.to} className="border-b border-rule">
                <NavLink
                  to={item.to}
                  end={item.end}
                  viewTransition
                  className={({ isActive }) => `block py-4 text-[28px] font-semibold tracking-[-0.03em] ${isActive ? "text-blue-text" : ""}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // No clipboard (an old browser, a page not served over HTTPS): the address stays readable.
    }
  };

  return (
    <footer className="no-print mt-24 lg:mt-32">
      <div className="wrap">
        <div className="border-t-[1.5px] border-ink pb-12 pt-10 lg:pb-16">
          <p className="text-[15px] text-soft">Un stage, un projet, une question</p>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <a href={`mailto:${PROFILE.email}`} className="break-all text-[clamp(30px,5.4vw,60px)] font-semibold leading-[1.1] tracking-[-0.04em] transition-colors hover:text-blue-text">
              {PROFILE.email}
            </a>
            <button type="button" onClick={copy} className="link-u text-[15px]" aria-live="polite">
              {copied ? "Adresse copiée" : "Copier l'adresse"}
            </button>
          </div>
          <div className="mt-14 flex flex-col gap-6 text-[14.5px] text-soft lg:flex-row lg:items-center lg:justify-between">
            <nav aria-label="Pied de page" className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV.slice(1).map((item) => (
                <Link key={item.to} to={item.to} viewTransition className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              ))}
              <Link to="/cv" viewTransition className="transition-colors hover:text-ink">
                CV
              </Link>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                GitHub ↗
              </a>
            </nav>
            <p className="flex flex-wrap gap-x-6 gap-y-2">
              <span>Portfolio BTS SIO, session 2028</span>
              <Link to="/mentions-legales" viewTransition className="transition-colors hover:text-ink">
                Mentions légales
              </Link>
              <span>Aucun cookie</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** A link to `/page#section` lands on that section once the page is drawn (the router alone stays at the top). */
function useHashScroll() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
    return () => cancelAnimationFrame(frame);
  }, [hash, pathname]);
}

/** Shell of every page: `title` / `description` for the browser tab. */
export default function SiteLayout({ title, description, children }: { title?: string; description?: string; children: ReactNode }) {
  usePageMeta(title, description);
  useHashScroll();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
