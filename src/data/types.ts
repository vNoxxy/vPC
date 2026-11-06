import type { AccentKey } from "../lib/accents";

/** The parts of the BTS a réalisation belongs to, each with its own color (see categories.ts). */
export type CategoryKey = "bloc1" | "bloc2" | "bloc3" | "ap" | "perso";

/** The six competencies of the E4 synthesis table (see competences.ts). */
export type CompetenceKey = "patrimoine" | "incidents" | "presence" | "projet" | "service" | "devpro";

/**
 * A piece of an answer: a paragraph, or a list, numbered steps, a table, or a block of code.
 * Inline `code` is written between backticks inside the text.
 */
export type Block =
  | string
  | { list: string[] }
  | { steps: string[] }
  | { table: { head: string[]; rows: string[][] } }
  | { code: string; lang?: string };

/**
 * One answer of a TP, as handed in.
 * - `added`: written for the portfolio where the TP was unfinished — to be read again by Timéo.
 * - `fixed`: Timéo's answer, corrected or completed; `note` says what changed.
 * Both only show a marker when the site runs locally (`npm run dev`), never once deployed.
 */
export interface Answer {
  n?: string;
  q: string;
  a: Block[];
  added?: boolean;
  fixed?: boolean;
  note?: string;
}

/** A "Dossier" or "Mission" of a TP. */
export interface Part {
  title: string;
  intro?: string;
  answers: Answer[];
}

export interface CodeProof {
  title: string;
  lang: string;
  code: string;
}

/**
 * One réalisation, told like the AP Portfolio asks: why (context, need), what I did (contribution,
 * tools, difficulty, solution), what it proves (competencies, proofs, assessment).
 */
export interface Realisation {
  slug: string;
  title: string;
  /** The name across the hero of its page (short, in capitals). */
  wordmark: string;
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
  /** Screenshots shown as proofs: files put in public/preuves/, e.g. { src: "/preuves/glpi-tickets.png", caption: "…" }. */
  shots?: { src: string; caption: string }[];
  bilan: string;
  work?: Part[];
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
