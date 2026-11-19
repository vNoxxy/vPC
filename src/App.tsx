import { Navigate, Outlet, ScrollRestoration, createBrowserRouter, useParams } from "react-router";
import CompetencesPage from "./pages/CompetencesPage";
import ContactPage from "./pages/ContactPage";
import CvPage from "./pages/CvPage";
import DocumentsPage from "./pages/DocumentsPage";
import HomePage from "./pages/HomePage";
import LegalPage from "./pages/LegalPage";
import NotFoundPage from "./pages/NotFoundPage";
import ParcoursPage from "./pages/ParcoursPage";
import ProjectPage from "./pages/ProjectPage";
import VeillePage from "./pages/VeillePage";
import VodyPage from "./pages/VodyPage";
import { PROJECT_BY_SLUG } from "./data/realisations";

/** Every page starts at the top; back and forward return where the visitor was. */
function Root() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}

/** The old addresses of the fiches: a project kept its page under /vody-studio, the BTS work is on the Documents page. */
function OldFiche() {
  const { slug = "" } = useParams();
  return <Navigate to={PROJECT_BY_SLUG.has(slug) ? `/vody-studio/${slug}` : "/documents"} replace />;
}

/** "/vPC/" on GitHub Pages, "/" elsewhere: the router's paths below are relative to it. */
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/parcours", element: <ParcoursPage /> },
      { path: "/cv", element: <CvPage /> },
      { path: "/documents", element: <DocumentsPage /> },
      { path: "/realisations", element: <Navigate to="/documents" replace /> },
      { path: "/realisations/:slug", element: <OldFiche /> },
      { path: "/competences", element: <CompetencesPage /> },
      { path: "/veille", element: <VeillePage /> },
      { path: "/vody-studio", element: <VodyPage /> },
      { path: "/vody-studio/:slug", element: <ProjectPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/mentions-legales", element: <LegalPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
], { basename });
