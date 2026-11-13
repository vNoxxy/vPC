import type { Realisation } from "../types";

export const AP: Realisation[] = [
  {
    slug: "preparer-une-veille",
    title: "Préparer une veille sur les mises à jour Windows",
    short: "Préparer une veille",
    kind: "Exercice, veille",
    summary: "Objectifs, sources comparées, outil de curation et diffusion : la méthode avant le sujet.",
    category: "ap",
    from: "18/09/26",
    format: "Exercice individuel",
    drive: "AP - Exercices 02 | Timeo Vaast",
    context: "Atelier de professionnalisation sur la veille informatique. Le responsable informatique veut suivre les mises à jour et les correctifs de sécurité de Windows.",
    need: "Préparer cette veille : en fixer les objectifs, choisir des sources de qualité, choisir un outil de curation et décider comment diffuser l'information.",
    contribution: "J'ai défini les objectifs, comparé six types de sources sur quatre critères, comparé trois agrégateurs, puis choisi les cibles et les canaux de diffusion.",
    tools: ["Flux RSS et Atom", "Feedly", "Netvibes", "Symbaloo", "Alertes"],
    difficulty: "Juger la qualité d'une source : un forum ou un réseau social répond vite, mais n'est pas toujours fiable.",
    solution: "Noter chaque source sur quatre critères (rapidité, fiabilité, actualité, pertinence) et privilégier les sources officielles, suivies en flux RSS dans un agrégateur.",
    competences: { devpro: [1, 0] },
    proofs: ["Le document « AP — Exercices 02 » : objectifs, tableaux comparatifs et diffusion.", "La page Veille de ce portfolio, qui applique cette méthode à mon sujet."],
    bilan: "Une veille se prépare comme un projet : sans objectif ni sources choisies, on accumule des articles sans rien en tirer. J'ai repris la même méthode pour ma veille sur l'IA et la cybersécurité.",
  },
  {
    slug: "ce-portfolio",
    title: "Ce portfolio",
    short: "Ce portfolio",
    kind: "Site personnel",
    summary: "Prouver ce que je sais faire : une fiche par réalisation, des compétences reliées à leurs preuves, au style de mon studio.",
    category: "ap",
    from: "02/10/26",
    to: "",
    format: "Projet individuel",
    context: "Atelier de professionnalisation « Portfolio : comment prouver ce que je sais faire ? ». Le portfolio accompagne l'épreuve E4 et s'enrichit tout au long du BTS.",
    need:
      "Un site qui présente mon parcours, mes réalisations, mes compétences reliées à des preuves, ma veille et un moyen de me contacter, sans tomber dans la liste de technologies sans preuve.",
    contribution:
      "J'ai construit le contenu avant le site : une fiche par réalisation (contexte, besoin, contribution, difficulté, solution, compétences, preuves, bilan). J'ai repris la charte graphique de mon entreprise, Vody Studio, et développé le site avec l'aide d'un assistant IA de programmation (Claude Code), que j'ai dirigé et dont j'ai relu le travail.",
    tools: ["React", "TypeScript", "Vite", "Tailwind CSS", "Git & GitHub", "Vercel", "Claude Code"],
    difficulty: "Éviter le contre-exemple « ARENA CLUB » vu en AP : un rôle flou, des technologies listées comme compétences, aucune preuve.",
    solution:
      "Chaque fiche relie une compétence du tableau E4 à une réalisation identifiable et à ses preuves. Le tableau de synthèse est construit à partir des fiches elles-mêmes : il ne peut pas les contredire.",
    competences: { presence: [0, 1], devpro: [2, 3], projet: [1] },
    proofs: ["Ce site, et son dépôt Git (l'historique des versions).", "Le tableau de synthèse E4, généré à partir des fiches."],
    bilan: "Un portfolio se construit au fil de l'eau : chaque nouveau TP devient une fiche dès qu'il est rendu, au lieu d'attendre la fin du BTS.",
  },
];
