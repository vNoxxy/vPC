import { Link } from "react-router";
import SiteLayout from "../components/Layout";
import { HeroPlanes } from "../components/ui";

export default function NotFoundPage() {
  return (
    <SiteLayout title="Page introuvable">
      <section className="tone-dark relative">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <HeroPlanes />
        </div>
        <div className="guides relative flex flex-col items-center py-28 text-center lg:py-36">
          <p className="outline-num text-[clamp(96px,18vw,200px)]">404</p>
          <h1 className="h-subline mt-6">Cette page n'existe pas.</h1>
          <p className="lede mt-4 max-w-[520px]">Le lien est peut-être ancien, ou la réalisation a changé d'adresse.</p>
          <div className="hero-actions mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/" viewTransition className="btn btn-lg btn-solid">
              Retour à l'accueil
            </Link>
            <Link to="/realisations" viewTransition className="btn btn-lg btn-outline">
              Les réalisations
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
