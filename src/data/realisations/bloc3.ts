import type { Work } from "../types";

/** Bloc 3, cybersécurité des services informatiques. Their documents are on the Documents page; here, only what the E4 table needs. */
export const BLOC3: Work[] = [
  {
    slug: "e-mail-suspect",
    short: "E-mail suspect",
    category: "bloc3",
    from: "17/09/26",
    competences: { incidents: [0], patrimoine: [5], service: [2] },
  },
  {
    slug: "securiser-un-compte",
    short: "Sécuriser un compte",
    category: "bloc3",
    from: "21/09/26",
    competences: { patrimoine: [2], incidents: [0] },
  },
  {
    slug: "authentification-sure",
    short: "Authentification sûre",
    category: "bloc3",
    from: "28/09/26",
    competences: { projet: [0], patrimoine: [2] },
  },
  {
    slug: "audit-technova",
    short: "Audit TechNova",
    category: "bloc3",
    from: "01/10/26",
    competences: { patrimoine: [3, 4, 2, 5] },
  },
];
