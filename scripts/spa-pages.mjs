/**
 * GitHub Pages serves files as they are, with no rewrite to index.html: /vPC/realisations/glpi would be a
 * 404. So the built index.html is copied to every address of the site (dist/realisations/glpi/index.html…),
 * each one answering 200, and to 404.html, which the app turns into its own "page introuvable".
 * Harmless on Vercel and Netlify, which rewrite every address anyway.
 */
import { copyFileSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const index = join(dist, "index.html");

// The fiches' addresses come from their slugs in the data files.
const dataDir = join("src", "data", "realisations");
const slugs = readdirSync(dataDir)
  .filter((f) => f.endsWith(".ts") && f !== "index.ts")
  .flatMap((f) => [...readFileSync(join(dataDir, f), "utf8").matchAll(/^\s*slug: "([^"]+)",$/gm)].map((m) => m[1]));

const pages = ["parcours", "cv", "realisations", "competences", "veille", "vody-studio", "contact", "mentions-legales", ...slugs.map((s) => `realisations/${s}`)];

for (const page of pages) {
  mkdirSync(join(dist, page), { recursive: true });
  copyFileSync(index, join(dist, page, "index.html"));
}
copyFileSync(index, join(dist, "404.html"));
console.log(`spa-pages: index.html copied to ${pages.length} addresses and 404.html`);
