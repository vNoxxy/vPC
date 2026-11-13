import { Link } from "react-router";
import SiteLayout from "../components/Layout";
import { PageHead } from "../components/ui";

export default function NotFoundPage() {
  return (
    <SiteLayout title="Page introuvable">
      <PageHead
        title="Cette page n'existe pas."
        lead="Le lien est peut-être ancien, ou la réalisation a changé d'adresse."
        actions={
          <>
            <Link to="/" viewTransition className="btn">
              Retour à l'accueil
            </Link>
            <Link to="/realisations" viewTransition className="link-u text-[15px]">
              Les réalisations
            </Link>
          </>
        }
      />
    </SiteLayout>
  );
}
