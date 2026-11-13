import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/** The documents offered for download (TP, exercises, courses): served as they are, from public/documents. */
const DOCUMENTS = fileURLToPath(new URL("./public/documents", import.meta.url));

/** Every file in the folder and its sub-folders, but hidden files and the folder's own read-me. */
function listDocuments(dir = DOCUMENTS): { path: string; size: number }[] {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.flatMap((entry) => {
    if (entry.name.startsWith(".")) return [];
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return listDocuments(full);
    if (dir === DOCUMENTS && entry.name === "LISEZ-MOI.md") return [];
    return [{ path: relative(DOCUMENTS, full).split(sep).join("/"), size: statSync(full).size }];
  });
}

/**
 * `virtual:documents`, the list of the documents, read from the folder when the site is built: a file
 * dropped in public/documents shows on the Documents page with nothing else to write. In dev, adding or
 * removing one reloads the page.
 */
function documents(): Plugin {
  const id = "virtual:documents";
  const resolved = `\0${id}`;
  return {
    name: "documents",
    resolveId: (source) => (source === id ? resolved : undefined),
    load: (source) => (source === resolved ? `export default ${JSON.stringify(listDocuments())};` : undefined),
    configureServer(server) {
      const changed = (file: string) => {
        if (!file.startsWith(DOCUMENTS)) return;
        const mod = server.moduleGraph.getModuleById(resolved);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add", changed).on("unlink", changed);
    },
  };
}

export default defineConfig({
  plugins: [react(), documents()],
  // Where the site is served from: "/" by default, "/vPC/" on GitHub Pages (set by the deploy workflow).
  base: process.env.BASE_PATH || "/",
  // One bundle on purpose: the whole portfolio (its texts included) loads once, then every page opens at once.
  build: { chunkSizeWarningLimit: 800 },
});
