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

const ACCES = `motDePasseCorrect <- FAUX
mfaValide <- FAUX
compteBloque <- FAUX

DEBUT
  LIRE motDePasseCorrect
  LIRE mfaValide
  LIRE compteBloque
  AFFICHER "Mot de passe correct :", motDePasseCorrect
  AFFICHER "MFA validé :", mfaValide
  AFFICHER "Compte bloqué :", compteBloque

  SI compteBloque ALORS
    AFFICHER "Accès refusé : compte bloqué"
  SINON
    SI NON motDePasseCorrect ALORS
      AFFICHER "Accès refusé : mot de passe incorrect"
    SINON
      SI NON mfaValide ALORS
        AFFICHER "Accès refusé : MFA non validé"
      SINON
        AFFICHER "Accès autorisé"
      FIN SI
    FIN SI
  FIN SI
FIN`;

export const BLOC2: Realisation[] = [
  {
    slug: "defis-pseudolab",
    title: "Défis PseudoLab : une billetterie et un contrôle d'accès",
    wordmark: "PseudoLab",
    summary: "Analyser des règles métier, écrire l'algorithme, le tester sur ses cas limites et y trouver une erreur.",
    category: "bloc2",
    from: "13/10/26",
    format: "Défis individuels",
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
    work: [
      {
        title: "Défi 1 — Billetterie intelligente",
        intro: "Prix normal 18 €, moins de 18 ans 12 €, à partir de 5 billets 15 €, carte de fidélité −2 € sur le total, frais de réservation 3 €.",
        answers: [
          {
            q: "Analyse avant codage",
            a: [
              {
                table: {
                  head: ["Élément", "Contenu"],
                  rows: [
                    ["Entrées", "age, nbBillets, estFidele"],
                    ["Constantes", "PRIX_NORMAL = 18, PRIX_MINEUR = 12, PRIX_GROUPE = 15, SEUIL_GROUPE = 5, AGE_MAJORITE = 18, REDUC_FIDELE = 2, FRAIS = 3"],
                    ["Variables", "Les entrées, plus prixUnitaire, montantAvantReduction, reduction, montantFinal"],
                    [
                      "Traitements",
                      "1. Choisir le prix unitaire (mineur, groupe ou normal) · 2. Avant réduction = prix × billets + frais · 3. Réduction si fidèle, sinon 0 · 4. Final = avant réduction − réduction",
                    ],
                    ["Sorties", "Prix d'un billet, montant avant réduction, réduction appliquée, montant final"],
                  ],
                },
              },
            ],
            fixed: true,
            note: "Corrigé : SEUIL_GROUPE vaut 5 (« à partir de 5 billets »), pas 15.",
          },
          { q: "Pseudo-code", a: [{ code: BILLETTERIE, lang: "pseudo-code" }], fixed: true, note: "Corrigé : SEUIL_GROUPE <- 5." },
        ],
      },
      {
        title: "Défi 2 — Tester les cas limites",
        answers: [
          {
            q: "Résultats obtenus",
            a: [
              {
                table: {
                  head: ["Test", "Âge", "Billets", "Fidélité", "Prix du billet", "Avant réduction", "Réduction", "Final"],
                  rows: [
                    ["A", "17", "1", "FAUX", "12 €", "15 €", "0 €", "15 €"],
                    ["B", "18", "1", "FAUX", "18 €", "21 €", "0 €", "21 €"],
                    ["C", "25", "4", "VRAI", "18 €", "75 €", "2 €", "73 €"],
                    ["D", "25", "5", "VRAI", "15 €", "78 €", "2 €", "76 €"],
                    ["E", "17", "5", "VRAI", "12 €", "63 €", "2 €", "61 €"],
                  ],
                },
              },
            ],
            fixed: true,
            note: "Test D recalculé avec SEUIL_GROUPE = 5 : 15 € le billet et 76 € au total (la version d'origine donnait 18 € et 91 €).",
          },
          {
            q: "Un client de 17 ans achète 5 billets : quel tarif est prioritaire, mineur ou groupe ? L'algorithme le gère-t-il ?",
            a: [
              "Le tarif mineur doit être prioritaire, parce que 12 € est moins cher que 15 € : on applique le tarif le plus avantageux pour le client. Mon algorithme gère cette situation car il teste en premier la condition sur l'âge.",
            ],
          },
        ],
      },
      {
        title: "Défi 3 — Contrôle d'accès sécurisé",
        intro: "L'accès n'est autorisé que si le mot de passe est correct, le MFA validé et le compte non bloqué.",
        answers: [
          { q: "Entrées et sortie", a: ["Entrées : motDePasseCorrect, mfaValide et compteBloque (trois booléens). Sortie : le message affiché."] },
          { q: "Pseudo-code, avec une raison de refus précise", a: [{ code: ACCES, lang: "pseudo-code" }] },
          {
            q: "Tests de plusieurs combinaisons",
            a: [
              {
                table: {
                  head: ["motDePasseCorrect", "mfaValide", "compteBloque", "Résultat"],
                  rows: [
                    ["VRAI", "VRAI", "FAUX", "Accès autorisé"],
                    ["VRAI", "VRAI", "VRAI", "Accès refusé : compte bloqué"],
                    ["FAUX", "VRAI", "FAUX", "Accès refusé : mot de passe incorrect"],
                    ["VRAI", "FAUX", "FAUX", "Accès refusé : MFA non validé"],
                    ["FAUX", "FAUX", "FAUX", "Accès refusé : mot de passe incorrect"],
                    ["FAUX", "FAUX", "VRAI", "Accès refusé : compte bloqué"],
                  ],
                },
              },
            ],
          },
          {
            q: "Bonus : simplifier la condition avec ET, OU et NON",
            a: [
              { code: 'SI motDePasseCorrect ET mfaValide ET NON compteBloque ALORS\n  AFFICHER "Accès autorisé"\nSINON\n  AFFICHER "Accès refusé"\nFIN SI', lang: "pseudo-code" },
              "Plus courte, cette version perd la raison précise du refus.",
            ],
          },
        ],
      },
    ],
  },
];
