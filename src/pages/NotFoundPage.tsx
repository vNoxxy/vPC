import type React from "react";
import { Link } from "react-router";
import NetworkField from "../components/NetworkField";
import { ArrowRight } from "../components/ui";
import { openPalette } from "../components/CommandPalette";
import { usePageMeta } from "../lib/usePageMeta";

export default function NotFoundPage() {
  usePageMeta("Page introuvable");
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden pt-28">
      <NetworkField className="absolute inset-0 opacity-70" density={0.7} />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_10%,var(--bg)_80%)]" />
      <div className="wrap intro relative text-center">
        <p className="label text-[#ff5a63]">Erreur 404 · paquet perdu</p>
        <h1 className="mt-6 font-semibold leading-[0.85] tracking-[-0.06em] text-[clamp(110px,24vw,340px)]" style={{ "--d": 100 } as React.CSSProperties}>
          4<span className="serif text-accent">0</span>4
        </h1>
        <p className="t-lead mx-auto mt-6 max-w-[520px]" style={{ "--d": 250 } as React.CSSProperties}>
          Cette page n'existe pas. Le lien est peut-être ancien, ou la page a changé d'adresse.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3" style={{ "--d": 350 } as React.CSSProperties}>
          <Link to="/" viewTransition className="btn">
            Retour à l'accueil <ArrowRight />
          </Link>
          <button type="button" onClick={openPalette} className="btn btn-ghost">
            Chercher une page
          </button>
        </div>
      </div>
    </section>
  );
}
