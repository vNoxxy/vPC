import type { Realisation } from "../types";
import { BLOC1 } from "./bloc1";
import { BLOC2 } from "./bloc2";
import { BLOC3 } from "./bloc3";
import { AP } from "./ap";
import { PERSO } from "./perso";

/** Every réalisation, grouped by bloc in the order of the BTS. */
export const REALISATIONS: Realisation[] = [...BLOC1, ...BLOC2, ...BLOC3, ...AP, ...PERSO];

export const REALISATION_BY_SLUG = new Map(REALISATIONS.map((r) => [r.slug, r]));

/** "dd/mm/yy" → a sortable number. */
const dayOf = (d: string) => {
  const [dd, mm, yy] = d.split("/").map(Number);
  return (yy * 100 + mm) * 100 + dd;
};

/** The period as the E4 table writes it: "du 17/09/26 au 25/09/26", "le 03/09/26", "depuis le 21/10/26". */
export function periodLabel(r: Realisation): string {
  if (r.to === undefined) return `le ${r.from}`;
  if (r.to === "") return `depuis le ${r.from}`;
  return `du ${r.from} au ${r.to}`;
}

/** The newest first, for the home page. */
export const byNewest = (a: Realisation, b: Realisation) => dayOf(b.from) - dayOf(a.from);
