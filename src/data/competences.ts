import type { Category, CategoryKey, CompetenceKey } from "./types";
import type { AccentKey } from "../lib/accents";

export interface Competence {
  key: CompetenceKey;
  label: string;
  accent: AccentKey;
  /** The activities listed under it in the E4 synthesis table, word for word. */
  activities: string[];
}

/** The six columns of the « Tableau de synthèse — Épreuve E4 » (BTS SIO, session 2028), in its order. */
export const COMPETENCES: Competence[] = [
  {
    key: "patrimoine",
    label: "Gérer le patrimoine informatique",
    accent: "green",
    activities: [
      "Recenser et identifier les ressources numériques",
      "Exploiter des référentiels, normes et standards adoptés par le prestataire informatique",
      "Mettre en place et vérifier les niveaux d'habilitation associés à un service",
      "Vérifier les conditions de la continuité d'un service informatique",
      "Gérer des sauvegardes",
      "Vérifier le respect des règles d'utilisation des ressources numériques",
    ],
  },
  {
    key: "incidents",
    label: "Répondre aux incidents et aux demandes d'assistance et d'évolution",
    accent: "red",
    activities: [
      "Collecter, suivre et orienter des demandes",
      "Traiter des demandes concernant les services réseau et système, applicatifs",
      "Traiter des demandes concernant les applications",
    ],
  },
  {
    key: "presence",
    label: "Développer la présence en ligne de l'organisation",
    accent: "yellow",
    activities: [
      "Participer à la valorisation de l'image de l'organisation sur les médias numériques en tenant compte du cadre juridique et des enjeux économiques",
      "Référencer les services en ligne de l'organisation et mesurer leur visibilité",
      "Participer à l'évolution d'un site Web exploitant les données de l'organisation",
    ],
  },
  {
    key: "projet",
    label: "Travailler en mode projet",
    accent: "violet",
    activities: [
      "Analyser les objectifs et les modalités d'organisation d'un projet",
      "Planifier les activités",
      "Évaluer les indicateurs de suivi d'un projet et analyser les écarts",
    ],
  },
  {
    key: "service",
    label: "Mettre à disposition des utilisateurs un service informatique",
    accent: "cyan",
    activities: [
      "Réaliser les tests d'intégration et d'acceptation d'un service",
      "Déployer un service",
      "Accompagner les utilisateurs dans la mise en place d'un service",
    ],
  },
  {
    key: "devpro",
    label: "Organiser son développement professionnel",
    accent: "orange",
    activities: [
      "Mettre en place son environnement d'apprentissage personnel",
      "Mettre en œuvre des outils et stratégies de veille informationnelle",
      "Gérer son identité professionnelle",
      "Développer son projet professionnel",
    ],
  },
];

export const COMPETENCE_BY_KEY = Object.fromEntries(COMPETENCES.map((c) => [c.key, c])) as Record<CompetenceKey, Competence>;

export const CATEGORIES: Category[] = [
  {
    key: "bloc1",
    label: "Bloc 1",
    name: "Support et mise à disposition de services informatiques",
    accent: "green",
    text: "Postes clients, serveurs, réseaux, gestion de parc : installer, paramétrer et dépanner ce que les utilisateurs utilisent.",
  },
  {
    key: "bloc2",
    label: "Bloc 2",
    name: "Conception et développement d'applications (SLAM)",
    accent: "violet",
    text: "Algorithmique et développement : analyser un besoin, écrire la solution et la tester sur ses cas limites.",
  },
  {
    key: "bloc3",
    label: "Bloc 3",
    name: "Cybersécurité des services informatiques",
    accent: "red",
    text: "Phishing, mots de passe, MFA, audit : repérer les risques et proposer des protections qui se complètent.",
  },
  {
    key: "ap",
    label: "AP",
    name: "Ateliers de professionnalisation",
    accent: "orange",
    text: "Veille informationnelle et portfolio : apprendre à se tenir à jour et à prouver ce que l'on sait faire.",
  },
  {
    key: "perso",
    label: "Vody Studio",
    name: "Réalisations personnelles — Vody Studio",
    accent: "vody",
    text: "Les projets de ma micro-entreprise : un site en production, un bot Discord, des éditeurs et un outil d'audit.",
  },
];

export const CATEGORY_BY_KEY = Object.fromEntries(CATEGORIES.map((c) => [c.key, c])) as Record<CategoryKey, Category>;
