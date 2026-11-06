# À relire avant de mettre en ligne

Tu as choisi « je complète, tu relis » pour les TP pas finis. Ce fichier liste tout ce qui a été écrit ou
corrigé pour le portfolio, pour que tu puisses le relire.

## Comment relire

```bash
npm install
npm run dev
```

Ouvre http://localhost:5173 : en local, chaque réponse ajoutée ou corrigée porte un badge jaune
**« À relire »** (passe la souris dessus pour voir ce qui a changé). **Le site en ligne n'affiche jamais ces
badges.** Une fois une réponse relue, enlève `added: true` ou `fixed: true` (et sa `note`) dans
`src/data/realisations/*.ts`.

## En priorité

1. **Les fiches sont rédigées à partir de tes documents.** Contexte, contribution, difficulté, solution et bilan
   sont écrits « à la première personne » d'après tes réponses. Relis-les pour qu'ils collent à ce que tu as
   vraiment fait et vécu : c'est ce que le jury te demandera de raconter à l'oral.
2. **Défis PseudoLab : il y a une erreur dans ton document.** `SEUIL_GROUPE` valait 15 au lieu de 5
   (« à partir de 5 billets »), donc le test D donnait 18 € au lieu de 15 € le billet. C'est corrigé sur le site
   (test D : 15 € le billet, 76 € au total), et la fiche en fait sa « difficulté » : corrige aussi ton document
   si tu le rends.
3. **TCP/IP, question 1.2** : tu avais répondu « IP » pour la couche Accès réseau. C'est Ethernet (IP est la
   couche Internet). La fiche « Réseaux » en fait sa difficulté.
4. **E-mail suspect** : le domaine est `microsoft-securite365.com` (tu avais écrit « security »).
5. **Ce portfolio** : sa fiche dit qu'il a été développé avec l'aide d'un assistant IA (Claude Code), que tu as
   dirigé et relu. Garde-le ou reformule, mais reste transparent si on te pose la question.

## Informations à vérifier

- **Stages du bac pro** (`src/data/profile.ts`) : le texte de ton CV était mélangé. J'ai associé l'entretien des
  machines à Herta, le convoyeur à Abena-Frantex et le montage de meubles à E.Leclerc. Vérifie, ainsi que les
  années du bac pro (2023 — 2026).
