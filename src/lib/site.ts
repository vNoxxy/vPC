/** A file of public/ (e.g. "/preuves/glpi.png"), under the path the site is served from. */
export const withBase = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, "");

/** The portfolio's address as people type it: "vnoxxy.github.io/vPC". */
export const siteAddress = () => (typeof window === "undefined" ? "" : (window.location.host + import.meta.env.BASE_URL).replace(/\/$/, ""));
