import { useEffect } from "react";

const SITE = "Timéo Vaast — Portfolio BTS SIO";
const DEFAULT_DESCRIPTION =
  "Portfolio de Timéo Vaast, étudiant en BTS SIO option SLAM au lycée Jean Rostand de Chantilly : projets, compétences, veille et Vody Studio.";

/** The page's browser tab title and meta description. */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Timéo Vaast` : SITE;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description ?? DEFAULT_DESCRIPTION);
  }, [title, description]);
}
