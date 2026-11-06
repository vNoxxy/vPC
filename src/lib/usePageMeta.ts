import { useEffect } from "react";

const SITE = "Timéo Vaast — Portfolio BTS SIO";

/** The page's browser tab title and meta description. */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Timéo Vaast` : SITE;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}
