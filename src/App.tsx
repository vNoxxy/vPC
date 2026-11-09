import { Outlet, ScrollRestoration, createBrowserRouter } from "react-router";
import CompetencesPage from "./pages/CompetencesPage";
import ContactPage from "./pages/ContactPage";
import CvPage from "./pages/CvPage";
import HomePage from "./pages/HomePage";
import LegalPage from "./pages/LegalPage";
import NotFoundPage from "./pages/NotFoundPage";
import ParcoursPage from "./pages/ParcoursPage";
import RealisationPage from "./pages/RealisationPage";
import RealisationsPage from "./pages/RealisationsPage";
import VeillePage from "./pages/VeillePage";
import VodyPage from "./pages/VodyPage";

/** Every page starts at the top; back and forward return where the visitor was. */
function Root() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
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
      { path: "/realisations", element: <RealisationsPage /> },
      { path: "/realisations/:slug", element: <RealisationPage /> },
      { path: "/competences", element: <CompetencesPage /> },
      { path: "/veille", element: <VeillePage /> },
      { path: "/vody-studio", element: <VodyPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/mentions-legales", element: <LegalPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
], { basename });