- **Projets Vody Studio** : ils sont datés « depuis le 21/10/26 » (l'immatriculation). Mets leur vraie date de début.
- **Recherche de stage** : la candidature à l'INERIS est citée sur la page Parcours. Retire-la si tu préfères.
- **Travail en trinôme** (authentification plus sûre) : les prénoms de Haitam et Ismail ne sont pas affichés.
  Ajoute-les s'ils sont d'accord.
- **Veille** (`src/data/veille.ts`) : deux entrées du journal viennent d'une recherche web rapide et sont à
  vérifier : le report de l'AI Act (paquet « omnibus numérique », été 2026, sur EUR-Lex) et le Panorama de
  la cybermenace 2025 de l'ANSSI (mars 2026, sur cyber.gouv.fr). Ajoute surtout **tes** articles, en haut de
  `JOURNAL` : c'est toi qui présentes la veille en décembre.
- **Mentions légales** : l'hébergeur indiqué est Vercel. Si tu passes par Netlify, change `HOST` dans
  `src/pages/LegalPage.tsx`.
- **Ubuntu, 1.1** : j'ai gardé ta réponse « 6 Go de RAM ».

## Pas fait (il manque des éléments)

- **TCP/IP, dossiers 2 et 3** : ils s'appuient sur les captures de trames du sujet.
- **IPv4, dossier 3** : les relevés propres à ton poste (adresse, masque, passerelle, adresse publique). Seules
  les questions de cours y sont.
- **Les captures d'écran de tes TP** : ce sont tes meilleures preuves. Mets les images dans `public/preuves/`
  et ajoute-les à la fiche :
  `shots: [{ src: "/preuves/glpi-tickets.png", caption: "Les quatre tickets dans GLPI" }]`.
- **Documents non intégrés** : la convention de stage, l'attestation de rendez-vous et le tableau de suivi
  (vierges), la lettre de motivation (adressée à l'INERIS) et le CV en PDF (il contient ton téléphone et ton
  adresse). À la place, la page `/cv` montre ton CV avec seulement ton e-mail, et s'imprime en PDF.

## Toutes les réponses ajoutées ou corrigées

### Appliquer la charte informatique de Rostand NetInfo
`/realisations/charte-informatique`

- **Corrigé** — Dossier 1 — Le salarié fraude-t-il ? · 2 : Mohammed donne un jeu sur clé USB à Djibril pour qu'il l'installe sur son poste et joue pendant la pause.
  _Ajouté : la règle « ne pas installer de logiciels sans autorisation », plus précise que « jouer est interdit » (la charte ne l'interdit pas en tant que tel)._
- **Corrigé** — Dossier 1 — Le salarié fraude-t-il ? · 5 : Amadou crée un virus et le fait copier par Sayed sur son ordinateur, pour faire une blague.
  _Ajouté : la loi Godfrain, citée dans l'annexe 1 de la charte._
- **Corrigé** — Dossier 1 — Le salarié fraude-t-il ? · 9 : Anass appelle sa famille partie en vacances à l'étranger avec son téléphone portable professionnel.
  _Nuancé : la charte admet un usage privé raisonnable du téléphone ; ce sont le coût et la limitation des appels internationaux qui posent problème._
- **Corrigé** — Dossier 1 — Le salarié fraude-t-il ? · 10 : Karim garde les plans de son prochain chantier sur une clé USB non chiffrée.
  _Précisé avec la règle des équipements nomades (chiffrement)._

### Installer et paramétrer un poste client Windows 10
`/realisations/poste-windows`

- **Ajouté** — Dossier 1 — Renseignements sur le système · 1.1 : Combien de RAM faut-il pour faire fonctionner Windows 10 ?
- **Ajouté** — Dossier 1 — Renseignements sur le système · 1.2 : Combien d'espace disque faut-il pour installer et paramétrer Windows 10 ?
- **Ajouté** — Dossier 1 — Renseignements sur le système · 1.3 : Quelles sont les différentes éditions de Windows 10 ?
- **Ajouté** — Dossier 2 — Installation sur VirtualBox · 2.1 : Créer une machine virtuelle nommée « Windows 10 » (procédure).
- **Ajouté** — Dossier 2 — Installation sur VirtualBox · 2.2 : Installer Windows 10 (procédure).
- **Ajouté** — Dossier 2 — Installation sur VirtualBox · 2.3 : Créer un compte à son prénom et NOM avec le mot de passe donné par l'énoncé.
- **Ajouté** — Dossier 3 — Les logiciels · 3.1 : Paramétrer la carte réseau et le proxy pour accéder à Internet (procédure).
- **Corrigé** — Dossier 4 — Paramétrages · 4.1 : Que faire pour ne pas perdre toutes ses données en cas de crash de Windows ?
  _Ajouté : l'intérêt de la partition séparée, qui fait le lien avec la question 4.2._
- **Corrigé** — Dossier 4 — Paramétrages · 4.2 : Réduire C: pour créer une seconde partition F: nommée « Données » (procédure).
  _Complété : la lettre F: et le système de fichiers NTFS demandés par l'énoncé._
- **Corrigé** — Dossier 4 — Paramétrages · 4.3 : Déplacer les données de l'utilisateur (Documents, Téléchargements, Images, Musique, Vidéos) (procédure).
  _Complété : la réponse ne listait que les dossiers à créer, j'ai ajouté le déplacement par l'onglet Emplacement._
- **Ajouté** — Dossier 5 — Les comptes utilisateurs · 5.1 : Créer le compte du binôme (administrateur) et le compte Dupont DUPONT (utilisateur standard) (procédure).
- **Ajouté** — Dossier 6 — Les droits des comptes · 6.1 : Avec le compte du binôme : changer le fond d'écran, l'emplacement des documents, désinstaller le traitement de texte, créer un fichier texte.
- **Ajouté** — Dossier 6 — Les droits des comptes · 6.2 : Avec Dupont DUPONT : mêmes réglages, ouvrir le fichier du binôme, installer le traitement de texte. Que remarque-t-on ?
- **Corrigé** — Dossier 6 — Les droits des comptes · 6.3 : Supprimer l'utilisateur Dupont DUPONT : que deviennent ses données ?
  _Reformulé : la réponse d'origine parlait d'un « compte parent », qui n'existe pas ici._
- **Ajouté** — Dossier 6 — Les droits des comptes · 6.4 : Comment éviter de déplacer à la main les dossiers des prochains utilisateurs ?

### Installer et paramétrer un poste client Ubuntu
`/realisations/poste-ubuntu`

- **Ajouté** — Dossier 2 — Installation sur VirtualBox · 2.2 : Installer Ubuntu (procédure).
- **Ajouté** — Dossier 2 — Installation sur VirtualBox · 2.3 : Créer un compte à son prénom et NOM avec le mot de passe donné par l'énoncé.
- **Ajouté** — Dossier 2 — Installation sur VirtualBox · 2.5 : Réaliser un historique de Linux.
- **Corrigé** — Dossier 3 — Réseau et proxy · 3.1 : Paramétrer la carte réseau et le proxy pour accéder à Internet (procédure).
  _Complété : le réglage du proxy, que la réponse d'origine ne donnait pas._
- **Corrigé** — Dossier 4 — Les comptes utilisateurs · 4.1 : Créer le compte du binôme (administrateur) et le compte Kirito ASUNA (standard) (procédure).
  _Ajouté : la commande qui rend le binôme administrateur (groupe sudo)._
- **Ajouté** — Dossier 5 — Les droits des comptes · 5.1 : Avec le compte du binôme : fond d'écran, emplacement des documents, désinstaller le traitement de texte, créer un fichier texte.
- **Ajouté** — Dossier 5 — Les droits des comptes · 5.2 : Avec Kirito ASUNA : mêmes réglages, ouvrir le fichier du binôme, installer le traitement de texte. Que remarque-t-on ?
- **Corrigé** — Dossier 5 — Les droits des comptes · 5.3 : Supprimer l'utilisateur Kirito ASUNA : que deviennent ses données ?
  _Reformulé : la réponse d'origine parlait d'un « compte parent », qui n'existe pas ici._
- **Corrigé** — Dossier 5 — Les droits des comptes · 5.4 : Comment éviter de déplacer à la main les dossiers des prochains utilisateurs ?
  _Remplacé : la réponse d'origine (« la synchronisation des comptes ») ne répondait pas à la question._

### Installer GLPI sur un serveur Debian
`/realisations/glpi`

- **Ajouté** — Dossier 2 — Installation de Debian · 2.2 : Procédure pas à pas de l'installation de Debian.
- **Ajouté** — Dossier 3 — Installation de GLPI · 3.1 : Procédure pas à pas de l'installation de GLPI.
- **Ajouté** — Dossier 3 — Installation de GLPI · 3.2 : Une fois GLPI installé, supprimer le fichier install.php (procédure).
- **Ajouté** — Dossier 4 — Utilisation de GLPI · 4.1 : Créer les comptes : moi (administrateur), mon voisin (observateur), Léo Landais (technicien), Carrie Bou (observateur).
- **Ajouté** — Dossier 4 — Utilisation de GLPI · 4.2 : Créer dans le parc : nos deux ordinateurs, nos deux moniteurs et un logiciel installé sur chacun.
- **Ajouté** — Dossier 4 — Utilisation de GLPI · 4.3 : Créer quatre tickets : deux incidents et deux demandes, attribués ou non au technicien.

### Les réseaux : types, topologies et modèle TCP/IP
`/realisations/reseaux-tcp-ip`

- **Corrigé** — Exercice — Le modèle TCP/IP (dossier 1) · 1.2 : La couche 1, Accès réseau, fabrique la trame avec les adresses physiques. Quel protocole utilise-t-elle ?
  _Corrigé : la réponse d'origine était « IP », qui appartient à la couche 2 (Internet)._
- **Ajouté** — Exercice — Le modèle TCP/IP (dossier 1) · 1.3 : La couche 2, Internet, ajoute les adresses IP et route les paquets. Quel protocole ?
- **Ajouté** — Exercice — Le modèle TCP/IP (dossier 1) · 1.4 : La couche 3, Transport, découpe en segments et repère le service par son port. Quels protocoles ?
- **Ajouté** — Exercice — Le modèle TCP/IP (dossier 1) · 1.5 : La couche 4, Application, définit les requêtes et les réponses. Quels protocoles ?
- **Ajouté** — Exercice — Le modèle TCP/IP (dossier 1) · 1.6 : Quels éléments matériels associer aux couches 1 et 2 ?

### L'adressage IPv4 et le découpage en sous-réseaux
`/realisations/adressage-ipv4`

- **Corrigé** — Dossier 1 — Exercices · 1.1 : a) Écrire 10100000110000001000000011101011 en décimal pointé. b) Écrire 210.20.135.48 en binaire.
  _Le a) est la réponse d'origine ; le b) a été ajouté._
