# Portfolio BTS SIO — Timéo Vaast

Mon portfolio de BTS SIO (option SLAM, lycée Jean Rostand de Chantilly, session 2028).

Le site est **100 % statique** : pas de base de données, pas de serveur, pas de cookie. React, TypeScript,
Vite et Tailwind CSS ; les polices (Bricolage Grotesque, Instrument Serif, JetBrains Mono, Syne) sont servies
avec le site.

## L'identité « Signal »

Une nuit bleutée, une seule couleur vive (le bleu de Vody Studio) pour ce qui vit et bouge, et un réseau de
nœuds qui répond au pointeur : ce dont parle le BTS SIO, des systèmes qui communiquent. Des titres très grands
en Bricolage Grotesque avec un mot mis à part en Instrument Serif italique, des étiquettes en JetBrains Mono.
Chaque projet de Vody Studio garde la couleur de son produit (bleu, or, rouge, orange).

Ce qui fait vivre le site :

- **Le réseau de l'accueil** (`components/NetworkField.tsx`) : un canvas où des paquets circulent entre les
  nœuds ; un paquet rouge est arrêté et le nœud clignote. Il se met en pause hors de l'écran.
- **La palette de commandes** (`components/CommandPalette.tsx`) : <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd>
  partout, pour aller à une page, un projet, ou télécharger un document au clavier.
- **Les révélations au défilement** (`components/Reveal.tsx`, `ScrollText.tsx`), la pile de projets
  (`ProjectStack.tsx`), le curseur (`Cursor.tsx`), les transitions entre pages (View Transitions).
- Tout respecte « réduire les animations » du système : le réseau devient une image fixe, rien ne bouge.

Chaque page est chargée à sa première visite (le diaporama de la veille ne pèse que sur sa page).

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
| Les captures d'écran d'un projet | les images dans `public/images/`, puis `cover` ou `shots` dans `perso.ts` ; pour qu'elles soient servies en WebP, voir plus bas |
| La couleur d'un projet | `accent` dans `perso.ts` (les couleurs sont dans `src/lib/accents.ts`) |
| Le pont « Du TP au code » | `src/data/bridge.ts` |

### Les documents

La page **Documents** (`/documents`) liste tout ce qui est dans `public/documents/`, sans rien écrire d'autre :
un dossier devient une section (« Mes TP et exercices », « Cours et énoncés », « Stage »), un sous-dossier un
groupe (« Bloc 1 », « Chapitre 3 - … »), et chaque fichier une ligne à télécharger. Un nombre au début d'un
nom (`1 - Mes TP et exercices`, `05 - TP GLPI sur Debian.docx`) sert seulement à l'ordre et n'est pas affiché.
Un sous-dossier nommé comme un bloc (`Bloc 1`, `Bloc 2`, `Bloc 3`, `AP`) prend la pastille de sa couleur.

Pour ajouter ou remplacer un document depuis github.com : ouvre le dossier dans `public/documents/`, puis
*Add file → Upload files* ; le site se reconstruit tout seul.

### Les images

Chaque capture de `public/images/` a des copies WebP plus légères (`<nom>-800.webp`, `<nom>-1600.webp`),
listées avec sa taille dans `src/lib/images.ts`. Pour une nouvelle capture (Python et Pillow) :

```bash
python3 -c "from PIL import Image; im=Image.open('public/images/NOM.jpg'); print(im.size); [im.resize((w, round(im.height*w/im.width))).save(f'public/images/NOM-{w}.webp', quality=82) for w in (800, 1600) if w <= im.width]"
```

puis ajoute une ligne dans `src/lib/images.ts`. Sans cela, l'image est servie telle quelle.

`public/og.jpg` est l'aperçu affiché quand on partage le lien du site.

Les projets Vody Studio ont chacun leur page (`/vody-studio/<slug>`), qui suit la fiche vue en AP : contexte,
besoin, contribution, outils, difficulté, solution, compétences, preuves, bilan. Les `competences` des TP et
des projets remplissent toutes seules le tableau de synthèse de la page Compétences.

## Organisation

```
src/
  components/   Layout (en-tête, menu, pied de page), palette de commandes, réseau animé, révélations,
                pile de projets, pont TP → code, grille des compétences, diaporama
  data/         tout le contenu
  lib/          couleurs, documents à télécharger, images WebP, couverture E4, mouvement, titre des pages
  pages/        une page par adresse (accueil, parcours, cv, documents, compétences, veille, vody-studio, contact)
  index.css     l'identité « Signal » : couleurs, typographie, boutons, animations, impression du CV
public/documents/  les cours, TP et exercices à télécharger (listés par le plugin `documents` de vite.config.ts)
public/images/     les captures de vodystudio.fr (données de démonstration) et le logo du studio
```
