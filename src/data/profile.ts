/**
 * Who I am, from my CV. Only the e-mail address is shown on the site: no phone number, no street
 * address (they stay on the paper CV handed to a company).
 */
export const PROFILE = {
  firstName: "Timéo",
  lastName: "Vaast",
  title: "Étudiant en BTS SIO, option SLAM",
  email: "timeovaast57@gmail.com",
  school: "Lycée Jean Rostand, Chantilly",
  session: "Session 2028",
  option: "SLAM — Solutions logicielles et applications métiers",
  github: "https://github.com/vnoxxy",
  vody: "https://vodystudio.fr",
  driving: "Permis B, véhiculé",
  pitch:
    "Je suis en première année de BTS SIO au lycée Jean Rostand de Chantilly. Je viens d'un bac pro de maintenance industrielle, et je code depuis des années par passion : sites, scripts Lua pour FiveM, jeux. En octobre 2026, j'ai créé ma micro-entreprise, Vody Studio, pour en faire mon métier.",
  qualities: [
    { name: "Créativité", text: "Je dessine mes interfaces, mes logos et mes scènes 3D moi-même (Blender, suite Adobe, Unreal Engine)." },
    { name: "Curiosité", text: "Je veux comprendre comment une chose marche avant de m'en servir : un réseau, un protocole, une faille." },
    { name: "Motivation", text: "Un projet personnel en production à côté des cours : je sais ce que demande un vrai client." },
    { name: "Autonomie", text: "J'apprends seul, de la documentation aux tests, et je mène un projet jusqu'à sa mise en ligne." },
  ],
};

export interface Step {
  period: string;
  title: string;
  place: string;
  text: string;
  tag?: string;
}

/** Studies, the newest first. */
export const EDUCATION: Step[] = [
  {
    period: "2026 — 2028",
    title: "BTS SIO, option SLAM",
    place: "Lycée Jean Rostand, Chantilly",
    text: "Services informatiques aux organisations : support et services (Bloc 1), développement d'applications (Bloc 2, SLAM), cybersécurité (Bloc 3).",
    tag: "En cours",
  },
  {
    period: "2023 — 2026",
    title: "Bac pro MSPC",
    place: "Lycée Mireille Grenet",
    text: "Maintenance des systèmes de production connectés : maintenance préventive et dépannage, électricité, automatismes. Obtenu avec la mention Bien.",
    tag: "Mention Bien",
  },
  {
    period: "2022 — 2023",
    title: "Diplôme national du brevet",
    place: "Collège Lucie & Raymond Aubrac",
    text: "Obtenu avec la mention Bien, le fruit d'un travail régulier toute l'année.",
    tag: "Mention Bien",
  },
];

/** Work placements of the bac pro. */
export const EXPERIENCE: Step[] = [
  {
    period: "Stage · 4 semaines",
    title: "Herta",
    place: "Le Meux — La Croix-Saint-Ouen",
    text: "Entretien régulier des machines pour éviter les pannes, participation aux réparations, câblage électrique, organisation des dépannages, dans le respect des règles de sécurité et d'hygiène.",
  },
  {
    period: "Stage · 3 semaines",
    title: "Abena-Frantex",
    place: "Nogent-sur-Oise",
    text: "Projet d'amélioration d'un convoyeur : analyse du système, ajustements proposés puis mis en place, dans le respect des règles de sécurité et des contraintes de production.",
  },
  {
    period: "Stage · 4 semaines",
    title: "E.Leclerc",
    place: "Pont-Sainte-Maxence",
    text: "Montage de meubles, entretien et missions du quotidien avec l'équipe, dans le respect des consignes de sécurité.",
  },
];

export const LANGUAGES = [
  { name: "Français", level: "Langue maternelle", value: 100 },
  { name: "Anglais", level: "Intermédiaire", value: 62 },
  { name: "Espagnol", level: "Débutant", value: 25 },
];

export const INTERESTS = [
  { name: "Basket", text: "Sept ans de club : la discipline et l'esprit d'équipe." },
  { name: "Musculation", text: "Pour la condition physique, et pour me fixer des défis." },
  { name: "Jeux vidéo & développement", text: "Ce qui m'a amené au code : comprendre comment un jeu est fait, puis en faire." },
];

export interface SkillGroup {
  title: string;
  items: { name: string; where: string }[];
}

/** What I use, each with where it shows on this portfolio (a skill comes with its proof). */
export const SKILLS: SkillGroup[] = [
  {
    title: "Langages",
    items: [
      { name: "HTML & CSS", where: "vodystudio.fr, ce portfolio" },
      { name: "SCSS, Sass, Tailwind CSS", where: "vodystudio.fr, ce portfolio" },
      { name: "JavaScript & TypeScript", where: "vodystudio.fr, vBot, Forge" },
      { name: "Lua", where: "Forge, l'audit FiveM" },
      { name: "Pseudo-code", where: "Défis PseudoLab" },
      { name: "SQL (PostgreSQL)", where: "vodystudio.fr, GLPI (MariaDB)" },
    ],
  },
  {
    title: "Systèmes & réseaux",
    items: [
      { name: "Windows 10", where: "TP poste client Windows" },
      { name: "Linux (Ubuntu, Debian)", where: "TP Ubuntu, TP GLPI" },
      { name: "VirtualBox", where: "TP Windows, Ubuntu, GLPI" },
      { name: "Adressage IPv4", where: "Exercices IPv4" },
      { name: "Docker Compose", where: "Mise en ligne de vodystudio.fr" },
      { name: "GLPI", where: "TP GLPI" },
    ],
  },
  {
    title: "Logiciels",
    items: [
      { name: "Visual Studio Code", where: "Tous mes projets" },
      { name: "Git & GitHub", where: "vodystudio.fr, ce portfolio" },
      { name: "Unreal Engine", where: "Projets personnels" },
      { name: "Blender", where: "Projets personnels" },
      { name: "Suite Adobe", where: "Identité de Vody Studio" },
    ],
  },
];
