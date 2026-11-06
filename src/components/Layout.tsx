import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBars, faEnvelope, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { PROFILE } from "../data/profile";
import { accentStyle, type AccentKey } from "../lib/accents";
import { usePageMeta } from "../lib/usePageMeta";
import { Monogram, Rich } from "./ui";

export const NAV: { to: string; label: string; hint: string; end?: boolean }[] = [
  { to: "/", label: "Accueil", hint: "Qui je suis, en une page", end: true },
  { to: "/parcours", label: "Parcours", hint: "Formation, expériences, stage et CV" },
  { to: "/realisations", label: "Réalisations", hint: "Une fiche par TP et par projet" },
  { to: "/competences", label: "Compétences", hint: "Le tableau de synthèse E4" },
  { to: "/veille", label: "Veille", hint: "L'IA et la cybersécurité" },
  { to: "/vody-studio", label: "Vody Studio", hint: "Ma micro-entreprise et ses projets" },
];

const linkClass = (isActive: boolean) =>
  `flex h-9 items-center whitespace-nowrap rounded-full px-3 text-[13px] font-semibold ${
    isActive ? "bg-[var(--accent-fill)] text-[var(--accent-on)]" : "text-white/65 hover:bg-white/[0.07] hover:text-white"
  }`;

function Navbar() {
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
    // Three floating groups (the mark, the links, the action) over the page: the header itself is
    // see-through and lets clicks through between them.
    <header className="vt-site-header tone-dark no-print pointer-events-none sticky top-0 z-50 !bg-transparent">
      <div className="mx-auto flex max-w-[1264px] items-center justify-between gap-2 px-2 pt-3 sm:gap-2.5 sm:px-5 [&>*]:pointer-events-auto">
        <Link to="/" viewTransition className="nav-pill flex h-11 shrink-0 items-center gap-2.5 p-1">
          <Monogram />
          <span className="pr-3 font-display text-[13px] font-extrabold uppercase tracking-[0.06em] sm:text-[15px] sm:tracking-[0.1em] lg:hidden xl:block">Timéo Vaast</span>
        </Link>

        <nav aria-label="Navigation principale" className="nav-pill hidden h-11 items-center gap-0.5 p-1 lg:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} viewTransition className={({ isActive }) => linkClass(isActive)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/* The site's one call to action, white like vodystudio.fr's own. */}
          <Link to="/contact" viewTransition className="btn btn-solid hidden lg:inline-flex">
            Me contacter
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="nav-pill flex h-11 w-11 items-center justify-center text-white/75 hover:text-white lg:hidden"
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} />
          </button>
        </div>
      </div>

      {open && (
        <>
          <div className="pointer-events-auto fixed inset-0 -z-10 bg-black/50 lg:hidden" data-anim="fade" onClick={close} aria-hidden />
          <nav
            aria-label="Menu"
            data-anim="menu"
            className="pointer-events-auto mx-2 mt-2 max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-[var(--r-card)] border border-[var(--line-strong)] bg-[var(--bg)] p-2 sm:mx-5 lg:hidden"
          >
            <ul>
              {[...NAV, { to: "/contact", label: "Contact", hint: "M'écrire un e-mail" }].map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={"end" in item ? item.end : false}
                    viewTransition
                    className={({ isActive }) =>
                      `flex items-center justify-between gap-3 rounded-[18px] px-4 py-3 ${isActive ? "bg-[color-mix(in_srgb,var(--accent)_16%,transparent)]" : "hover:bg-white/[0.05]"}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="min-w-0">
                          <span className={`block text-[15px] font-bold ${isActive ? "text-[var(--accent-text)]" : ""}`}>{item.label}</span>
                          <span className="block truncate text-[13px] text-[var(--fg-muted)]">{item.hint}</span>
                        </span>
                        <FontAwesomeIcon icon={faArrowRight} className="shrink-0 text-[12px] text-[var(--fg-faint)]" />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}

const LINK_CLASS = "text-[14px] text-[var(--fg-muted)] hover:text-[var(--fg)]";

function Footer() {
  const columns: { title: string; links: { label: string; to?: string; href?: string }[] }[] = [
    {
      title: "Portfolio",
      links: [
        { label: "Accueil", to: "/" },
        { label: "Parcours", to: "/parcours" },
        { label: "Mon CV", to: "/cv" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      title: "BTS SIO",
      links: [
        { label: "Réalisations", to: "/realisations" },
        { label: "Compétences E4", to: "/competences" },
        { label: "Veille", to: "/veille" },
        { label: "Recherche de stage", to: "/parcours#stage" },
      ],
    },
    {
      title: "Ailleurs",
      links: [
        { label: "vodystudio.fr", href: PROFILE.vody },
        { label: "GitHub", href: PROFILE.github },
        { label: "Vody Studio", to: "/vody-studio" },
      ],
    },
  ];

  return (
    <footer className="tone-dark no-print relative border-t border-[var(--line)]">
      <div className="guides relative">
        {/* Every page ends on the same way forward: writing to me. */}
        <div className="py-16 lg:py-20">
          <div className="tone-accent flex flex-col gap-9 rounded-[var(--r-panel)] p-7 sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:gap-14 lg:p-14">
            <div>
              <p className="kicker">Contact</p>
              <h2 className="h-section mt-6 max-w-[640px]">
                <Rich text="Un stage, un projet, une question ? *Écrivez-moi.*" />
              </h2>
            </div>
            <a href={`mailto:${PROFILE.email}`} className="btn btn-lg btn-solid lg:min-w-[260px]">
              <FontAwesomeIcon icon={faEnvelope} /> M'écrire
            </a>
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-12 border-t border-[var(--line)] py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" viewTransition className="flex items-center gap-3">
              <Monogram className="h-10 w-10" />
              <span className="font-display text-[15px] font-extrabold uppercase tracking-[0.1em]">Timéo Vaast</span>
            </Link>
            <p className="mt-5 max-w-[320px] text-[14px] leading-relaxed text-[var(--fg-muted)]">
              Étudiant en BTS SIO option SLAM au lycée Jean Rostand de Chantilly, et fondateur de Vody Studio.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { label: "E-mail", href: `mailto:${PROFILE.email}`, icon: faEnvelope },
                { label: "GitHub", href: PROFILE.github, icon: faGithub },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  title={s.label}
                  aria-label={s.label}
                  className="lift flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--card)] text-[14px] text-[var(--fg-muted)] hover:border-[var(--fg)] hover:text-[var(--fg)]"
                >
                  <FontAwesomeIcon icon={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-5 font-tech text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--fg-faint)]">{col.title}</p>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to} viewTransition className={LINK_CLASS}>
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* My name as a signature in the page's own color, sized to span the sheet exactly. */}
        <div aria-hidden className="select-none border-t border-[var(--line)] pt-10 [container-type:inline-size]">
          <p className="whitespace-nowrap text-center font-display text-[8.6cqw] font-extrabold uppercase leading-[0.82] tracking-[-0.01em] text-[var(--accent)]">
            Timéo Vaast
          </p>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="font-tech text-[11.5px] text-[var(--fg-faint)]">© {new Date().getFullYear()} Timéo Vaast · Portfolio BTS SIO · Session 2028</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link to="/mentions-legales" viewTransition className="text-[12.5px] text-[var(--fg-faint)] hover:text-[var(--fg)]">
              Mentions légales
            </Link>
            <span className="text-[12.5px] text-[var(--fg-faint)]">Aucun cookie, aucun traceur</span>
          </nav>
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

/**
 * Shell of every page: `title` / `description` for the browser tab, `accent` tints everything below
 * (tags, accent words, buttons, the closing call to action, my name at the foot).
 */
export default function SiteLayout({
  title,
  description,
  accent = "vody",
  children,
}: {
  title?: string;
  description?: string;
  accent?: AccentKey;
  children: ReactNode;
}) {
  usePageMeta(title, description);
  useHashScroll();
  return (
    <div style={accentStyle(accent)} className="site tone-dark flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
