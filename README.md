# Portfolio BTS SIO — Timéo Vaast

Mon portfolio de BTS SIO (option SLAM, lycée Jean Rostand de Chantilly, session 2028), au style de
[vodystudio.fr](https://vodystudio.fr).

Le site est **100 % statique** : pas de base de données, pas de serveur, pas de cookie. React, TypeScript,
Vite et Tailwind CSS ; les polices (Syne, Plus Jakarta Sans, JetBrains Mono) sont servies avec le site.

> **Avant de mettre en ligne, lis [`A-RELIRE.md`](A-RELIRE.md)**, puis dépose tes TP en PDF dans
> [`documents/`](documents/LISEZ-MOI.md) : chaque fiche propose alors de télécharger son document.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:5173, signale les documents encore à déposer
npm run build      # vérifie les types puis construit le site dans dist/
npm run preview    # sert dist/ comme en ligne
```

## Mettre en ligne

Le site est publié par **GitHub Pages** : le workflow `.github/workflows/pages.yml` le construit et le met
en ligne à chaque push sur `main`, à l'adresse **https://vnoxxy.github.io/vPC/**. On peut aussi le relancer à
la main : onglet *Actions* → *GitHub Pages* → *Run workflow*.

À faire une seule fois, dans les réglages du dépôt sur github.com :

1. **Rendre le dépôt public** (*Settings → General → Danger Zone → Change visibility*) : GitHub Pages ne publie
   un dépôt privé qu'avec un abonnement GitHub Pro.
2. **Choisir GitHub Actions comme source** (*Settings → Pages → Build and deployment → Source : GitHub Actions*).

GitHub Pages ne sait pas renvoyer toutes les adresses vers `index.html` : après le build,
`scripts/spa-pages.mjs` en dépose une copie à chaque adresse du site (`dist/realisations/glpi/index.html`…)
et dans `404.html`. Le site est servi sous `/vPC/` : la variable `BASE_PATH` du workflow le dit à Vite et au
routeur. Avec un nom de domaine à toi, mets `BASE_PATH: /`.

Vercel et Netlify marchent aussi (`vercel.json`, `netlify.toml`, sans `BASE_PATH`) ; change alors
l'hébergeur dans `src/pages/LegalPage.tsx`.

## Modifier le contenu

Tout le texte est dans `src/data/` ; les pages ne font que l'afficher.

| Pour… | Fichier |
| --- | --- |
| Ajouter ou modifier une réalisation (TP, projet) | `src/data/realisations/bloc1.ts`, `bloc2.ts`, `bloc3.ts`, `ap.ts`, `perso.ts` |
| Le document à télécharger d'un TP | `documents/<slug de la fiche>.pdf` (voir `documents/LISEZ-MOI.md`) |
| Le parcours, les stages, les langues, les outils | `src/data/profile.ts` |
| Les compétences E4 et les blocs | `src/data/competences.ts` |
| La veille (axes, sources, journal) | `src/data/veille.ts` |
| Les captures d'écran (preuves) | les images dans `public/preuves/`, puis `shots` dans la fiche |

Une réalisation suit la fiche vue en AP : contexte, besoin, contribution, outils, difficulté, solution,
compétences, preuves, bilan. Le TP lui-même n'est pas recopié : son document se télécharge depuis la fiche.
Ses compétences E4 (`competences`) remplissent toutes seules le tableau de synthèse de la page Compétences.

## Organisation

```
documents/      les TP en PDF, un par fiche (documents/glpi.pdf → /realisations/glpi)
src/
  components/   Layout (menu, pied de page), éléments du design, cartes, contrôle segmenté
  data/         tout le contenu
  lib/          couleurs, animations au défilement, titre des pages
  pages/        une page par adresse (accueil, parcours, cv, réalisations, compétences, veille, vody-studio, contact)
  index.css     le design de vodystudio.fr (tons encre et papier, pastilles, cadres arrondis, animations)
```
