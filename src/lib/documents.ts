/**
 * The documents of the TPs, offered for download on their fiche. They live in the `documents/` folder
 * at the root of the project, named after the fiche's slug: `documents/glpi.pdf` goes with
 * /realisations/glpi. A second one for the same fiche adds a suffix: `documents/glpi_annexe.pdf`.
 *
 * Picked up when the site is built: a fiche shows its button only once its file is there, so a missing
 * document never leaves a dead link.
 */
const FILES = import.meta.glob("/documents/*.{pdf,docx,odt,pptx,xlsx}", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

export interface Doc {
  url: string;
  /** "PDF", "DOCX"… */
  ext: string;
  /** The name the file is saved under on the visitor's computer. */
  downloadName: string;
  /** What comes after the slug in the file name ("annexe" for glpi_annexe.pdf), if anything. */
  suffix: string;
}

export function documentsFor(slug: string): Doc[] {
  return Object.entries(FILES)
    .map(([path, url]) => {
      const file = path.split("/").pop()!;
      const dot = file.lastIndexOf(".");
      return { url, base: file.slice(0, dot), ext: file.slice(dot + 1) };
    })
    .filter((f) => f.base === slug || f.base.startsWith(`${slug}_`))
    .sort((a, b) => a.base.localeCompare(b.base))
    .map((f) => ({
      url: f.url,
      ext: f.ext.toUpperCase(),
      downloadName: `Timeo-Vaast-${f.base}.${f.ext}`,
      suffix: f.base.slice(slug.length + 1).replace(/[-_]+/g, " "),
    }));
}
