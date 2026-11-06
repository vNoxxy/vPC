import type { Realisation } from "../types";

export const BLOC1: Realisation[] = [
  {
    slug: "charte-informatique",
    title: "Appliquer la charte informatique de Rostand NetInfo",
    wordmark: "Charte informatique",
    summary: "Dix situations de salariés : fraude ou non ? Chaque réponse s'appuie sur un article de la charte.",
    category: "bloc1",
    from: "03/09/26",
    format: "TD individuel",
    context:
      "Rostand NetInfo est une entreprise de services numériques (infogérance, cloud, travail collaboratif, sécurité). Pour rassurer ses clients, elle a adopté une charte d'utilisation des ressources informatiques, en vigueur depuis le 1er septembre 2026.",
    need: "Vérifier que la charte est comprise et applicable : pour dix situations vécues par des salariés, dire s'il y a fraude et pourquoi, en s'appuyant sur le texte.",
    contribution:
      "J'ai lu la charte et ses deux annexes (dispositions légales, conseils de cybersécurité), puis j'ai analysé seul les dix situations en citant à chaque fois la règle concernée : authentification, règles de sécurité, usage d'Internet, IA générative, téléphone, équipements nomades.",
    tools: ["Charte informatique", "Loi Informatique et Libertés / RGPD", "Loi Godfrain", "Google Docs"],
    difficulty:
      "Certaines situations ne sont pas tranchées : la charte tolère un usage personnel « raisonnable » d'Internet et du téléphone, sans fixer de limite chiffrée.",
    solution:
      "Pour chaque cas, j'ai cherché la règle la plus précise qui s'applique (les appels internationaux limités selon les postes, l'interdiction expresse de l'IA générative, le chiffrement des supports nomades) et je l'ai citée, plutôt que de répondre au ressenti.",
    competences: { patrimoine: [5, 1] },
    proofs: ["Document réponse « Chapitre 1 – La charte informatique » : les dix situations analysées et justifiées."],
    bilan:
      "Une charte n'est utile que si on sait l'appliquer à un cas concret. J'ai appris à justifier une décision par un article précis : c'est ce qu'il faudra faire pour sensibiliser un utilisateur sans le braquer.",
    work: [
      {
        title: "Dossier 1 — Le salarié fraude-t-il ?",
        answers: [
          {
            n: "1",
            q: "Arthur colle son identifiant et son mot de passe sur un post-it pour que l'informaticien puisse se connecter en son absence.",
            a: ["Arthur est en faute : la charte demande de ne jamais confier son identifiant ni son mot de passe. Les moyens d'authentification sont personnels et confidentiels, même pour aider l'informaticien."],
          },
          {
            n: "2",
            q: "Mohammed donne un jeu sur clé USB à Djibril pour qu'il l'installe sur son poste et joue pendant la pause.",
            a: [
              "Ils sont tous les deux en faute : la charte interdit d'installer un logiciel sans autorisation, et une clé USB non vérifiée peut faire entrer un virus (toute copie sur ou depuis un support externe doit être autorisée).",
            ],
            fixed: true,
            note: "Ajouté : la règle « ne pas installer de logiciels sans autorisation », plus précise que « jouer est interdit » (la charte ne l'interdit pas en tant que tel).",
          },
          {
            n: "3",
            q: "Kévin éteint son ordinateur avant de rentrer chez lui le soir.",
            a: ["Kévin n'est pas en fraude : en éteignant son ordinateur, il ferme sa session. Il respecte la charte, qui demande de verrouiller son poste dès qu'on le quitte."],
          },
          {
            n: "4",
            q: "Darryl regarde des films sur Netflix tout en travaillant.",
            a: ["Darryl est en faute : la charte tolère un usage personnel d'Internet ponctuel et raisonnable. Regarder des films pendant ses heures de travail ne l'est pas, perturbe son travail et charge le réseau."],
          },
          {
            n: "5",
            q: "Amadou crée un virus et le fait copier par Sayed sur son ordinateur, pour faire une blague.",
            a: [
              "Amadou est en fraude et risque une sanction : même pour une blague, un virus nuit au fonctionnement des outils et met en danger les fichiers sensibles. C'est aussi un délit puni par la loi Godfrain (articles 323-1 à 323-3 du Code pénal), citée en annexe de la charte.",
            ],
            fixed: true,
            note: "Ajouté : la loi Godfrain, citée dans l'annexe 1 de la charte.",
          },
          {
            n: "6",
            q: "Killian reçoit un mail de « Free » envoyé depuis une adresse Google, qui lui demande de payer son forfait. Il le transmet à un informaticien.",
            a: ["Killian a bien réagi : face à un mail douteux, il a suivi le comportement décrit par la charte en le faisant vérifier par le service informatique au lieu de cliquer."],
          },
          {
            n: "7",
            q: "Mathis télécharge le nouvel album de son chanteur préféré pour l'écouter en travaillant.",
            a: [
              "Mathis est en fraude : son poste de travail sert à un usage professionnel, et télécharger un contenu non vérifié peut faire entrer un logiciel malveillant et provoquer une fuite de données de l'entreprise.",
            ],
          },
          {
            n: "8",
            q: "Marcus veut utiliser ChatGPT pour rédiger un courrier juridique.",
            a: ["Marcus ne peut pas utiliser ChatGPT : la charte interdit expressément les outils d'intelligence artificielle générative, pour quelque raison que ce soit."],
          },
          {
            n: "9",
            q: "Anass appelle sa famille partie en vacances à l'étranger avec son téléphone portable professionnel.",
            a: [
              "L'usage privé du téléphone est admis tant qu'il reste raisonnable, mais un appel vers l'étranger coûte cher à l'entreprise et certains postes sont limités aux appels nationaux. Anass doit utiliser son téléphone personnel.",
            ],
            fixed: true,
            note: "Nuancé : la charte admet un usage privé raisonnable du téléphone ; ce sont le coût et la limitation des appels internationaux qui posent problème.",
          },
          {
            n: "10",
            q: "Karim garde les plans de son prochain chantier sur une clé USB non chiffrée.",
            a: [
              "Karim ne respecte pas la charte : les équipements nomades (clés USB, ordinateurs portables…) qui contiennent des documents sensibles doivent être sécurisés par chiffrement. Il doit chiffrer sa clé.",
            ],
            fixed: true,
            note: "Précisé avec la règle des équipements nomades (chiffrement).",
          },
        ],
      },
    ],
  },
  {
    slug: "refroidissement",
    title: "Exposé : le système de refroidissement d'un ordinateur",
    wordmark: "Refroidissement",
    summary: "À quoi sert un système de refroidissement, comment il évacue la chaleur, et ce qui arrive quand il défaille.",
    category: "bloc1",
    from: "03/09/26",
    to: "07/09/26",
    format: "Exposé individuel",
    context: "Chapitre 2 du Bloc 1, « Les clients » : chaque étudiant présente un composant d'un poste de travail.",
    need: "Expliquer clairement un composant : son rôle, sa composition, son fonctionnement, et les conséquences d'une défaillance.",
    contribution:
      "J'ai choisi le système de refroidissement, fait les recherches et rédigé la fiche en cinq parties : présentation, objectif, composition, fonctionnement, conséquences.",
    tools: ["Google Docs", "Documentation des constructeurs"],
    difficulty: "Rendre le trajet de la chaleur clair pour quelqu'un qui n'est pas technicien, avec deux technologies différentes : l'air et le liquide.",
    solution:
      "J'ai décrit le même trajet en trois temps pour les deux : récupérer la chaleur au contact du composant, la transporter, puis l'évacuer par l'air.",
    competences: { patrimoine: [0], incidents: [1] },
    proofs: ["Fiche « Chapitre 2 – Les clients » en cinq parties."],
    bilan:
      "Connaître le matériel aide à diagnostiquer : des ralentissements ou des plantages peuvent venir d'une surchauffe et pas d'un logiciel. C'est une piste à vérifier avant de réinstaller un poste.",
    work: [
      {
        title: "La fiche",
        answers: [
          {
            n: "1",
            q: "Présentation",
            a: [
              "Un système de refroidissement évite la surchauffe des composants d'un ordinateur, principalement le processeur et la carte graphique. Il évacue la chaleur qu'ils produisent vers l'extérieur de l'ordinateur.",
            ],
          },
          {
            n: "2",
            q: "Objectif",
            a: ["Maintenir les composants à une température correcte, pour que l'ordinateur fonctionne bien et éviter les problèmes liés à une température trop élevée."],
          },
          {
            n: "3",
            q: "Composition",
            a: [
              "Il existe principalement deux types de refroidissement :",
              { list: ["par air, avec un radiateur et un ou plusieurs ventilateurs ;", "liquide, avec un liquide qui transporte la chaleur jusqu'à un radiateur."] },
              "Dans les deux cas, un élément en contact avec le composant récupère la chaleur, puis un système l'évacue.",
            ],
          },
          {
            n: "4",
            q: "Fonctionnement",
            a: [
              "Le processeur ou la carte graphique produit de la chaleur en fonctionnant. Le système la récupère puis la déplace là où elle peut être évacuée.",
              "Par air, un radiateur absorbe la chaleur et un ventilateur fait circuler l'air pour l'évacuer. En liquide, le liquide circule jusqu'à un radiateur, où la chaleur est évacuée par l'air. La carte mère surveille la température et adapte la vitesse des ventilateurs.",
            ],
          },
          {
            n: "5",
            q: "Conséquences d'un mauvais refroidissement",
            a: [
              "Une surchauffe fait baisser les performances (le processeur ralentit pour se protéger), provoque des ralentissements et des plantages et, à long terme, abîme le matériel ou réduit sa durée de vie.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "poste-windows",
    title: "Installer et paramétrer un poste client Windows 10",
    wordmark: "Poste Windows",
    summary: "Machine virtuelle, réseau et proxy, logiciels libres, partition de données, comptes et droits, ligne de commande.",
    category: "bloc1",
    from: "17/09/26",
    to: "25/09/26",
    format: "TP individuel",
    context:
      "Rostand NetInfo doit installer un poste pour un nouveau collaborateur. Il faut d'abord se renseigner sur le système d'exploitation, puis installer et paramétrer le poste.",
    need: "Livrer un poste Windows 10 prêt à l'emploi : connecté à Internet, équipé de logiciels libres, avec les données séparées du système et des comptes aux bons droits.",
    contribution:
      "J'ai créé et installé la machine virtuelle, paramétré la carte réseau et le proxy, installé Firefox, LibreOffice et 7-Zip, créé une partition « Données » pour y déplacer les dossiers de l'utilisateur, créé trois comptes et testé leurs droits, puis rédigé les procédures et testé les commandes de base.",
    tools: ["VirtualBox", "Windows 10", "Gestion des disques", "Invite de commandes", "Firefox", "LibreOffice", "7-Zip"],
    difficulty: "Créer une seconde partition sur un disque déjà occupé par Windows, sans perdre le système.",
    solution:
      "Je suis passé par la Gestion des disques : réduire le volume C: de 10 000 Mo, puis créer un nouveau volume simple dans l'espace libéré, lettre F:, nommé « Données », et y déplacer les dossiers de l'utilisateur.",
    competences: { service: [1, 0], patrimoine: [2, 4], incidents: [1] },
    proofs: ["Document « Chapitre 2 – Les clients TP1 » : réponses, procédures et captures d'écran.", "Le tableau des commandes de l'invite de commandes, testées une à une."],
    bilan:
      "Séparer le système des données et donner à chacun le bon type de compte, ce sont deux réflexes simples qui évitent de perdre des données ou de laisser un utilisateur abîmer son poste.",
    work: [
      {
        title: "Dossier 1 — Renseignements sur le système",
        answers: [
          {
            n: "1.1",
            q: "Combien de RAM faut-il pour faire fonctionner Windows 10 ?",
            a: ["Au minimum 1 Go en 32 bits et 2 Go en 64 bits. Pour travailler confortablement, il vaut mieux 4 Go ou plus."],
            added: true,
          },
          {
            n: "1.2",
            q: "Combien d'espace disque faut-il pour installer et paramétrer Windows 10 ?",
            a: ["32 Go au minimum pour la version 64 bits (16 Go en 32 bits), plus la place des logiciels, des mises à jour et des données."],
            added: true,
          },
          {
            n: "1.3",
            q: "Quelles sont les différentes éditions de Windows 10 ?",
            a: ["Famille, Professionnel, Entreprise, Éducation, Pro Éducation, Pro for Workstations, Entreprise LTSC (support à long terme) et IoT pour les objets connectés."],
            added: true,
          },
        ],
      },
      {
        title: "Dossier 2 — Installation sur VirtualBox",
        answers: [
          {
            n: "2.1",
            q: "Créer une machine virtuelle nommée « Windows 10 » (procédure).",
            a: [
              {
                steps: [
                  "Dans VirtualBox, cliquer sur « Nouvelle ».",
                  "Nom : Windows 10 ; type : Microsoft Windows ; version : Windows 10 (64-bit) ; choisir le fichier ISO de Windows 10.",
                  "Mémoire : 4 096 Mo ; processeurs : 2.",
                  "Créer un disque dur virtuel VDI de 50 Go, alloué dynamiquement.",
                  "Cliquer sur « Terminer ».",
                ],
              },
            ],
            added: true,
          },
          {
            n: "2.2",
            q: "Installer Windows 10 (procédure).",
            a: [
              {
                steps: [
                  "Démarrer la machine virtuelle : elle démarre sur l'ISO.",
                  "Choisir la langue et le clavier français, puis « Installer maintenant ».",
                  "« Je n'ai pas de clé de produit », puis choisir l'édition (Professionnel) et accepter la licence.",
                  "Choisir l'installation « Personnalisée », sélectionner l'espace non alloué du disque, « Suivant ».",
                  "Attendre la copie des fichiers et les redémarrages, puis suivre la configuration (région, clavier, compte).",
                ],
              },
            ],
            added: true,
          },
          {
            n: "2.3",
            q: "Créer un compte à son prénom et NOM avec le mot de passe donné par l'énoncé.",
            a: [
              "Pendant la configuration : « Compte hors connexion », puis « Expérience limitée ». Nom du compte : Timéo VAAST, mot de passe de l'énoncé, puis les trois questions de sécurité.",
            ],
            added: true,
          },
          {
            n: "2.4",
            q: "Que conseille la CNIL pour la création des mots de passe ?",
            a: ["Des mots de passe longs, complexes et uniques : au moins 12 caractères de types différents, ou une phrase de passe d'au moins 7 mots, sans jamais réutiliser un mot de passe."],
          },
          {
            n: "2.5",
            q: "Réaliser une procédure utilisateur pour le choix d'un mot de passe.",
            a: [
              {
                steps: [
                  "Saisir un mot de passe qui respecte les recommandations de la CNIL.",
                  "Vérifier qu'il n'est pas trop courant ni déjà compromis.",
                  "Demander une confirmation du mot de passe.",
                  "Ne jamais conserver ni afficher le mot de passe en clair.",
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Dossier 3 — Les logiciels",
        answers: [
          {
            n: "3.1",
            q: "Paramétrer la carte réseau et le proxy pour accéder à Internet (procédure).",
            a: [
              {
                steps: [
                  "Paramètres > Réseau et Internet > Ethernet : vérifier que la carte est connectée et obtient son adresse automatiquement (DHCP).",
                  "Paramètres > Réseau et Internet > Proxy > « Configuration manuelle du proxy » : activer « Utiliser un serveur proxy ».",
                  "Saisir l'adresse et le port du proxy de l'établissement, puis « Enregistrer ».",
                  "Ouvrir le navigateur et charger une page pour vérifier l'accès à Internet.",
                ],
              },
            ],
            added: true,
          },
          {
            n: "3.2",
            q: "Qu'est-ce qu'un logiciel open source ? Donner un exemple pour naviguer, faire du traitement de texte et compresser un fichier.",
            a: [
              "Un logiciel open source est un logiciel dont le code source est accessible au public : on peut l'étudier, le modifier et souvent le redistribuer selon sa licence. Exemples : Mozilla Firefox pour naviguer, LibreOffice Writer pour le traitement de texte, 7-Zip pour compresser.",
            ],
          },
          {
            n: "3.3",
            q: "Installer ces logiciels (une procédure par logiciel).",
            a: [
              "Les trois installations suivent les mêmes étapes :",
              {
                steps: [
                  "Télécharger le logiciel depuis son site officiel (pour LibreOffice, la version Windows x86-64).",
                  "Ouvrir le fichier d'installation téléchargé.",
                  "Suivre les étapes de l'assistant d'installation.",
                  "Cliquer sur « Installer », puis vérifier que le logiciel se lance.",
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Dossier 4 — Paramétrages",
        answers: [
          {
            n: "4.1",
            q: "Que faire pour ne pas perdre toutes ses données en cas de crash de Windows ?",
            a: ["Faire des sauvegardes régulières de la machine pour pouvoir la restaurer, et garder les données sur une autre partition que le système : si Windows doit être réinstallé, les données restent."],
            fixed: true,
            note: "Ajouté : l'intérêt de la partition séparée, qui fait le lien avec la question 4.2.",
          },
          {
            n: "4.2",
            q: "Réduire C: pour créer une seconde partition F: nommée « Données » (procédure).",
            a: [
              {
                steps: [
                  "Clic droit sur le menu Démarrer > « Gestion des disques ».",
                  "Clic droit sur le volume C: > « Réduire le volume », quantité : 10 000 Mo.",
                  "Clic droit sur l'espace non alloué, à droite de C: > « Nouveau volume simple ».",
                  "Lettre F:, système de fichiers NTFS, nom de volume « Données », puis « Terminer ».",
                ],
              },
            ],
            fixed: true,
            note: "Complété : la lettre F: et le système de fichiers NTFS demandés par l'énoncé.",
          },
          {
            n: "4.3",
            q: "Déplacer les données de l'utilisateur (Documents, Téléchargements, Images, Musique, Vidéos) (procédure).",
            a: [
              {
                steps: [
                  "Dans F:, créer les dossiers Documents, Téléchargements, Images, Musique et Vidéos.",
                  "Dans l'Explorateur, clic droit sur le dossier Documents de l'utilisateur > Propriétés > onglet « Emplacement ».",
                  "« Déplacer… », choisir F:\\Documents, « Appliquer », puis « Oui » pour déplacer les fichiers.",
                  "Recommencer pour Téléchargements, Images, Musique et Vidéos.",
                ],
              },
            ],
            fixed: true,
            note: "Complété : la réponse ne listait que les dossiers à créer, j'ai ajouté le déplacement par l'onglet Emplacement.",
          },
        ],
      },
      {
        title: "Dossier 5 — Les comptes utilisateurs",
        answers: [
          {
            n: "5.1",
            q: "Créer le compte du binôme (administrateur) et le compte Dupont DUPONT (utilisateur standard) (procédure).",
            a: [
              {
                steps: [
                  "Paramètres > Comptes > Famille et autres utilisateurs > « Ajouter un autre utilisateur sur ce PC ».",
                  "« Je ne dispose pas des informations de connexion de cette personne » > « Ajouter un utilisateur sans compte Microsoft ».",
                  "Saisir le nom et le mot de passe de l'énoncé.",
                  "Pour le binôme : « Modifier le type de compte » > Administrateur. Dupont DUPONT reste « Utilisateur standard ».",
                ],
              },
              "La même chose en ligne de commande (invite de commandes en administrateur), l'étoile faisant demander le mot de passe :",
              { code: 'net user Binome * /add\nnet localgroup Administrateurs Binome /add\nnet user Dupont * /add /fullname:"Dupont DUPONT"', lang: "cmd" },
            ],
            added: true,
          },
          {
            n: "5.2",
            q: "Quelles différences entre un compte « Administrateur » et un compte « Utilisateur standard » ?",
            a: ["Le compte administrateur a un contrôle total sur le système (installer des logiciels, modifier les réglages, gérer les autres comptes), alors que l'utilisateur standard n'a que des actions limitées, pour des raisons de sécurité."],
          },
        ],
      },
      {
        title: "Dossier 6 — Les droits des comptes",
        answers: [
          {
            n: "6.1",
            q: "Avec le compte du binôme : changer le fond d'écran, l'emplacement des documents, désinstaller le traitement de texte, créer un fichier texte.",
            a: [
              "Tout fonctionne : le compte est administrateur. LibreOffice se désinstalle depuis Paramètres > Applications, et le fichier texte est créé dans ses Documents avec le Bloc-notes.",
            ],
            added: true,
          },
          {
            n: "6.2",
            q: "Avec Dupont DUPONT : mêmes réglages, ouvrir le fichier du binôme, installer le traitement de texte. Que remarque-t-on ?",
            a: [
              "Le fond d'écran et ses propres dossiers se modifient : ce sont ses réglages. En revanche, le fichier du binôme est inaccessible (accès refusé : chaque profil est protégé), et l'installation de LibreOffice demande le mot de passe d'un administrateur (contrôle de compte d'utilisateur).",
            ],
            added: true,
          },
          {
            n: "6.3",
            q: "Supprimer l'utilisateur Dupont DUPONT : que deviennent ses données ?",
            a: [
              "Windows propose « Supprimer le compte et les données » : le profil C:\\Users\\Dupont et tous ses fichiers sont effacés avec le compte. Il faut donc sauvegarder ce qui doit être gardé avant de supprimer un compte.",
            ],
            fixed: true,
            note: "Reformulé : la réponse d'origine parlait d'un « compte parent », qui n'existe pas ici.",
          },
          {
            n: "6.4",
            q: "Comment éviter de déplacer à la main les dossiers des prochains utilisateurs ?",
            a: [
              "Modifier le profil par défaut (C:\\Users\\Default), qui sert de modèle à chaque nouveau compte ; dans une entreprise avec un domaine, rediriger les dossiers par une stratégie de groupe (GPO « Redirection de dossiers ») vers F: ou un serveur de fichiers.",
            ],
            added: true,
          },
        ],
      },
      {
        title: "Dossier 7 — La ligne de commande Windows",
        answers: [
          {
            n: "7.1",
            q: "Qu'est-ce que « MS-DOS » ?",
            a: ["MS-DOS (Microsoft Disk Operating System) est un système d'exploitation en ligne de commande développé par Microsoft, utilisé avant que Windows devienne l'environnement graphique dominant. L'invite de commandes de Windows en garde les commandes."],
          },
          {
            n: "7.2",
            q: "Réaliser une procédure avec les actions demandées.",
            a: [
              {
                table: {
                  head: ["Action", "Commande"],
                  rows: [
                    ["Obtenir la liste des commandes", "help"],
                    ["Afficher son nom d'utilisateur", "whoami"],
                    ["Lister les fichiers et dossiers du dossier courant", "dir"],
                    ["Changer de lecteur", "D:"],
                    ["Aller dans le dossier Documents", "cd Documents"],
                    ["Créer un dossier Exercices", "mkdir Exercices"],
                    ["Créer un dossier Test", "mkdir Test"],
                    ["Copier le fichier Test dans le dossier Test", "copy Test Test\\"],
                    ["Déplacer le fichier Test dans le dossier Exercices", "move Test Exercices\\"],
                    ["Aller dans le dossier Exercices", "cd Exercices"],
                    ["Retourner dans le dossier Documents", "cd .."],
                    ["Afficher le dossier courant", "cd"],
                    ["Supprimer le dossier Exercices", "rmdir Exercices"],
                    ["Supprimer le dossier Test", "rmdir Test"],
                    ["Donner l'adresse IP", "ipconfig"],
                    ["Tester la connectivité avec le poste du voisin", "ping <adresse IP du voisin>"],
                    ["Trouver la route vers www.google.fr", "tracert www.google.fr"],
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "poste-ubuntu",
    title: "Installer et paramétrer un poste client Ubuntu",
    wordmark: "Poste Ubuntu",
    summary: "Le même poste qu'en Windows, sous Linux : machine virtuelle, réseau au terminal, proxy, comptes et droits.",
    category: "bloc1",
    from: "25/09/26",
    to: "01/10/26",
    format: "TP individuel",
    context: "Toujours pour Rostand NetInfo : le nouveau collaborateur travaille cette fois sur un poste Linux.",
    need: "Se renseigner sur Ubuntu, l'installer dans une machine virtuelle, le connecter à Internet derrière le proxy, puis créer des comptes et vérifier leurs droits.",
    contribution:
      "J'ai créé la machine virtuelle et installé Ubuntu, connecté l'interface réseau en ligne de commande, réglé le proxy, créé les comptes administrateur et standard, et comparé ce que chacun peut faire.",
    tools: ["VirtualBox", "Ubuntu Desktop", "Terminal (ip, nmcli, adduser)", "Paramètres d'Ubuntu"],
    difficulty: "Une fois installée, la machine virtuelle n'avait pas accès à Internet : son interface réseau n'était pas connectée.",
    solution:
      "J'ai trouvé le nom de l'interface avec `ip a`, puis je l'ai connectée avec `sudo nmcli device connect <interface>`, avant de régler le proxy dans les paramètres réseau.",
    competences: { service: [1], patrimoine: [2], incidents: [1] },
    proofs: ["Document « Ubuntu TP – Timeo Vaast » : réponses, procédures et captures d'écran.", "Les commandes de diagnostic et de connexion réseau utilisées."],
    bilan:
      "Les mêmes besoins (comptes, droits, réseau) se règlent différemment sous Windows et sous Linux. Le terminal fait peur au début, mais il va plus vite une fois qu'on connaît les commandes, et il marche aussi sur un serveur sans écran.",
    work: [
      {
        title: "Dossier 1 — Renseignements sur le système",
        answers: [
          { n: "1.1", q: "Combien de RAM faut-il pour faire fonctionner Ubuntu ?", a: ["Pour la version de bureau d'Ubuntu, il faut au minimum 6 Go de RAM."] },
          { n: "1.2", q: "Combien d'espace disque faut-il pour installer et paramétrer Ubuntu ?", a: ["Il faut au minimum 25 Go d'espace disque disponible."] },
          {
            n: "1.3",
            q: "Quelles sont les différentes éditions d'Ubuntu ?",
            a: ["Ubuntu existe en version LTS (support long) ou intermédiaire, et en éditions Desktop, Server et Core (objets connectés), ainsi qu'en variantes officielles comme Kubuntu, Xubuntu ou Lubuntu."],
          },
        ],
      },
      {
        title: "Dossier 2 — Installation sur VirtualBox",
        answers: [
          {
            n: "2.1",
            q: "Créer une machine virtuelle nommée « Ubuntu » (procédure).",
            a: [
              {
                steps: [
                  "Dans VirtualBox, cliquer sur « Nouvelle ».",
                  "Entrer les informations de la machine : nom Ubuntu, l'ISO d'Ubuntu, la mémoire et la taille du disque.",
                  "Cliquer sur « Finish » pour créer la machine.",
                ],
              },
            ],
          },
          {
            n: "2.2",
            q: "Installer Ubuntu (procédure).",
            a: [
              {
                steps: [
                  "Démarrer la machine virtuelle sur l'ISO et choisir « Install Ubuntu ».",
                  "Choisir la langue (français) et la disposition du clavier.",
                  "Choisir l'installation interactive, puis la sélection d'applications par défaut.",
                  "Type d'installation : « Effacer le disque et installer Ubuntu » (le disque virtuel est vide).",
                  "Choisir le fuseau horaire, créer le compte, lancer l'installation, puis redémarrer.",
                ],
              },
            ],
            added: true,
          },
          {
            n: "2.3",
            q: "Créer un compte à son prénom et NOM avec le mot de passe donné par l'énoncé.",
            a: ["À l'étape « Créer votre compte » de l'installation : nom Timéo VAAST, nom d'utilisateur timeo, mot de passe de l'énoncé, « Demander mon mot de passe pour ouvrir une session »."],
            added: true,
          },
          { n: "2.4", q: "Qui est le créateur de Linux ?", a: ["Le créateur de Linux est Linus Torvalds."] },
          {
            n: "2.5",
            q: "Réaliser un historique de Linux.",
            a: [
              {
                table: {
                  head: ["Année", "Événement"],
                  rows: [
                    ["1969", "Ken Thompson et Dennis Ritchie créent UNIX aux laboratoires Bell d'AT&T."],
                    ["1983", "Richard Stallman lance le projet GNU : un système libre compatible UNIX."],
                    ["1991", "Linus Torvalds, étudiant finlandais, annonce le noyau Linux et publie sa première version."],
                    ["1992", "Linux passe sous licence libre GPL : avec les outils GNU, il forme un système complet."],
                    ["1993", "Naissance de Debian, l'une des plus anciennes distributions."],
                    ["2004", "Canonical publie la première version d'Ubuntu, basée sur Debian."],
                    ["2008", "Android, basé sur le noyau Linux, arrive sur les téléphones."],
                    ["Aujourd'hui", "Linux fait tourner la plupart des serveurs du web, les superordinateurs et les téléphones Android."],
                  ],
                },
              },
            ],
            added: true,
          },
        ],
      },
      {
        title: "Dossier 3 — Réseau et proxy",
        answers: [
          {
            n: "3.1",
            q: "Paramétrer la carte réseau et le proxy pour accéder à Internet (procédure).",
            a: [
              {
                steps: [
                  "Ouvrir le terminal et entrer `ip a` pour faire apparaître le nom de l'interface réseau.",
                  "Entrer `sudo nmcli device connect eth0`, en remplaçant eth0 par le nom de l'interface.",
                  "Paramètres > Réseau > Proxy réseau : choisir « Manuel » et saisir l'adresse et le port du proxy de l'établissement.",
                  "Ouvrir Firefox et charger une page pour vérifier l'accès à Internet.",
                ],
              },
            ],
            fixed: true,
            note: "Complété : le réglage du proxy, que la réponse d'origine ne donnait pas.",
          },
          {
            n: "3.2",
            q: "Qu'est-ce qu'un proxy ?",
            a: ["Un proxy est un composant logiciel ou matériel qui sert d'intermédiaire entre un utilisateur et Internet : il achemine les requêtes, peut masquer l'adresse IP et filtrer les contenus."],
          },
          { n: "3.3", q: "Quels logiciels de proxy existent ?", a: ["Squid, HAProxy, Nginx, Privoxy…"] },
        ],
      },
      {
        title: "Dossier 4 — Les comptes utilisateurs",
        answers: [
          {
            n: "4.1",
            q: "Créer le compte du binôme (administrateur) et le compte Kirito ASUNA (standard) (procédure).",
            a: [
              {
                steps: [
                  "Ouvrir le terminal.",
                  "Entrer `sudo adduser nom_utilisateur`, en remplaçant par le vrai nom d'utilisateur, puis saisir le mot de passe souhaité.",
                  "Pour le binôme, donner les droits d'administration en l'ajoutant au groupe sudo. Kirito reste un utilisateur standard.",
                ],
              },
              { code: "sudo adduser binome\nsudo usermod -aG sudo binome\nsudo adduser kirito", lang: "bash" },
            ],
            fixed: true,
            note: "Ajouté : la commande qui rend le binôme administrateur (groupe sudo).",
          },
          {
            n: "4.2",
            q: "Quelles différences entre le compte « Administrateur » et le compte « Utilisateur standard » ?",
            a: ["L'administrateur peut pratiquement tout faire et possède tous les droits, alors que l'utilisateur standard ne peut pas modifier les paramètres du système et a une utilisation limitée."],
          },
        ],
      },
      {
        title: "Dossier 5 — Les droits des comptes",
        answers: [
          {
            n: "5.1",
            q: "Avec le compte du binôme : fond d'écran, emplacement des documents, désinstaller le traitement de texte, créer un fichier texte.",
            a: ["Tout fonctionne : la désinstallation de LibreOffice Writer demande le mot de passe du binôme, qui l'accepte puisqu'il est administrateur. Le fichier texte est créé dans ses Documents."],
            added: true,
          },
          {
            n: "5.2",
            q: "Avec Kirito ASUNA : mêmes réglages, ouvrir le fichier du binôme, installer le traitement de texte. Que remarque-t-on ?",
            a: [
              "Kirito peut changer son fond d'écran et ses propres dossiers. Il ne peut pas ouvrir le fichier du binôme (permission refusée : les dossiers personnels des autres sont protégés), ni installer LibreOffice : il faut le mot de passe d'un administrateur.",
            ],
            added: true,
          },
          {
            n: "5.3",
            q: "Supprimer l'utilisateur Kirito ASUNA : que deviennent ses données ?",
            a: [
              "Ubuntu demande s'il faut supprimer ou conserver ses fichiers. Si on les supprime, son dossier /home/kirito disparaît avec le compte ; en ligne de commande : `sudo deluser --remove-home kirito`.",
            ],
            fixed: true,
            note: "Reformulé : la réponse d'origine parlait d'un « compte parent », qui n'existe pas ici.",
          },
          {
            n: "5.4",
            q: "Comment éviter de déplacer à la main les dossiers des prochains utilisateurs ?",
            a: [
              "Préparer le modèle des nouveaux comptes : ce qui se trouve dans /etc/skel est copié dans chaque nouveau dossier personnel, et le fichier /etc/xdg/user-dirs.defaults fixe l'emplacement par défaut des dossiers Documents, Images, Musique…",
            ],
            fixed: true,
            note: "Remplacé : la réponse d'origine (« la synchronisation des comptes ») ne répondait pas à la question.",
          },
        ],
      },
    ],
  },
  {
    slug: "glpi",
    title: "Installer GLPI sur un serveur Debian",
    wordmark: "GLPI",
    summary: "Un serveur Debian sans interface graphique, la pile Apache, MariaDB et PHP, puis GLPI : comptes, parc et tickets.",
    category: "bloc1",
    from: "01/10/26",
    to: "15/10/26",
    format: "TP individuel",
    context:
      "L'entreprise ROSTAND, prestataire informatique, veut suivre le parc et les demandes de ses clients avec GLPI, un logiciel libre de gestion de parc et d'assistance (helpdesk).",
    need: "Installer un serveur Debian sans interface graphique, y déployer GLPI, puis l'utiliser : créer les comptes, inventorier le parc et ouvrir des tickets.",
    contribution:
      "J'ai répondu aux questions sur Linux, identifié les logiciels nécessaires (serveur web, base de données, PHP), installé Debian en mode texte dans VirtualBox, déployé GLPI, sécurisé l'installation, puis créé les comptes, les éléments du parc et les tickets demandés.",
    tools: ["VirtualBox", "Debian (CLI)", "Apache2", "MariaDB", "PHP", "GLPI"],
    difficulty: "Sans interface graphique, tout se fait au terminal, et GLPI refuse de s'installer tant qu'il manque une extension PHP.",
    solution:
      "J'ai installé toute la pile en une commande, contrôlé la liste des prérequis que GLPI vérifie au début de l'installation, puis supprimé install.php pour qu'on ne puisse pas relancer l'installation et écraser la base.",
    competences: { patrimoine: [0, 2], incidents: [0], service: [1] },
    proofs: ["Document « GLPI – Timeo Vaast » : réponses et procédures.", "Les commandes d'installation de la pile et de GLPI.", "Les comptes, le parc et les tickets créés dans GLPI."],
    bilan:
      "Un outil de gestion de parc ne sert que si chacun a le bon profil : un observateur consulte, un technicien traite les tickets, seul l'administrateur configure. C'est le principe des habilitations appliqué à un vrai service.",
    work: [
      {
        title: "Dossier 1 — Questions sur Linux",
        answers: [
          { n: "1.1", q: "Qu'est-ce que Linux ?", a: ["Linux est un système d'exploitation gratuit et open source qui permet aux logiciels de fonctionner ; beaucoup de systèmes l'utilisent."] },
          { n: "1.2", q: "Qu'est-ce qu'un noyau ?", a: ["C'est le cœur du système d'exploitation : il fait le lien entre le matériel informatique et les programmes."] },
          {
            n: "1.3",
            q: "Qu'est-ce qu'UNIX ?",
            a: ["Un système d'exploitation historique créé dans les années 1970 aux laboratoires Bell d'AT&T. Il a posé les bases de l'informatique moderne (multitâche, multi-utilisateur)."],
          },
          {
            n: "1.4",
            q: "Qu'est-ce que Debian ?",
            a: ["C'est une distribution majeure et populaire de Linux : elle associe le noyau Linux à des milliers de logiciels libres pour former un système prêt à l'emploi."],
          },
          {
            n: "1.5",
            q: "Faut-il télécharger la distribution « stable » ou « testing » ?",
            a: ["Il faut installer la distribution stable, pour ne pas rencontrer de problèmes : la version testing n'est pas encore entièrement vérifiée ni corrigée."],
          },
          { n: "1.6", q: "Différence entre Debian en mode CLI et en mode GUI ?", a: ["Le mode CLI n'a qu'un écran texte (ligne de commande), tandis que le mode GUI a une interface graphique complète."] },
          {
            n: "1.7",
            q: "Qu'est-ce que GRUB ? Est-il indispensable ?",
            a: ["GRUB (GRand Unified Bootloader) est un chargeur d'amorçage : le tout premier programme lancé au démarrage de l'ordinateur, qui charge le système. Oui, il est indispensable pour démarrer Debian."],
          },
          { n: "1.8", q: "Espace disque à prévoir avec et sans interface graphique ?", a: ["Il faut prévoir au minimum 4 Go sans interface graphique (CLI) et 10 Go avec (GUI)."] },
          { n: "1.9", q: "RAM minimum avec et sans interface graphique ?", a: ["Il faut au minimum 512 Mo de RAM sans interface graphique et 1 Go avec."] },
        ],
      },
      {
        title: "Dossier 2 — Installation de Debian",
        answers: [
          {
            n: "2.1",
            q: "Quels logiciels installer pour disposer d'un serveur GLPI ?",
            a: ["Un serveur web (Apache2), un système de gestion de base de données (MariaDB), un interpréteur de code (PHP) et les extensions PHP dont GLPI a besoin (mysql, xml, curl, gd, intl, mbstring…)."],
          },
          {
            n: "2.2",
            q: "Procédure pas à pas de l'installation de Debian.",
            a: [
              {
                steps: [
                  "Dans VirtualBox, créer une machine Linux / Debian 64 bits : 2 Go de RAM, disque VDI de 20 Go, l'ISO netinst de Debian en lecteur.",
                  "Démarrer et choisir « Install » (l'installation en mode texte, sans interface graphique).",
                  "Langue français, pays France, clavier français.",
                  "Nom de la machine : glpi ; domaine laissé vide.",
                  "Définir le mot de passe du superutilisateur root, puis créer un utilisateur.",
                  "Partitionnement : « Assisté — utiliser un disque entier », « Tout dans une seule partition », puis écrire les modifications.",
                  "Miroir de l'archive : France, deb.debian.org.",
                  "Sélection des logiciels : décocher « Environnement de bureau Debian » et GNOME, garder « Serveur SSH » et « Utilitaires usuels du système ».",
                  "Installer GRUB sur le disque principal (/dev/sda), retirer l'ISO et redémarrer.",
                ],
              },
            ],
            added: true,
          },
        ],
      },
      {
        title: "Dossier 3 — Installation de GLPI",
        answers: [
          {
            n: "3.1",
            q: "Procédure pas à pas de l'installation de GLPI.",
            a: [
              "1. Installer la pile web (connecté en root avec `su -`) :",
              {
                code: "apt update && apt upgrade -y\napt install -y apache2 mariadb-server php libapache2-mod-php \\\n  php-mysql php-xml php-curl php-gd php-intl php-mbstring php-zip php-bz2 php-ldap",
                lang: "bash",
              },
              "2. Sécuriser MariaDB et créer la base de GLPI et son utilisateur :",
              {
                code: "mysql_secure_installation\nmysql -u root -p\n\nCREATE DATABASE glpi;\nCREATE USER 'glpi'@'localhost' IDENTIFIED BY 'un-mot-de-passe-fort';\nGRANT ALL PRIVILEGES ON glpi.* TO 'glpi'@'localhost';\nFLUSH PRIVILEGES;\nEXIT;",
                lang: "sql",
              },
              "3. Télécharger la dernière version stable de GLPI (github.com/glpi-project/glpi/releases), l'extraire dans le dossier du serveur web et la confier à Apache :",
              {
                code: "cd /tmp\nwget https://github.com/glpi-project/glpi/releases/download/<version>/glpi-<version>.tgz\ntar -xzf glpi-<version>.tgz -C /var/www/html/\nchown -R www-data:www-data /var/www/html/glpi\nsystemctl restart apache2",
                lang: "bash",
              },
              "4. Dans un navigateur, ouvrir http://<adresse IP du serveur>/glpi : choisir la langue, accepter la licence, « Installer », vérifier les prérequis, saisir la connexion à la base (localhost, glpi, le mot de passe), choisir la base glpi, puis terminer. Se connecter avec glpi / glpi et changer tout de suite les mots de passe des comptes par défaut (glpi, tech, normal, post-only).",
            ],
            added: true,
          },
          {
            n: "3.2",
            q: "Une fois GLPI installé, supprimer le fichier install.php (procédure).",
            a: [
              "GLPI l'affiche lui-même en alerte : tant que ce fichier existe, n'importe qui pourrait relancer l'installation et écraser la base.",
              { code: "rm /var/www/html/glpi/install/install.php", lang: "bash" },
              "Recharger GLPI : l'alerte a disparu.",
            ],
            added: true,
          },
        ],
      },
      {
        title: "Dossier 4 — Utilisation de GLPI",
        answers: [
          {
            n: "4.1",
            q: "Créer les comptes : moi (administrateur), mon voisin (observateur), Léo Landais (technicien), Carrie Bou (observateur).",
            a: [
              {
                steps: [
                  "Administration > Utilisateurs > « Ajouter ».",
                  "Saisir l'identifiant, le nom, le prénom et le mot de passe.",
                  "Dans l'onglet « Habilitations », donner le profil : Super-Admin pour moi, Technicien pour Léo Landais, Observateur pour mon voisin et pour Carrie Bou.",
                ],
              },
            ],
            added: true,
          },
          {
            n: "4.2",
            q: "Créer dans le parc : nos deux ordinateurs, nos deux moniteurs et un logiciel installé sur chacun.",
            a: [
              {
                steps: [
                  "Parc > Ordinateurs > « Ajouter » : nom, numéro de série, utilisateur, lieu. Une fiche par ordinateur.",
                  "Parc > Moniteurs > « Ajouter », puis relier chaque moniteur à son ordinateur (onglet « Connexions »).",
                  "Parc > Logiciels > « Ajouter » le logiciel, puis l'installer sur chaque ordinateur (onglet « Logiciels » de l'ordinateur).",
                ],
              },
            ],
            added: true,
          },
          {
            n: "4.3",
            q: "Créer quatre tickets : deux incidents et deux demandes, attribués ou non au technicien.",
            a: [
              {
                table: {
                  head: ["Ticket", "Type", "Élément associé", "Attribué à"],
                  rows: [
                    ["1", "Incident (assistance)", "Poste de mon voisin", "Personne"],
                    ["2", "Incident (assistance)", "Mon poste", "Léo Landais (technicien)"],
                    ["3", "Demande", "Poste de mon voisin", "Léo Landais (technicien)"],
                    ["4", "Demande", "Mon poste", "Personne"],
                  ],
                },
              },
              "Chaque ticket se crée par Assistance > Créer un ticket : type, titre, description, élément associé, puis acteur « Attribué à ».",
            ],
            added: true,
          },
        ],
      },
    ],
  },
  {
    slug: "reseaux-tcp-ip",
    title: "Les réseaux : types, topologies et modèle TCP/IP",
    wordmark: "Réseaux",
    summary: "Reconnaître un PAN, un LAN, un MAN et les topologies, puis placer chaque protocole dans sa couche TCP/IP.",
    category: "bloc1",
    from: "13/10/26",
    to: "15/10/26",
    format: "Exercices individuels",
    context: "Chapitres 4 et 5 du Bloc 1 : les réseaux, puis les modèles OSI et TCP/IP.",
    need: "Savoir reconnaître un type de réseau et une topologie, puis associer chaque couche du modèle TCP/IP à ses protocoles et à son matériel.",
    contribution: "J'ai fait les exercices sur les types de réseaux et les topologies, puis le premier dossier sur le modèle TCP/IP.",
    tools: ["Cours et schémas réseau", "Modèles OSI et TCP/IP"],
    difficulty: "Ne pas confondre les couches : j'avais d'abord placé IP dans la couche Accès réseau.",
    solution:
      "En reprenant le rôle de chaque couche (la trame et les adresses MAC, puis le paquet et les adresses IP, puis le segment et les ports), j'ai corrigé : Ethernet en couche 1, IP en couche 2.",
    competences: { incidents: [1] },
    proofs: ["Document « Réseaux » : les huit réponses de l'exercice.", "Exercice sur le modèle TCP/IP, dossier 1."],
    bilan: "Savoir à quelle couche se situe un problème (un câble, une adresse IP, un port fermé) permet de chercher une panne au bon endroit au lieu de tout essayer.",
    work: [
      {
        title: "Exercice — Les réseaux",
        answers: [
          { n: "1.1", q: "Je branche mon téléphone à mon ordinateur : quel type de réseau ?", a: ["C'est un réseau PAN (Personal Area Network)."] },
          { n: "1.2", q: "Un ordinateur communique avec le serveur de l'entreprise : quel type de réseau ?", a: ["C'est un réseau LAN (Local Area Network)."] },
          {
            n: "1.3",
            q: "Un salarié du bâtiment administratif doit joindre le site de production, dans la même ville : quel type de réseau ?",
            a: ["C'est un réseau MAN (Metropolitan Area Network)."],
          },
          { n: "1.4", q: "Premier schéma : quelle topologie ?", a: ["C'est une topologie en bus."] },
          { n: "1.5", q: "Deuxième schéma : quelle topologie ?", a: ["C'est une topologie en étoile."] },
          { n: "1.6", q: "Troisième schéma : quelle topologie ?", a: ["C'est une topologie en anneau."] },
          { n: "1.7", q: "Quelle topologie est la plus utilisée aujourd'hui ?", a: ["La topologie en étoile, autour d'un commutateur (switch)."] },
          { n: "1.8", q: "Quel protocole permet à deux ordinateurs de communiquer ?", a: ["Le protocole TCP/IP."] },
        ],
      },
      {
        title: "Exercice — Le modèle TCP/IP (dossier 1)",
        answers: [
          {
            n: "1.2",
            q: "La couche 1, Accès réseau, fabrique la trame avec les adresses physiques. Quel protocole utilise-t-elle ?",
            a: ["Ethernet (et le Wi-Fi sans fil), avec ARP qui retrouve l'adresse MAC correspondant à une adresse IP."],
            fixed: true,
            note: "Corrigé : la réponse d'origine était « IP », qui appartient à la couche 2 (Internet).",
          },
          { n: "1.3", q: "La couche 2, Internet, ajoute les adresses IP et route les paquets. Quel protocole ?", a: ["IP (et ICMP, utilisé par la commande ping)."], added: true },
          { n: "1.4", q: "La couche 3, Transport, découpe en segments et repère le service par son port. Quels protocoles ?", a: ["TCP (fiable, avec accusés de réception) et UDP (rapide, sans garantie)."], added: true },
          { n: "1.5", q: "La couche 4, Application, définit les requêtes et les réponses. Quels protocoles ?", a: ["HTTP et HTTPS, DNS, DHCP, FTP, SMTP, POP et IMAP, SSH…"], added: true },
          {
            n: "1.6",
            q: "Quels éléments matériels associer aux couches 1 et 2 ?",
            a: ["Couche 1 (Accès réseau) : la carte réseau, les câbles, le commutateur (switch) qui travaille avec les adresses MAC. Couche 2 (Internet) : le routeur, qui achemine les paquets d'un réseau à l'autre grâce aux adresses IP."],
            added: true,
          },
        ],
      },
    ],
  },
  {
    slug: "adressage-ipv4",
    title: "L'adressage IPv4 et le découpage en sous-réseaux",
    wordmark: "IPv4",
    summary: "Binaire, classes, masques, adresses réservées, puis le découpage d'une plage pour trois entreprises.",
    category: "bloc1",
    from: "02/11/26",
    to: "05/11/26",
    format: "Exercices individuels",
    context: "Chapitre 6 du Bloc 1 : l'adressage IPv4, de l'adresse physique (MAC) à l'adresse logique (IP).",
    need: "Lire une adresse IP (classe, réseau, hôte, particularités), dire si elle est valide, puis découper une plage d'adresses entre plusieurs réseaux.",
    contribution: "J'ai fait les conversions binaire et décimal, classé les adresses, repéré les adresses réservées et les adresses invalides, puis réalisé les deux découpages en sous-réseaux.",
    tools: ["Calcul binaire (puissances de 2)", "Masques et notation CIDR", "ipconfig", "ping"],
    difficulty: "Découper le bloc 162.18.132.0/22 entre trois entreprises de tailles différentes : 200, 200 et 450 adresses d'hôtes.",
    solution:
      "Commencer par la plus grande : 450 hôtes demandent 9 bits d'hôte (510 adresses utiles), donc un /23. Il reste exactement deux /24 de 254 hôtes pour A et B.",
    competences: { incidents: [1] },
    proofs: ["Document « Chapitre 6 – IPv4 » et la feuille de conversion binaire.", "Les tableaux de découpage en sous-réseaux."],
    bilan: "La conversion en binaire n'est pas un exercice pour rien : c'est elle qui explique le masque, l'adresse du réseau et celle de diffusion. Sans elle, un découpage en sous-réseaux reste de la magie.",
    work: [
      {
        title: "Dossier 1 — Exercices",
        answers: [
          {
            n: "1.1",
            q: "a) Écrire 10100000110000001000000011101011 en décimal pointé. b) Écrire 210.20.135.48 en binaire.",
            a: [
              "a) 10100000 . 11000000 . 10000000 . 11101011 = 160.192.128.235",
              "b) 210.20.135.48 = 11010010 . 00010100 . 10000111 . 00110000",
            ],
            fixed: true,
            note: "Le a) est la réponse d'origine ; le b) a été ajouté.",
          },
          {
            n: "1.2",
            q: "193.20.73.12 est une adresse de classe C. Quels octets identifient son réseau, et sa machine ?",
            a: ["Le réseau est identifié par les trois premiers octets (193.20.73), la machine par le dernier (12)."],
            added: true,
          },
          {
            n: "1.3",
            q: "Classe, octets du réseau et octets de l'hôte de quatre adresses.",
            a: [
              {
                table: {
                  head: ["Adresse", "Classe", "Réseau", "Hôte"],
                  rows: [
                    ["128.200.151.168", "B", "128.200", "151.168"],
                    ["118.10.21.253", "A", "118", "10.21.253"],
                    ["67.1.255.251", "A", "67", "1.255.251"],
                    ["192.255.1.2", "C", "192.255.1", "2"],
                  ],
                },
              },
            ],
            added: true,
          },
          {
            n: "1.4",
            q: "Nombre maximum d'adresses par réseau et de réseaux, par classe ; et la classe d'un réseau de 64 500 machines.",
            a: [
              {
                table: {
                  head: ["Classe", "Hôtes par réseau", "Nombre de réseaux"],
                  rows: [
                    ["A", "2²⁴ − 2 = 16 777 214", "2⁷ = 128 (126 utilisables)"],
                    ["B", "2¹⁶ − 2 = 65 534", "2¹⁴ = 16 384"],
                    ["C", "2⁸ − 2 = 254", "2²¹ = 2 097 152"],
                  ],
                },
              },
              "Pour 64 500 machines, il faut la classe B : 65 534 hôtes possibles, alors qu'un réseau de classe C n'en a que 254.",
            ],
            added: true,
          },
          {
            n: "1.5",
            q: "a) Réseau de 208.0.255.150 / 255.255.255.0 ? b) Classe « normale » d'un réseau en /16 ?",
            a: ["a) Le réseau est 208.0.255.0. b) Un /16 (255.255.0.0) est le masque par défaut de la classe B."],
            added: true,
          },
          {
            n: "1.6",
            q: "Masques par défaut, et type d'adressage selon le masque.",
            a: [
              {
                table: {
                  head: ["Adresse", "Masque", "Réponse"],
                  rows: [
                    ["128.0.0.1", "—", "Classe B : 255.255.0.0, soit /16"],
                    ["126.10.255.255", "—", "Classe A : 255.0.0.0, soit /8"],
                    ["192.0.1.1", "—", "Classe C : 255.255.255.0, soit /24"],
                    ["191.0.0.1", "255.255.192.0 (/18)", "Par classe avec sous-réseau (plus long que le /16 de la classe B)"],
                    ["128.245.254.255", "255.252.0.0 (/14)", "Sans classe (plus court que le /16 de la classe B)"],
                    ["223.0.0.223", "255.255.255.0 (/24)", "Par classe sans sous-réseau (masque par défaut de la classe C)"],
                  ],
                },
              },
            ],
            added: true,
          },
          {
            n: "1.7",
            q: "Sur un même réseau physique, avec les masques par défaut : quelles machines communiqueront ensemble ?",
            a: [
              "Deux machines communiquent directement si elles ont la même partie réseau :",
              {
                table: {
                  head: ["Réseau", "Machines"],
                  rows: [
                    ["10.0.0.0 /8", "a) 10.0.0.1, g) 10.2.3.6, m) 10.254.254.254"],
                    ["122.0.0.0 /8", "b) 122.0.25.38, c) 122.25.25.39"],
                    ["200.25.48.0 /24", "d) 200.25.48.69, l) 200.25.48.12"],
                    ["156.54.0.0 /16", "e) 156.54.23.1, k) 156.54.69.2"],
                    ["156.25.0.0 /16", "f) 156.25.69.12, j) 156.25.12.36"],
                    ["Seules sur leur réseau", "h) 11.23.69.87, i) 200.25.89.56, n) 1.1.1.1, o) 156.0.54.2, p) 201.25.48.1"],
                  ],
                },
              },
            ],
            added: true,
          },
          {
            n: "1.8",
            q: "Première et dernière adresse de réseau privé de classe B, puis de classe C.",
            a: [
              "a) Classe B : de 172.16.0.0 à 172.31.255.255 (seize réseaux, de 172.16.0.0 à 172.31.0.0).",
              "b) Classe C : de 192.168.0.0 à 192.168.255.255 (256 réseaux, de 192.168.0.0 à 192.168.255.0).",
            ],
            added: true,
          },
          {
            n: "1.9",
            q: "Particularités de vingt-deux adresses (masque par défaut).",
            a: [
              {
                table: {
                  head: ["Adresse", "Particularité"],
                  rows: [
                    ["127.0.0.1 · 127.131.208.51", "Boucle locale (loopback) : la machine elle-même"],
                    ["1.255.255.255", "Diffusion (broadcast) du réseau 1.0.0.0"],
                    ["255.255.255.255", "Diffusion limitée au réseau local"],
                    ["10.133.19.27", "Privée, classe A"],
                    ["172.16.122.68 · 172.31.127.9", "Privées, classe B (172.16 à 172.31)"],
                    ["192.168.0.1 · 192.168.129.33", "Privées, classe C"],
                    ["224.0.0.2 · 224.0.0.9 · 224.0.1.24", "Multicast (classe D) : 224.0.0.2 vise tous les routeurs du réseau, 224.0.0.9 les routeurs RIPv2"],
                    ["169.254.192.167", "APIPA : adresse que se donne une machine qui n'a pas reçu de réponse DHCP"],
                    ["0.0.0.0", "« Cette machine » ou « n'importe quelle adresse » : jamais attribuée à un hôte"],
                    ["248.10.10.1", "Classe E, réservée à l'expérimentation"],
                    ["172.32.14.172", "Publique, classe B : juste hors de la plage privée"],
                    ["168.192.226.13", "Publique, classe B : le piège, ce n'est pas 192.168"],
                    ["1.2.3.4 · 1.1.1.1 · 1.0.0.127 · 93.1.1.0 · 118.17.255.255", "Adresses d'hôtes publiques ordinaires de classe A (1.1.1.1 est le DNS de Cloudflare)"],
                  ],
                },
              },
            ],
            added: true,
          },
          {
            n: "1.10",
            q: "L'adresse d'hôte est-elle valide ? Sinon, quelle partie est fausse ?",
            a: [
              {
                table: {
                  head: ["Adresse", "Valide ?", "Pourquoi"],
                  rows: [
                    ["254.12.33.102", "Non", "254 : classe E, réservée"],
                    ["123.123.123.123", "Oui", "Hôte de classe A"],
                    ["199.23.107.255", "Non", ".255 : adresse de diffusion du réseau"],
                    ["199.23.107.0", "Non", ".0 : adresse du réseau"],
                    ["156.266.12.103", "Non", "266 : un octet ne dépasse pas 255"],
                    ["99.0.0.12", "Oui", "Hôte de classe A"],
                    ["153.0.0.0", "Non", "0.0 : adresse du réseau (classe B)"],
                    ["153.0.0.255", "Oui", "La partie hôte 0.255 n'est ni tout à 0 ni tout à 1"],
                    ["191.23.255.255", "Non", "255.255 : diffusion (classe B)"],
                    ["33.255.255.0", "Oui", "Hôte de classe A"],
                    ["12.0.0.0", "Non", "Adresse du réseau"],
                    ["12.255.255.255", "Non", "Adresse de diffusion"],
                    ["12.0.0.255", "Oui", "Hôte de classe A"],
                    ["127.0.0.1 · 127.23.109.122", "Non", "127 : boucle locale"],
                    ["0.23.12.122", "Non", "0 : réseau réservé"],
                    ["192.12.255.102", "Oui", "Hôte de classe C"],
                    ["191.105.0.0", "Non", "0.0 : adresse du réseau (classe B)"],
                    ["203.123.45.255", "Non", ".255 : diffusion (classe C)"],
                    ["204.0.23.198", "Oui", "Hôte de classe C"],
                    ["224.56.204.112", "Non", "224 : multicast, pas une adresse d'hôte"],
                    ["223.255.255.254", "Oui", "Dernier hôte possible de son réseau de classe C"],
                    ["126.0.0.1", "Oui", "Hôte de classe A"],
                    ["177.45.123.255", "Oui", "Classe B : la partie hôte 123.255 n'est pas la diffusion"],
                  ],
                },
              },
            ],
            added: true,
          },
        ],
      },
      {
        title: "Dossier 2 — Études de cas",
        answers: [
          {
            n: "2.1",
            q: "Répartir le bloc 162.18.132.0/22 entre A (200 hôtes), B (200 hôtes) et C (450 hôtes).",
            a: [
              "a) Un /22 laisse 32 − 22 = 10 bits d'hôte : 2¹⁰ = 1 024 adresses, de 162.18.132.0 à 162.18.135.255.",
              "b) En un seul réseau, 1 024 − 2 = 1 022 adresses d'hôtes.",
              "c) On commence par le plus grand besoin. 450 hôtes demandent 9 bits (2⁹ − 2 = 510), donc un /23 ; 200 hôtes tiennent dans 8 bits (254), donc un /24 :",
              {
                table: {
                  head: ["Entreprise", "Réseau", "Masque", "Hôtes utilisables", "Diffusion"],
                  rows: [
                    ["C (450)", "162.18.132.0/23", "255.255.254.0", "162.18.132.1 → 162.18.133.254 (510)", "162.18.133.255"],
                    ["A (200)", "162.18.134.0/24", "255.255.255.0", "162.18.134.1 → 162.18.134.254 (254)", "162.18.134.255"],
                    ["B (200)", "162.18.135.0/24", "255.255.255.0", "162.18.135.1 → 162.18.135.254 (254)", "162.18.135.255"],
                  ],
                },
              },
            ],
            added: true,
          },
          {
            n: "2.2",
            q: "Découper 192.168.1.0/24 en huit sous-réseaux /27 (255.255.255.224).",
            a: [
              "a) Les 3 bits empruntés sont les premiers du dernier octet : chaque sous-réseau commence à un multiple de 32 (256 ÷ 8). Dans chacun, la première adresse est celle du réseau, la dernière celle de diffusion, et il reste 30 adresses d'hôtes.",
              "b) Le découpage :",
              {
                table: {
                  head: ["N°", "Réseau", "Hôtes", "Diffusion"],
                  rows: [
                    ["1", "192.168.1.0", ".1 → .30", "192.168.1.31"],
                    ["2", "192.168.1.32", ".33 → .62", "192.168.1.63"],
                    ["3", "192.168.1.64", ".65 → .94", "192.168.1.95"],
                    ["4", "192.168.1.96", ".97 → .126", "192.168.1.127"],
                    ["5", "192.168.1.128", ".129 → .158", "192.168.1.159"],
                    ["6", "192.168.1.160", ".161 → .190", "192.168.1.191"],
                    ["7", "192.168.1.192", ".193 → .222", "192.168.1.223"],
                    ["8", "192.168.1.224", ".225 → .254", "192.168.1.255"],
                  ],
                },
              },
              "Six sous-réseaux sont utilisés, les deux derniers restent libres pour plus tard.",
            ],
            added: true,
          },
        ],
      },
      {
        title: "Dossier 3 — Travail pratique (questions de cours)",
        intro: "Les relevés propres à mon poste (adresses, masque, passerelle) se font en salle : ne sont gardées ici que les questions de cours.",
        answers: [
          { n: "3.1 a", q: "Quelle commande affiche les configurations réseau ?", a: ["`ipconfig /all` sous Windows (`ip a` sous Linux)."], added: true },
          {
            n: "3.1 c",
            q: "Pourquoi un ordinateur peut-il avoir plusieurs adresses MAC ?",
            a: ["Parce qu'il a une adresse MAC par interface réseau : la carte Ethernet, la carte Wi-Fi, le Bluetooth, et les cartes virtuelles (VirtualBox, VPN)."],
            added: true,
          },
          {
            n: "3.1 d",
            q: "Pourquoi un ordinateur peut-il avoir plusieurs adresses IP ?",
            a: ["Chaque interface a sa propre adresse, en IPv4 et en IPv6, sans oublier la boucle locale 127.0.0.1 ; une même interface peut aussi en porter plusieurs."],
            added: true,
          },
          {
            n: "3.1 f",
            q: "À quoi sert une passerelle ?",
            a: ["La passerelle est l'adresse du routeur qui permet de sortir du réseau local : tout ce qui est destiné à un autre réseau, Internet compris, lui est envoyé."],
            added: true,
          },
          {
            n: "3.2 a-b",
            q: "Qu'est-ce qu'une adresse IP publique, à quoi sert-elle, comment la récupérer ?",
            a: [
              "C'est l'adresse unique sur Internet que le fournisseur d'accès attribue à la box ou au routeur : elle identifie le réseau sur Internet. Les machines du réseau local sortent toutes avec elle (traduction d'adresses, NAT). On la lit sur un site comme ifconfig.me, ou dans l'interface d'administration de la box.",
            ],
            added: true,
          },
          {
            n: "3.3",
            q: "Câble débranché, adresse du voisin, retour à la normale, test de connectivité.",
            a: [
              {
                list: [
                  "Câble débranché : `ipconfig` affiche « Média déconnecté », le poste n'a plus d'adresse IP.",
                  "Avec l'adresse du voisin : Windows signale un conflit d'adresses IP, et l'un des deux postes perd le réseau.",
                  "Retour à un poste fonctionnel : Paramètres réseau > Modifier les paramètres IP > « Automatique (DHCP) », puis `ipconfig /release` et `ipconfig /renew`.",
                  "Tester la connectivité du poste du voisin : `ping <adresse IP du voisin>`.",
                ],
              },
            ],
            added: true,
          },
        ],
      },
    ],
  },
];
