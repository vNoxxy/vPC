import type { Realisation, Work } from "../types";
import { BLOC1 } from "./bloc1";
import { BLOC2 } from "./bloc2";
import { BLOC3 } from "./bloc3";
import { AP } from "./ap";
import { PERSO } from "./perso";

/** The Vody Studio projects, the only work with a page of its own (/vody-studio/<slug>). */
export const PROJECTS: Realisation[] = PERSO;

export const PROJECT_BY_SLUG = new Map(PROJECTS.map((r) => [r.slug, r]));

/** Every row of the E4 table: the BTS work bloc by bloc, then the projects. */
export const WORKS: Work[] = [...BLOC1, ...BLOC2, ...BLOC3, ...AP, ...PROJECTS];

/** The period as the E4 table writes it: "du 17/09/26 au 25/09/26", "le 03/09/26", "depuis le 21/10/26". */
export function periodLabel(r: Work): string {
  if (r.to === undefined) return `le ${r.from}`;
  if (r.to === "") return `depuis le ${r.from}`;
  return `du ${r.from} au ${r.to}`;
}

const MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

/** "01/10/26" → "Oct. 2026", for the index. */
export function monthLabel(r: Work): string {
  const [, mm, yy] = r.from.split("/").map(Number);
  const month = MONTHS[mm - 1];
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${2000 + yy}`;
}
