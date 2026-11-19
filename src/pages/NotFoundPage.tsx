import { Link } from "react-router";
import SiteLayout from "../components/Layout";
import { PageHead } from "../components/ui";

export default function NotFoundPage() {
  return (
    <SiteLayout title="Page introuvable">
      <PageHead
        title="Cette page n'existe pas."
        lead="Le lien est peut-être ancien, ou la page a changé d'adresse."
        actions={
          <>
            <Link to="/" viewTransition className="btn">
              Retour à l'accueil
            </Link>
            <Link to="/documents" viewTransition className="link-u text-[15px]">
              Les documents
            </Link>
          </>
        }
      />
    </SiteLayout>
  );
}
