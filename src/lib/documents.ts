import FILES from "virtual:documents";
import { withBase } from "./site";

/**
 * Everything of the BTS offered for download: the files of public/documents, whose folders become the
 * sections of the Documents page and their sub-folders the groups inside. A number at the start of a
 * name ("1 - Mes TP et exercices", "05 - TP GLPI sur Debian.docx") only sets the order and isn't shown.
 * Nothing to write for a new file: it shows once the site is built again.
 */
export interface Doc {
  /** Its path in public/documents. */
  path: string;
  url: string;
  /** The name shown, without the ordering number or the extension. */
  name: string;
  /** The name it is saved under on the visitor's computer: "Bloc 1 - TP GLPI sur Debian.docx". */
  downloadName: string;
  /** "PDF", "DOCX"… */
  ext: string;
  size: number;
  /** The sub-folder it is in, if any ("Bloc 1", "Chapitre 3 - Le patrimoine informatique"). */
  group: string;
}

export interface Section {
  key: string;
  label: string;
  docs: Doc[];
}

const OTHERS = "Autres documents";

/** "05 - TP GLPI" → "TP GLPI": the number is there for the order only. */
const label = (name: string) => name.replace(/^\d+\s*[-–.)_]\s*/, "").trim() || name;

const byName = (a: string, b: string) => a.localeCompare(b, "fr", { numeric: true, sensitivity: "base" });

/**
 * A file name as a piece of address: spaces and accents encoded, but the punctuation a path may hold left as
 * it is. Some servers don't decode "%2C" and would miss "TP 1, poste Windows 10.docx".
 */
const pathSegment = (name: string) => encodeURIComponent(name).replace(/%(2C|3B|3D|2B|24|26|40|3A)/g, (code) => decodeURIComponent(code));

/** Sorted by the files' own paths, so the ordering numbers decide. */
const sorted = FILES.slice().sort((a, b) => byName(a.path, b.path));

const docs = sorted.map(({ path, size }) => {
  const parts = path.split("/");
  const file = parts[parts.length - 1];
  const dot = file.lastIndexOf(".");
  const name = label(dot > 0 ? file.slice(0, dot) : file);
  const ext = dot > 0 ? file.slice(dot + 1) : "";
  const group = parts.slice(1, -1).map(label).join(" / ");
  return {
    section: parts.length > 1 ? label(parts[0]) : OTHERS,
    doc: {
      path,
      url: withBase(`/documents/${parts.map(pathSegment).join("/")}`),
      name,
      downloadName: `${group ? `${group} - ` : ""}${name}${ext ? `.${ext}` : ""}`,
      ext: ext.toUpperCase(),
      size,
      group,
    } satisfies Doc,
  };
});

export const DOCUMENTS: Doc[] = docs.map((d) => d.doc);

/** The sections in their order, each with its documents; the loose files last. */
export const SECTIONS: Section[] = [...new Set(docs.map((d) => d.section))]
  .sort((a, b) => Number(a === OTHERS) - Number(b === OTHERS))
  .map((section) => ({
    key: section
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    label: section,
    docs: docs.filter((d) => d.section === section).map((d) => d.doc),
  }));

/** "240 Ko", "1,2 Mo". */
export function sizeLabel(bytes: number): string {
  if (bytes < 1000 * 1000) return `${Math.max(1, Math.round(bytes / 1000))} Ko`;
  return `${(bytes / 1000 / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Mo`;
}
