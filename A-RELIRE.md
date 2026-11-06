# À relire avant de mettre en ligne

Les fiches ne recopient plus tes TP : chacune propose de **télécharger ton document**, déposé dans
`documents/` (la liste des fichiers attendus est dans [`documents/LISEZ-MOI.md`](documents/LISEZ-MOI.md)).
Tant qu'un document manque, la fiche n'a pas de bouton.

Pour voir ce qui manque : `npm install`, puis `npm run dev`, et ouvre une fiche sur http://localhost:5173.
En local, un encadré jaune indique quel document exporter et sous quel nom. Il n'apparaît jamais sur le
site en ligne.

## 1. Les fiches sont à relire

Contexte, contribution, difficulté, solution et bilan sont rédigés « à la première personne » à partir de
tes documents. Relis-les pour qu'ils collent à ce que tu as vraiment fait : c'est ce que le jury te fera
raconter à l'oral, document en main. Par exemple, la fiche GLPI dit que tu as installé GLPI et créé les
comptes, les éléments du parc et les tickets, alors que ton document s'arrête à la question 2.2.

## 2. Corrige ou termine tes documents avant de les exporter

C'est ce que le jury téléchargera. D'après le texte que j'ai pu lire dans ton Drive :

- **Défis PseudoLab** : `SEUIL_GROUPE` vaut 15 au lieu de 5 (« à partir de 5 billets »), donc le test D donne
  18 € au lieu de 15 € le billet (76 € au total, pas 91 €). La fiche raconte cette correction et montre le
  pseudo-code corrigé : corrige ton document, sinon les deux se contredisent.
- **E-mail suspect** : le domaine est `microsoft-securite365.com` (tu as écrit « security »). Les étapes 4 et 5
  de la mission 4, les réflexes 3 à 5 et la conclusion sont vides.
- **Réseaux et TCP/IP** : la fiche parle aussi du modèle TCP/IP, mais ce document (« Document sans titre »)
  n'a qu'une réponse, et elle est fausse (1.2 : c'est Ethernet, pas IP ; IP est la couche Internet). Termine-le
  et dépose-le en `reseaux-tcp-ip_tcp-ip.pdf`, ou retire le TCP/IP de la fiche.
- **GLPI** : s'arrête à la question 2.2 (installation de Debian, de GLPI, comptes, parc, tickets).
- **IPv4** : une seule réponse (1.1 a).
- **Ubuntu** : 2.2, 2.3, 2.5, 5.1 et 5.2 manquent ; 5.3 et 5.4 sont à revoir (il n'y a pas de « compte
  parent » ; pour 5.4, la réponse attendue est un modèle de compte, `/etc/skel`, pas une synchronisation).
- **Windows 10** : je n'ai pas trouvé de texte pour 1.1 à 2.3, 3.1, 5.1, 6.1, 6.2 et 6.4 (peut-être
  dans tes captures). Même remarque que pour Ubuntu sur 6.3 et 6.4.
- **Préparer une veille** : le tableau comparatif des sources (1.2) n'a que deux cases remplies.
- **Authentification plus sûre** : le document porte les prénoms de Haitam et Ismail. Demande-leur s'ils
  sont d'accord avant de le publier.

## 3. Informations à vérifier

- **Stages du bac pro** (`src/data/profile.ts`) : le texte de ton CV était mélangé. J'ai associé l'entretien des
  machines à Herta, le convoyeur à Abena-Frantex et le montage de meubles à E.Leclerc. Vérifie, ainsi que les
  années du bac pro (2023 — 2026).
- **Projets Vody Studio** : ils sont datés « depuis le 21/10/26 » (l'immatriculation). Mets leur vraie date de début.
- **Recherche de stage** : la candidature à l'INERIS est citée sur la page Parcours. Retire-la si tu préfères.
- **Veille** (`src/data/veille.ts`) : deux entrées du journal viennent d'une recherche web rapide : le report de
  l'AI Act (« omnibus numérique », été 2026, à vérifier sur EUR-Lex) et le Panorama de la cybermenace 2025 de
  l'ANSSI (mars 2026, sur cyber.gouv.fr). Ajoute surtout **tes** articles, en haut de `JOURNAL`.
- **Ce portfolio** : sa fiche dit qu'il a été développé avec l'aide d'un assistant IA (Claude Code). Garde-le ou
  reformule, mais reste transparent si on te pose la question.
- **Mentions légales** : l'hébergeur indiqué est Vercel. Si tu passes par Netlify, change `HOST` dans
  `src/pages/LegalPage.tsx`.

## 4. Pas intégré

- La convention de stage, l'attestation de rendez-vous et le tableau de suivi (vierges), la lettre de
  motivation (adressée à l'INERIS) et le CV en PDF (il contient ton téléphone et ton adresse). À la place, la
  page `/cv` montre ton CV avec seulement ton e-mail, et s'imprime en PDF.
- Les captures d'écran : en plus du document, une fiche peut en montrer. Mets les images dans
  `public/preuves/` et ajoute à la fiche
  `shots: [{ src: "/preuves/glpi-tickets.png", caption: "Les quatre tickets dans GLPI" }]`.