- **Ajouté** — Dossier 1 — Exercices · 1.2 : 193.20.73.12 est une adresse de classe C. Quels octets identifient son réseau, et sa machine ?
- **Ajouté** — Dossier 1 — Exercices · 1.3 : Classe, octets du réseau et octets de l'hôte de quatre adresses.
- **Ajouté** — Dossier 1 — Exercices · 1.4 : Nombre maximum d'adresses par réseau et de réseaux, par classe ; et la classe d'un réseau de 64 500 machines.
- **Ajouté** — Dossier 1 — Exercices · 1.5 : a) Réseau de 208.0.255.150 / 255.255.255.0 ? b) Classe « normale » d'un réseau en /16 ?
- **Ajouté** — Dossier 1 — Exercices · 1.6 : Masques par défaut, et type d'adressage selon le masque.
- **Ajouté** — Dossier 1 — Exercices · 1.7 : Sur un même réseau physique, avec les masques par défaut : quelles machines communiqueront ensemble ?
- **Ajouté** — Dossier 1 — Exercices · 1.8 : Première et dernière adresse de réseau privé de classe B, puis de classe C.
- **Ajouté** — Dossier 1 — Exercices · 1.9 : Particularités de vingt-deux adresses (masque par défaut).
- **Ajouté** — Dossier 1 — Exercices · 1.10 : L'adresse d'hôte est-elle valide ? Sinon, quelle partie est fausse ?
- **Ajouté** — Dossier 2 — Études de cas · 2.1 : Répartir le bloc 162.18.132.0/22 entre A (200 hôtes), B (200 hôtes) et C (450 hôtes).
- **Ajouté** — Dossier 2 — Études de cas · 2.2 : Découper 192.168.1.0/24 en huit sous-réseaux /27 (255.255.255.224).
- **Ajouté** — Dossier 3 — Travail pratique (questions de cours) · 3.1 a : Quelle commande affiche les configurations réseau ?
- **Ajouté** — Dossier 3 — Travail pratique (questions de cours) · 3.1 c : Pourquoi un ordinateur peut-il avoir plusieurs adresses MAC ?
- **Ajouté** — Dossier 3 — Travail pratique (questions de cours) · 3.1 d : Pourquoi un ordinateur peut-il avoir plusieurs adresses IP ?
- **Ajouté** — Dossier 3 — Travail pratique (questions de cours) · 3.1 f : À quoi sert une passerelle ?
- **Ajouté** — Dossier 3 — Travail pratique (questions de cours) · 3.2 a-b : Qu'est-ce qu'une adresse IP publique, à quoi sert-elle, comment la récupérer ?
- **Ajouté** — Dossier 3 — Travail pratique (questions de cours) · 3.3 : Câble débranché, adresse du voisin, retour à la normale, test de connectivité.

