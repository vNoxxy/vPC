import type { Work } from "../types";

/** Ateliers de professionnalisation. Their documents are on the Documents page; here, only what the E4 table needs. */
export const AP: Work[] = [
  {
    slug: "preparer-une-veille",
    short: "Préparer une veille",
    category: "ap",
    from: "18/09/26",
    competences: { devpro: [1, 0] },
  },
  {
    slug: "ce-portfolio",
    short: "Ce portfolio",
    category: "ap",
    from: "02/10/26",
    to: "",
    competences: { presence: [0, 1], devpro: [2, 3], projet: [1] },
  },
];
