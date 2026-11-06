import type { Realisation } from "../types";

export const AP: Realisation[] = [
  {
    slug: "preparer-une-veille",
    title: "Préparer une veille sur les mises à jour Windows",
    wordmark: "Veille",
    summary: "Objectifs, sources comparées, outil de curation et diffusion : la méthode avant le sujet.",
    category: "ap",
    from: "18/09/26",
    format: "Exercice individuel",
    context: "Atelier de professionnalisation sur la veille informatique. Le responsable informatique veut suivre les mises à jour et les correctifs de sécurité de Windows.",
    need: "Préparer cette veille : en fixer les objectifs, choisir des sources de qualité, choisir un outil de curation et décider comment diffuser l'information.",
    contribution: "J'ai défini les objectifs, comparé six types de sources sur quatre critères, comparé trois agrégateurs, puis choisi les cibles et les canaux de diffusion.",
    tools: ["Flux RSS et Atom", "Feedly", "Netvibes", "Symbaloo", "Alertes"],
    difficulty: "Juger la qualité d'une source : un forum ou un réseau social répond vite, mais n'est pas toujours fiable.",
    solution: "Noter chaque source sur quatre critères (rapidité, fiabilité, actualité, pertinence) et privilégier les sources officielles, suivies en flux RSS dans un agrégateur.",
    competences: { devpro: [1, 0] },
    proofs: ["Le document « AP — Exercices 02 » : objectifs, tableaux comparatifs et diffusion.", "La page Veille de ce portfolio, qui applique cette méthode à mon sujet."],
    bilan: "Une veille se prépare comme un projet : sans objectif ni sources choisies, on accumule des articles sans rien en tirer. J'ai repris la même méthode pour ma veille sur l'IA et la cybersécurité.",
    work: [
      {
        title: "Dossier 1 — Préparer la veille",
        answers: [
          {
            n: "1.1",
            q: "Objectifs de la veille demandée par le responsable",
            a: [
              "Détecter le plus vite possible toute mise à jour, tout correctif de sécurité (patch) et toute faille concernant Windows ; anticiper les risques de sécurité, suivre les mises à jour officielles et assurer la continuité de service ; rester sur un périmètre précis, documenter et transmettre l'information.",
            ],
          },
          {
            n: "1.2",
            q: "Comparer les sources d'information",
            a: [
              {
                table: {
                  head: ["Source", "Rapidité", "Fiabilité", "Actualité", "Pertinence"],
                  rows: [
                    ["Flux RSS / Atom", "Très rapide", "Bonne si la source est officielle (Microsoft, CERT-FR)", "Très bonne", "Très bonne : on choisit ses flux"],
                    ["Newsletters", "Rapide (quotidienne ou hebdomadaire)", "Bonne (éditeurs, ANSSI)", "Bonne", "Bonne"],
                    ["Forums, communautés", "Variable", "Moyenne : à vérifier", "Bonne", "Moyenne : des retours de terrain utiles"],
                    ["Réseaux sociaux", "Très rapide", "Faible, sauf comptes officiels", "Très bonne", "Moyenne : beaucoup de bruit"],
                    ["Syndication et curation", "Rapide", "Celle des sources choisies", "Très bonne", "Très bonne : tout est regroupé"],
                    ["Alertes push et pull", "Immédiate (push)", "Bonne si officielles", "Très bonne", "Très bonne : seulement ce qui est surveillé"],
                  ],
                },
              },
            ],
            fixed: true,
            note: "Complété : le tableau d'origine n'avait que deux cases remplies (flux RSS).",
          },
          {
            n: "1.3",
            q: "Comparer trois outils de curation",
            a: [
              {
                table: {
                  head: ["Outil", "Appréciation"],
                  rows: [
                    ["Netvibes", "Complet, mais complexe."],
                    ["Symbaloo", "Simple, mais pas automatisé pour la veille."],
                    ["Feedly", "Bon et adapté : c'est celui que je retiens."],
                  ],
                },
              },
            ],
          },
          {
            n: "1.4",
            q: "Diffuser l'information : cibles, canaux et supports",
            a: [
              "Cibles : le responsable informatique, les techniciens et administrateurs, et parfois les utilisateurs. Canaux : un e-mail ou une newsletter interne, un outil collaboratif avec alerte instantanée pour l'urgent, et un point en réunion d'équipe.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "ce-portfolio",
    title: "Ce portfolio",
    wordmark: "Portfolio",
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
