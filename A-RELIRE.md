# À relire

Tous les fichiers de `Portfolio.rar` sont sur la page **Documents**, tels quels, sauf deux (voir la partie 3).
Ils sont rangés dans `public/documents/` sous des noms lisibles : « Document sans titre.docx » est devenu
« Le modèle TCP-IP, exercices », « Chapitre 2 - Les clients.docx » l'exposé sur le refroidissement, etc.

## 1. Tes documents sont publiés tels quels

C'est ce que le jury téléchargera. Pour en corriger un, remplace le fichier dans `public/documents/` (même nom)
et pousse : le site se met à jour tout seul. D'après ce que j'ai lu :

- **Défis PseudoLab** : `SEUIL_GROUPE` vaut 15 au lieu de 5 (« à partir de 5 billets »), donc le test D donne
  18 € au lieu de 15 € le billet (76 € au total, pas 91 €).
- **E-mail suspect** : le domaine est `microsoft-securite365.com` (tu as écrit « security »). Les étapes 4 et 5
  de la mission 4, les réflexes 3 à 5 et la conclusion sont vides.
- **Le modèle TCP-IP, exercices** : une seule réponse, et elle est fausse (1.2 : c'est Ethernet, pas IP ; IP est
  la couche Internet).
- **TP GLPI** : s'arrête à la question 2.2 (installation de Debian, de GLPI, comptes, parc, tickets).
- **Adressage IPv4, exercices (dossier 1)** : une seule réponse (1.1 a).
- **TP 2, poste Ubuntu** : 2.2, 2.3, 2.5, 5.1 et 5.2 manquent ; 5.3 et 5.4 sont à revoir (il n'y a pas de
  « compte parent » ; pour 5.4, la réponse attendue est un modèle de compte, `/etc/skel`).
- **TP 1, poste Windows 10** : pas de texte pour 1.1 à 2.3, 3.1, 5.1, 6.1, 6.2 et 6.4 (peut-être dans tes
  captures).
- **Préparer une veille** : le tableau comparatif des sources (1.2) n'a que deux cases remplies ; **Veille
  informatique, notes** ne contient que deux lignes.
- **Concevoir une authentification plus sûre** : le document porte les prénoms de Haitam et Ismail. Demande-leur
  s'ils sont d'accord.

## 2. Les cours et les énoncés

Les PDF de « Cours et énoncés » sont ceux de tes professeurs (leur nom est dans les propriétés des fichiers).
Ils sont publiés comme tu l'as demandé ; demande-leur si ça leur va que leurs cours soient en ligne.

## 3. Pas publié

- **Le CV et la lettre de motivation** du dossier Stage : ils contiennent ton téléphone et ton adresse, alors
  que seul ton e-mail est public sur le site. La page `/cv` montre ton CV avec seulement ton e-mail, et
  s'imprime en PDF. Si tu veux quand même les mettre, dépose-les dans `public/documents/3 - Stage/`.
- Les dossiers vides de l'archive (chapitres 8 à 12, Bloc 3).

## 4. Informations à vérifier

- **Stages du bac pro** (`src/data/profile.ts`) : le texte de ton CV était mélangé. J'ai associé l'entretien des
  machines à Herta, le convoyeur à Abena-Frantex et le montage de meubles à E.Leclerc. Vérifie, ainsi que les
  années du bac pro (2023–2026).
- **Tableau E4** (page Compétences) : ses lignes et leurs dates sont dans `src/data/realisations/` (`bloc1.ts`…).
  Vérifie les compétences cochées pour chaque TP.
- **Projets Vody Studio** : ils sont datés « depuis le 21/10/26 » (l'immatriculation). Mets leur vraie date de début.
- **Recherche de stage** : la candidature à l'INERIS est citée sur la page Parcours. Retire-la si tu préfères.
- **Veille** (`src/data/veille.ts`) : deux entrées du journal viennent d'une recherche web rapide : le report de
  l'AI Act (« omnibus numérique », été 2026, à vérifier sur EUR-Lex) et le Panorama de la cybermenace 2025 de
  l'ANSSI (mars 2026, sur cyber.gouv.fr). Ajoute surtout **tes** articles, en haut de `JOURNAL`.
- **Mentions légales** : l'hébergeur indiqué est GitHub (GitHub Pages). Si tu changes d'hébergeur, change
  `HOST` dans `src/pages/LegalPage.tsx`.
- **Dépôt public** : pour GitHub Pages, le dépôt est public, ce fichier compris (il cite l'INERIS et les
  prénoms de tes camarades). Supprime-le une fois relu si tu préfères.
