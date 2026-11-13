import type { AccentKey } from "../lib/accents";

/** The parts of the BTS a réalisation belongs to, each with its own color (see categories.ts). */
export type CategoryKey = "bloc1" | "bloc2" | "bloc3" | "ap" | "perso";

/** The six competencies of the E4 synthesis table (see competences.ts). */
export type CompetenceKey = "patrimoine" | "incidents" | "presence" | "projet" | "service" | "devpro";

export interface Shot {
  src: string;
  caption: string;
}

export interface CodeProof {
  title: string;
  lang: string;
  code: string;
}

/**
 * One réalisation, told like the AP Portfolio asks: why (context, need), what I did (contribution,
 * tools, difficulty, solution), what it proves (competencies, proofs, assessment). The work itself is
 * not copied here: its document is downloaded from the fiche (documents/<slug>.pdf, see lib/documents.ts).
 */
export interface Realisation {
  slug: string;
  title: string;
  /** Its name in the index of réalisations (a few words). */
  short: string;
  /** What it is, in the index: "TP, gestion de parc", "Bot Discord"... */
  kind: string;
  /** One line, for the cards. */
  summary: string;
  category: CategoryKey;
  /** dd/mm/yy, as in the E4 table. `to` left out for a single day, "" for "still running". */
  from: string;
  to?: string;
  /** "TP individuel", "Travail en trinôme"... */
  format: string;
  context: string;
  need: string;
  contribution: string;
  tools: string[];
  difficulty: string;
  solution: string;
  /** Indexes into each competency's activities (competences.ts). */
  competences: Partial<Record<CompetenceKey, number[]>>;
  proofs: string[];
  code?: CodeProof[];
  /** A real screenshot at the top of its page, and next to the pointer in the index (public/images/). */
  cover?: Shot;
  /** More screenshots shown as proofs: files put in public/preuves/, e.g. { src: "/preuves/glpi-tickets.png", caption: "…" }. */
  shots?: Shot[];
  bilan: string;
  /** The TP's document in my Drive: exported as documents/<slug>.pdf, it gets its download button. */
  drive?: string;
  /** A link to see it live (the Vody Studio projects). */
  live?: { label: string; href: string };
  featured?: boolean;
}

export interface Category {
  key: CategoryKey;
  label: string;
  /** The bloc's full name. */
  name: string;
  accent: AccentKey;
  text: string;
}
