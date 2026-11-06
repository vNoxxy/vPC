/**
 * My technology watch: « L'IA et la cybersécurité », presented in AP in December 2026.
 * The method comes from the AP exercise (see the « Préparer une veille » réalisation); the journal
 * grows as I read. Add an entry at the top of JOURNAL for each article worth keeping.
 */
export const VEILLE = {
  subject: "L'IA et la cybersécurité",
  question: "L'intelligence artificielle rend-elle nos systèmes d'information plus sûrs, ou plus fragiles ?",
  why:
    "Pendant l'audit de TechNova, la direction voulait brancher un agent IA sur tout son système d'information. En cherchant les risques, j'ai compris que l'IA change les deux côtés à la fois : elle aide les attaquants à aller plus vite, et elle devient elle-même une nouvelle porte d'entrée. Je développe aussi des outils qui exécutent du code d'autres personnes : le sujet me concerne directement.",
  presentation: "Présentation en atelier de professionnalisation, entre le 4 et le 18 décembre 2026.",
};

export interface Axis {
  title: string;
  text: string;
  points: string[];
}

/** What the watch follows: four angles on the subject. */
export const AXES: Axis[] = [
  {
    title: "L'IA au service des attaquants",
    text: "L'IA générative abaisse le niveau nécessaire pour attaquer, et rend les arnaques plus crédibles.",
    points: [
      "Des e-mails de phishing sans fautes, dans la langue et le ton de la victime, écrits en quelques secondes.",
      "Les « deepfakes » de voix et de vidéo pour la fraude au président : en 2024, un employé de l'entreprise Arup à Hong Kong a viré environ 25 millions de dollars après une visioconférence où tous les autres participants étaient générés.",
      "L'aide à l'écriture de code malveillant et à la recherche de failles, plus rapide qu'avant.",
    ],
  },
  {
    title: "L'IA, nouvelle surface d'attaque",
    text: "Un assistant ou un agent IA branché sur le système d'information est un nouveau logiciel à protéger, avec des failles qui lui sont propres.",
    points: [
      "L'injection de prompt : une consigne cachée dans un e-mail ou une page web détourne l'agent qui la lit. C'est le risque n°1 du Top 10 de l'OWASP pour les applications à base de LLM.",
      "La fuite de données : ce qu'un salarié colle dans un outil d'IA public peut sortir de l'entreprise.",
      "Des droits trop larges : un agent qui peut tout lire et tout faire devient la cible idéale. Le moindre privilège s'applique à lui comme à un salarié.",
    ],
  },
  {
    title: "L'IA au service des défenseurs",
    text: "Les mêmes techniques aident les équipes de sécurité, à condition de garder un humain dans la boucle.",
    points: [
      "Repérer des comportements anormaux dans des journaux trop volumineux pour être lus à la main.",
      "Trier les alertes d'un centre de sécurité (SOC) et résumer un incident.",
      "Détecter les e-mails de phishing et les sites frauduleux.",
    ],
  },
  {
    title: "Le cadre : règles et recommandations",
    text: "L'Europe et la France encadrent l'usage de l'IA et publient des recommandations de sécurité.",
    points: [
      "Le règlement européen sur l'IA (AI Act, règlement (UE) 2024/1689), entré en vigueur le 1er août 2024, classe les systèmes d'IA selon leur niveau de risque ; ses obligations s'appliquent par étapes.",
      "L'ANSSI a publié en avril 2024 ses recommandations de sécurité pour un système d'IA générative.",
      "La CNIL publie des fiches pratiques pour développer et utiliser l'IA en respectant le RGPD.",
    ],
  },
];

export interface Source {
  name: string;
  href: string;
  kind: string;
  why: string;
}

/** Where I read, chosen on the four criteria of the AP exercise: speed, reliability, freshness, relevance. */
export const SOURCES: Source[] = [
  { name: "ANSSI — cyber.gouv.fr", href: "https://cyber.gouv.fr", kind: "Officiel", why: "L'agence nationale : recommandations, panorama de la menace, travaux sur l'IA." },
  { name: "CERT-FR", href: "https://www.cert.ssi.gouv.fr", kind: "Officiel · flux RSS", why: "Les alertes et les avis de sécurité, au jour le jour." },
  { name: "Cybermalveillance.gouv.fr", href: "https://www.cybermalveillance.gouv.fr", kind: "Officiel", why: "Les arnaques du moment, expliquées pour le grand public." },
  { name: "CNIL", href: "https://www.cnil.fr", kind: "Officiel", why: "L'IA et les données personnelles." },
  { name: "OWASP GenAI Security Project", href: "https://genai.owasp.org", kind: "Communauté de référence", why: "Le Top 10 des risques des applications à base de LLM." },
  { name: "ENISA", href: "https://www.enisa.europa.eu", kind: "Agence européenne", why: "Le panorama annuel des menaces en Europe." },
  { name: "LeMagIT, ZDNet France, IT-Connect", href: "https://www.it-connect.fr", kind: "Presse spécialisée · flux RSS", why: "L'actualité commentée, à recouper avec les sources officielles." },
];

/** The tools of the watch, as chosen in the AP exercise. */
export const TOOLS = [
  { name: "Feedly", text: "L'agrégateur : les flux RSS de toutes les sources au même endroit, rangés par thème." },
  { name: "Alertes Google", text: "Une alerte « IA cybersécurité » et une alerte « injection de prompt », reçues par e-mail." },
  { name: "Ce portfolio", text: "Le journal ci-dessous : chaque article retenu, avec ce que j'en retiens." },
];

export interface JournalEntry {
  date: string;
  title: string;
  source: string;
  href?: string;
  takeaway: string;
}

/** The articles I kept, the newest first. */
export const JOURNAL: JournalEntry[] = [
  {
    date: "Été 2026",
    title: "L'Union européenne repousse les obligations de l'AI Act pour les systèmes « à haut risque »",
    source: "Paquet « omnibus numérique » — à vérifier sur EUR-Lex",
    takeaway: "Les obligations des systèmes à haut risque glissent à fin 2027 ; celles sur la transparence des IA génératives et des modèles d'usage général restent en place.",
  },
  {
    date: "Mars 2026",
    title: "Panorama de la cybermenace 2025",
    source: "ANSSI",
    href: "https://cyber.gouv.fr",
    takeaway: "L'IA renforce les capacités des attaquants, ce qui menace d'abord les petites structures dont la sécurité est faible : exactement le cas de TechNova.",
  },
  {
    date: "Novembre 2024",
    title: "Top 10 des risques des applications LLM, édition 2025",
    source: "OWASP",
    href: "https://genai.owasp.org",
    takeaway: "L'injection de prompt reste le risque n°1 : il faut traiter tout texte lu par l'IA comme une donnée, jamais comme une consigne.",
  },
  {
    date: "Avril 2024",
    title: "Recommandations de sécurité pour un système d'IA générative",
    source: "ANSSI",
    href: "https://cyber.gouv.fr",
    takeaway: "Sécuriser toute la chaîne (données, entraînement, déploiement), cloisonner l'IA et ne jamais lui laisser d'actions critiques sans contrôle humain.",
  },
  {
    date: "Février 2024",
    title: "Une fraude par deepfake coûte environ 25 millions de dollars à Arup",
    source: "Presse internationale",
    takeaway: "Voir et entendre quelqu'un ne prouve plus que c'est lui : pour un virement, il faut une vérification par un autre canal.",
  },
];
