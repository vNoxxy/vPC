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

/** A line of the E4 synthesis table: a piece of BTS work or a project, and the competencies it proves. */
export interface Work {
  slug: string;
  /** Its name in the table (a few words). */
  short: string;
  category: CategoryKey;
  /** dd/mm/yy, as in the E4 table. `to` left out for a single day, "" for "still running". */
  from: string;
  to?: string;
  /** Indexes into each competency's activities (competences.ts). */
  competences: Partial<Record<CompetenceKey, number[]>>;
}

/**
 * A Vody Studio project, told like the AP Portfolio asks: why (context, need), what I did (contribution,
 * tools, difficulty, solution), what it proves (competencies, proofs, assessment). The BTS work itself
 * has no page of its own: its documents are downloaded from the Documents page.
 */
export interface Realisation extends Work {
  title: string;
  /** What it is, in the index: "Site et application", "Bot Discord"... */
  kind: string;
  /** One line, for the cards. */
  summary: string;
  /** "Projet personnel, en production"... */
  format: string;
  context: string;
  need: string;
  contribution: string;
  tools: string[];
  difficulty: string;
  solution: string;
  proofs: string[];
  code?: CodeProof[];
  /** A real screenshot at the top of its page, and next to the pointer in the index (public/images/). */
  cover?: Shot;
  /** More screenshots shown as proofs (public/images/). */
  shots?: Shot[];
  bilan: string;
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
