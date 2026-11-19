import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, NavLink, Outlet, ScrollRestoration, useLocation } from "react-router";
import { PROFILE } from "../data/profile";
import { NAV } from "../lib/nav";
import { useParisTime } from "../lib/motion";
import CommandPalette, { openPalette } from "./CommandPalette";
import Cursor from "./Cursor";
import { ArrowUpRight, Magnetic } from "./ui";


const isMac = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

/** The monogram: T and V cut from the same stroke. */
function Monogram() {
  return (
    <span aria-hidden className="relative grid h-10 w-10 place-items-center rounded-full border border-[var(--line-strong)] transition-colors duration-500 group-hover:border-accent group-hover:bg-accent">
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h9M8.5 5v8" />
        <path d="M12 10l4 9 4-14" />
      </svg>
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const [pill, setPill] = useState<CSSProperties>({ opacity: 0 });

  // A link followed, or back pressed: the new page shows without the menu over it.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Solid once the page has moved; out of the way while reading down, back as soon as one scrolls up.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 6) setHidden(y > lastY && y > 320);
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The pill behind the nav follows the pointer, and rests on the current page.
  const moveTo = (el: HTMLElement | null) => {
    if (!el) return setPill((p) => ({ ...p, opacity: 0 }));
    setPill({ opacity: 1, width: el.offsetWidth, height: el.offsetHeight, transform: `translate(${el.offsetLeft}px, ${el.offsetTop}px)` });
  };
  const rest = () => moveTo(navRef.current?.querySelector<HTMLElement>("a[aria-current=page]") ?? null);
  useEffect(() => {
    const id = requestAnimationFrame(rest);
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <header
      className={`vt-header no-print fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${hidden && !open ? "-translate-y-full" : ""}`}
    >
      <div
        className={`absolute inset-0 -z-10 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open ? "border-[var(--line)] bg-[rgba(6,7,9,0.72)] backdrop-blur-xl" : "border-transparent"
        }`}
      />
      <div className="wrap flex h-[76px] items-center justify-between gap-6">
        <Link to="/" viewTransition className="group flex items-center gap-3" aria-label="Timéo Vaast, accueil">
          <Monogram />
          <span className="hidden text-[16px] font-semibold tracking-[-0.01em] xs:inline">Timéo Vaast</span>
        </Link>

        <nav ref={navRef} aria-label="Navigation principale" onMouseLeave={rest} className="relative hidden items-center rounded-full border border-[var(--line)] bg-white/[0.02] p-1 lg:flex">
          <span aria-hidden className="tab-pill !bg-white/[0.08]" style={pill} />
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              viewTransition
              onMouseEnter={(e) => moveTo(e.currentTarget)}
              className={({ isActive }) => `relative rounded-full px-4 py-2 text-[14.5px] font-medium transition-colors duration-300 ${isActive ? "text-fg" : "text-soft hover:text-fg"}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={openPalette}
            className="hidden h-10 items-center gap-2 rounded-full border border-[var(--line)] pl-4 pr-2 text-[14px] text-soft transition-colors hover:border-[var(--line-strong)] hover:text-fg md:flex"
            aria-label="Rechercher dans le portfolio"
          >
            Rechercher
            <span className="kbd">{isMac() ? "⌘" : "Ctrl"} K</span>
          </button>
          <Magnetic className="hidden sm:inline-flex">
            <Link to="/contact" viewTransition className="btn btn-sm">
              Me contacter
            </Link>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-[var(--line-strong)] lg:hidden"
          >
            <span className={`absolute h-[1.5px] w-[18px] bg-fg transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-[1.5px] w-[18px] bg-fg transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </div>

      {open && <MobileMenu />}
    </header>
  );
}

function MobileMenu() {
  const time = useParisTime();
  return (
    <nav id="menu" aria-label="Menu" data-anim="fade" className="fixed inset-x-0 bottom-0 top-[76px] flex flex-col overflow-y-auto bg-bg lg:hidden">
      <ul className="wrap flex-1 pt-6">
        {[...NAV, { to: "/contact", label: "Contact", end: false }].map((item, i) => (
          <li key={item.to} className="border-b border-[var(--line)]" data-anim="rise" style={{ "--d": 60 + i * 50 } as CSSProperties}>
            <NavLink to={item.to} end={item.end} viewTransition className={({ isActive }) => `flex items-baseline gap-4 py-4 text-[clamp(32px,9vw,48px)] font-semibold leading-none tracking-[-0.04em] ${isActive ? "text-accent" : ""}`}>
              <span className="num text-[12px] font-medium tracking-normal text-faint">0{i + 1}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="wrap flex flex-wrap items-center justify-between gap-4 py-8 text-[14px] text-soft" data-anim="rise" style={{ "--d": 450 } as CSSProperties}>
        <a href={`mailto:${PROFILE.email}`} className="link-line text-fg">
          {PROFILE.email}
        </a>
        <span className="num text-[12px]">Chantilly · {time}</span>
      </div>
    </nav>
  );
}

function Footer() {
  const [copied, setCopied] = useState(false);
  const time = useParisTime();
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
    <footer className="no-print relative mt-32 overflow-hidden border-t border-[var(--line)] lg:mt-44">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-accent/25 blur-[150px]" />
      <div className="wrap relative pt-20 lg:pt-28">
        <p className="label flex items-center gap-3">
          <i aria-hidden className="live-dot" /> Un stage, un projet, une question
        </p>
        <h2 className="t-mega mt-8">
          Parlons<span className="serif text-accent">-en.</span>
        </h2>
        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <a href={`mailto:${PROFILE.email}`} className="link break-all text-[clamp(22px,3.4vw,40px)] font-medium tracking-[-0.03em]">
            {PROFILE.email}
          </a>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={copy} className="btn btn-ghost btn-sm" aria-live="polite">
              {copied ? "Adresse copiée ✓" : "Copier l'adresse"}
            </button>
            <Magnetic>
              <Link to="/contact" viewTransition className="btn btn-sm">
                Écrire un message
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-[var(--line)] pt-10 text-[15px] sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="label mb-4">Pages</p>
            <ul className="space-y-2">
              {NAV.slice(1).map((item) => (
                <li key={item.to}>
                  <Link to={item.to} viewTransition className="link text-soft hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label mb-4">Ailleurs</p>
            <ul className="space-y-2">
              <li>
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5 text-soft hover:text-fg">
                  GitHub <ArrowUpRight />
                </a>
              </li>
              <li>
                <a href={PROFILE.vody} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5 text-soft hover:text-fg">
                  vodystudio.fr <ArrowUpRight />
                </a>
              </li>
              <li>
                <Link to="/cv" viewTransition className="link text-soft hover:text-fg">
                  CV
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="label mb-4">Lieu</p>
            <p className="text-soft">
              Lycée Jean Rostand
              <br />
              Chantilly, France
              <br />
              <span className="num text-[13px] text-faint">{time} · heure de Paris</span>
            </p>
          </div>
          <div>
            <p className="label mb-4">Ce site</p>
            <p className="text-soft">
              Aucun cookie, aucun traceur.
              <br />
              <Link to="/mentions-legales" viewTransition className="link hover:text-fg">
                Mentions légales
              </Link>
              <br />
              <button type="button" onClick={openPalette} className="link text-left hover:text-fg">
                Navigation rapide <span className="kbd ml-1">{isMac() ? "⌘" : "Ctrl"} K</span>
              </button>
            </p>
          </div>
        </div>

        <div className="mt-16 flex items-end justify-between gap-6 pb-8">
          <p aria-hidden className="select-none font-semibold leading-[0.8] tracking-[-0.06em] bg-gradient-to-b from-white/[0.13] to-white/0 bg-clip-text text-transparent text-[clamp(64px,15vw,230px)]">
            Timéo Vaast
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] py-6 text-[13px] text-faint">
          <span className="num">© 2026 — Portfolio BTS SIO, session 2028</span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="link num hover:text-fg">
            Retour en haut ↑
          </button>
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
    const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    return () => window.clearTimeout(timer);
  }, [hash, pathname]);
}

/** The thin line along the top edge: how far down the page one has read. */
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return <div ref={ref} aria-hidden className="no-print fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-gradient-to-r from-accent to-[var(--accent-soft)]" style={{ transform: "scaleX(0)" }} />;
}

/** The shell around every page: drawn once, so the header, the pointer and the palette survive page changes. */
/** The cards with a `spot` class light up their border where the pointer is: one listener for all. */
function useSpotlight() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".spot");
      if (!card) return;
      const box = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - box.left}px`);
      card.style.setProperty("--my", `${e.clientY - box.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}

export default function Shell() {
  useHashScroll();
  useSpotlight();
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollRestoration />
      <a href="#contenu" className="sr-only z-[80] rounded-full bg-fg px-5 py-3 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Aller au contenu
      </a>
      <ScrollProgress />
      <Header />
      <main id="contenu" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CommandPalette />
      <Cursor />
      <div aria-hidden className="grain no-print" />
    </div>
  );
}