### Défis PseudoLab : une billetterie et un contrôle d'accès
`/realisations/defis-pseudolab`

- **Corrigé** — Défi 1 — Billetterie intelligente : Analyse avant codage
  _Corrigé : SEUIL_GROUPE vaut 5 (« à partir de 5 billets »), pas 15._
- **Corrigé** — Défi 1 — Billetterie intelligente : Pseudo-code
  _Corrigé : SEUIL_GROUPE <- 5._
- **Corrigé** — Défi 2 — Tester les cas limites : Résultats obtenus
  _Test D recalculé avec SEUIL_GROUPE = 5 : 15 € le billet et 76 € au total (la version d'origine donnait 18 € et 91 €)._

### Enquête sur un e-mail suspect
`/realisations/e-mail-suspect`

- **Corrigé** — Mission 2 — Investigation technique : Quel est le nom de domaine de l'expéditeur ?
  _Corrigé : la réponse d'origine écrivait « microsoft-security365.com »._
- **Corrigé** — Mission 4 — Réagir à un incident : Procédure de réaction en cinq étapes
  _Les étapes 1 à 3 sont d'origine ; les étapes 4 et 5 ont été ajoutées._
- **Corrigé** — Mission finale — 5 réflexes avant de cliquer : Mini-fiche de sensibilisation pour un salarié non informaticien
  _Les réflexes 1 et 2 sont d'origine ; les réflexes 3 à 5 ont été ajoutés._
- **Ajouté** — Mission finale — 5 réflexes avant de cliquer : Conclusion — diagnostic final

### Préparer une veille sur les mises à jour Windows
`/realisations/preparer-une-veille`

- **Corrigé** — Dossier 1 — Préparer la veille · 1.2 : Comparer les sources d'information
  _Complété : le tableau d'origine n'avait que deux cases remplies (flux RSS)._
