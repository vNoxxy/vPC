# Portfolio BTS SIO — Timéo Vaast

Mon portfolio de BTS SIO (option SLAM, lycée Jean Rostand de Chantilly, session 2028), au style de
[vodystudio.fr](https://vodystudio.fr).

Le site est **100 % statique** : pas de base de données, pas de serveur, pas de cookie. React, TypeScript,
Vite et Tailwind CSS ; les polices (Syne, Plus Jakarta Sans, JetBrains Mono) sont servies avec le site.

> **Lis [`A-RELIRE.md`](A-RELIRE.md)** : ce qu'il reste à vérifier ou à terminer dans les documents.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:5173
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
`scripts/spa-pages.mjs` en dépose une copie à chaque adresse du site (`dist/vody-studio/forge/index.html`…)
et dans `404.html`. Le site est servi sous `/vPC/` : la variable `BASE_PATH` du workflow le dit à Vite et au
routeur. Avec un nom de domaine à toi, mets `BASE_PATH: /`.

Vercel et Netlify marchent aussi (`vercel.json`, `netlify.toml`, sans `BASE_PATH`) ; change alors
l'hébergeur dans `src/pages/LegalPage.tsx`.

## Modifier le contenu

Tout le texte est dans `src/data/` ; les pages ne font que l'afficher.

| Pour… | Fichier |
| --- | --- |
| Ajouter un cours, un TP, un exercice à télécharger | déposer le fichier dans `public/documents/` (voir plus bas) |
| Les lignes du tableau E4 (TP, exercices) | `src/data/realisations/bloc1.ts`, `bloc2.ts`, `bloc3.ts`, `ap.ts` |
| Les projets Vody Studio et leur page | `src/data/realisations/perso.ts` |
| Le parcours, les stages, les langues, les outils | `src/data/profile.ts` |
| Les compétences E4 et les blocs | `src/data/competences.ts` |
| La veille (axes, sources, journal) | `src/data/veille.ts` |
| Le diaporama de la veille | `src/data/veille-deck/` : une diapo par fichier HTML (1920×1080), le style dans `deck.css`, l'ordre dans `deck.json` ; son PDF est dans `public/documents/1 - Mes TP et exercices/4 - AP/` |
| Les captures d'écran d'un projet | les images dans `public/images/`, puis `cover` ou `shots` dans `perso.ts` |

### Les documents

La page **Documents** (`/documents`) liste tout ce qui est dans `public/documents/`, sans rien écrire d'autre :
un dossier devient une section (« Mes TP et exercices », « Cours et énoncés », « Stage »), un sous-dossier un
groupe (« Bloc 1 », « Chapitre 3 - … »), et chaque fichier une ligne à télécharger. Un nombre au début d'un
nom (`1 - Mes TP et exercices`, `05 - TP GLPI sur Debian.docx`) sert seulement à l'ordre et n'est pas affiché.
Un sous-dossier nommé comme un bloc (`Bloc 1`, `Bloc 2`, `Bloc 3`, `AP`) prend la pastille de sa couleur.

Pour ajouter ou remplacer un document depuis github.com : ouvre le dossier dans `public/documents/`, puis
*Add file → Upload files* ; le site se reconstruit tout seul.

Les projets Vody Studio ont chacun leur page (`/vody-studio/<slug>`), qui suit la fiche vue en AP : contexte,
besoin, contribution, outils, difficulté, solution, compétences, preuves, bilan. Les `competences` des TP et
des projets remplissent toutes seules le tableau de synthèse de la page Compétences.

## Organisation

```
src/
  components/   Layout (menu, pied de page), éléments de page, liste des projets, onglets de filtre
  data/         tout le contenu
  lib/          couleurs des blocs, documents à télécharger, adresse du site, titre des pages
  pages/        une page par adresse (accueil, parcours, cv, documents, compétences, veille, vody-studio, contact)
  index.css     le design (papier clair, encre, bleu Vody Studio, filets fins, boutons arrondis)
public/documents/  les cours, TP et exercices à télécharger (listés par le plugin `documents` de vite.config.ts)
public/images/     les captures de vodystudio.fr (données de démonstration) et le logo du studio
```
