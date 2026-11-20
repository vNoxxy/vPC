import type React from "react";
import { Navigate, createBrowserRouter, useParams, type RouteObject } from "react-router";
import Shell from "./components/Layout";
import HomePage from "./pages/HomePage";
import { PROJECT_BY_SLUG } from "./data/realisations";

/** The old addresses of the fiches: a project kept its page under /vody-studio, the BTS work is on the Documents page. */
function OldFiche() {
  const { slug = "" } = useParams();
  return <Navigate to={PROJECT_BY_SLUG.has(slug) ? `/vody-studio/${slug}` : "/documents"} replace />;
}

/**
 * Every page but the home page is its own small file, loaded the first time it is visited (the
 * watch's slides alone weigh more than the rest). The router waits for it before the page change,
 * so the cross-fade between pages still runs.
 */
const page = (load: () => Promise<{ default: React.ComponentType }>): Pick<RouteObject, "lazy"> => ({
  lazy: async () => ({ Component: (await load()).default }),
});

/** "/vPC/" on GitHub Pages, "/" elsewhere: the router's paths below are relative to it. */
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

export const router = createBrowserRouter(
  [
    {
      element: <Shell />,
      hydrateFallbackElement: <div className="min-h-screen bg-bg" />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/parcours", ...page(() => import("./pages/ParcoursPage")) },
        { path: "/cv", ...page(() => import("./pages/CvPage")) },
        { path: "/documents", ...page(() => import("./pages/DocumentsPage")) },
        { path: "/realisations", element: <Navigate to="/documents" replace /> },
        { path: "/realisations/:slug", element: <OldFiche /> },
        { path: "/competences", ...page(() => import("./pages/CompetencesPage")) },
        { path: "/veille", ...page(() => import("./pages/VeillePage")) },
        { path: "/vody-studio", ...page(() => import("./pages/VodyPage")) },
        { path: "/vody-studio/:slug", ...page(() => import("./pages/ProjectPage")) },
        { path: "/3d", ...page(() => import("./pages/TroisDPage")) },
        { path: "/contact", ...page(() => import("./pages/ContactPage")) },
        { path: "/mentions-legales", ...page(() => import("./pages/LegalPage")) },
        { path: "*", ...page(() => import("./pages/NotFoundPage")) },
      ],
    },
  ],
  { basename },
);
