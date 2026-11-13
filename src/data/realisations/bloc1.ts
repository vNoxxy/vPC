import type { Work } from "../types";

/** Bloc 1, support et mise à disposition de services informatiques. Their documents are on the Documents page; here, only what the E4 table needs. */
export const BLOC1: Work[] = [
  {
    slug: "charte-informatique",
    short: "Charte informatique",
    category: "bloc1",
    from: "03/09/26",
    competences: { patrimoine: [5, 1] },
  },
  {
    slug: "refroidissement",
    short: "Le refroidissement",
    category: "bloc1",
    from: "03/09/26",
    to: "07/09/26",
    competences: { patrimoine: [0], incidents: [1] },
  },
  {
    slug: "poste-windows",
    short: "Poste Windows 10",
    category: "bloc1",
    from: "17/09/26",
    to: "25/09/26",
    competences: { service: [1, 0], patrimoine: [2, 4], incidents: [1] },
  },
  {
    slug: "poste-ubuntu",
    short: "Poste Ubuntu",
    category: "bloc1",
    from: "25/09/26",
    to: "01/10/26",
    competences: { service: [1], patrimoine: [2], incidents: [1] },
  },
  {
    slug: "glpi",
    short: "GLPI sur Debian",
    category: "bloc1",
    from: "01/10/26",
    to: "15/10/26",
    competences: { patrimoine: [0, 2], incidents: [0], service: [1] },
  },
  {
    slug: "reseaux-tcp-ip",
    short: "Réseaux et TCP/IP",
    category: "bloc1",
    from: "13/10/26",
    to: "15/10/26",
    competences: { incidents: [1] },
  },
  {
    slug: "adressage-ipv4",
    short: "Adressage IPv4",
    category: "bloc1",
    from: "02/11/26",
    to: "05/11/26",
    competences: { incidents: [1] },
  },
];
