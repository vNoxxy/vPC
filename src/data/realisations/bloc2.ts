import type { Realisation } from "../types";

const BILLETTERIE = `CONSTANTE PRIX_NORMAL <- 18
CONSTANTE PRIX_MINEUR <- 12
CONSTANTE PRIX_GROUPE <- 15
CONSTANTE SEUIL_GROUPE <- 5
CONSTANTE AGE_MAJORITE <- 18
CONSTANTE REDUC_FIDELE <- 2
CONSTANTE FRAIS <- 3

age <- 0
nbBillets <- 0
estFidele <- FAUX
prixUnitaire <- 0.0
montantAvantReduction <- 0.0
reduction <- 0.0
montantFinal <- 0.0

DEBUT
  LIRE age
  LIRE nbBillets
  LIRE estFidele
  AFFICHER "Votre âge :", age
  AFFICHER "Nombre de billets :", nbBillets
  AFFICHER "Carte de fidélité :", estFidele

  SI age < AGE_MAJORITE ALORS
    prixUnitaire <- PRIX_MINEUR
  SINON
    SI nbBillets >= SEUIL_GROUPE ALORS
      prixUnitaire <- PRIX_GROUPE
    SINON
      prixUnitaire <- PRIX_NORMAL
    FIN SI
  FIN SI

  montantAvantReduction <- prixUnitaire * nbBillets + FRAIS

  SI estFidele ALORS
    reduction <- REDUC_FIDELE
  SINON
    reduction <- 0
  FIN SI

  montantFinal <- montantAvantReduction - reduction

  AFFICHER "Prix d'un billet :", prixUnitaire, "€"
  AFFICHER "Montant avant réduction :", montantAvantReduction, "€"
  AFFICHER "Réduction :", reduction, "€"
  AFFICHER "Montant final :", montantFinal, "€"
FIN`;


export const BLOC2: Realisation[] = [
  {
    slug: "defis-pseudolab",
    title: "Défis PseudoLab : une billetterie et un contrôle d'accès",
    short: "Défis PseudoLab",
    kind: "Algorithmique",
    summary: "Analyser des règles métier, écrire l'algorithme, le tester sur ses cas limites et y trouver une erreur.",
    category: "bloc2",
    from: "13/10/26",
    format: "Défis individuels",
    drive: "Timeo Vaast - Defis_P2_PseudoLab_Mode_Libre.docx",
    featured: true,
    context: "Cours d'algorithmique de l'option SLAM : trois défis à résoudre dans PseudoLab, en mode libre, sur les variables, les constantes, les entrées-sorties et les conditions.",
    need:
      "Calculer le prix de billets de spectacle selon des règles métier (âge, nombre de billets, fidélité, frais), puis décider si un utilisateur peut se connecter à partir de trois booléens.",
    contribution:
      "Pour chaque défi, j'ai fait l'analyse avant de coder (entrées, constantes, variables, traitements, sorties), écrit le pseudo-code, rempli les tableaux de tests avec les résultats obtenus, puis proposé une version simplifiée de la condition d'accès.",
    tools: ["PseudoLab", "Pseudo-code", "Jeux de tests", "Tables de vérité"],
    difficulty: "Au test D (25 ans, 5 billets), l'algorithme donnait encore le tarif normal de 18 € au lieu du tarif de groupe à 15 €.",
    solution:
      "La constante SEUIL_GROUPE valait 15 au lieu de 5. Une fois corrigée, le test D donne 15 € le billet et 76 € au total, et le test E garde bien le tarif mineur, testé en premier parce qu'il est le plus avantageux.",
    competences: { service: [0], incidents: [2] },
    proofs: [
      "Le document « Défis P2 — PseudoLab » : analyse, pseudo-code et tests des trois défis.",
      "Le tableau des cas limites, avec le résultat obtenu à chaque test.",
      "La table de vérité du contrôle d'accès (six combinaisons).",
    ],
    code: [{ title: "Défi 1 — la billetterie (corrigée)", lang: "pseudo-code", code: BILLETTERIE }],
    bilan:
      "Les cas limites servent à trouver les erreurs : sans le test à exactement 5 billets, la mauvaise constante passait inaperçue. Un tableau de tests n'est pas une formalité, c'est lui qui prouve que l'algorithme répond aux règles.",
  },
];
