import type { Realisation } from "../types";

export const BLOC3: Realisation[] = [
  {
    slug: "e-mail-suspect",
    title: "Enquête sur un e-mail suspect",
    wordmark: "E-mail suspect",
    summary: "Un faux message « Microsoft 365 » : relever les indices, lire les URL piégées, réagir à l'incident.",
    category: "bloc3",
    from: "17/09/26",
    format: "TP individuel",
    context: "Au service informatique d'une entreprise, un salarié transmet un e-mail qui menace de suspendre son compte Microsoft 365 dans les deux heures.",
    need: "Analyser le message, justifier le diagnostic, proposer une réaction si un collègue a déjà donné son mot de passe, et rédiger les bons réflexes pour des non-informaticiens.",
    contribution:
      "J'ai relevé six indices, analysé le nom de domaine et deux URL piégées en m'appuyant sur des sources officielles, écrit une procédure de réaction en cinq étapes et une fiche de cinq réflexes.",
    tools: ["Lecture d'en-têtes et d'URL", "cybermalveillance.gouv.fr", "cnil.fr", "service-public.fr"],
    difficulty: "Repérer le vrai propriétaire d'une URL comme https://microsoft.com.securite-compte.example/login, qui commence par « microsoft.com ».",
    solution: "Lire le nom d'hôte de droite à gauche : le domaine réel est la partie juste avant l'extension finale (securite-compte.example) ; tout ce qui précède n'est qu'un sous-domaine choisi par l'attaquant.",
    competences: { incidents: [0], patrimoine: [5], service: [2] },
    proofs: ["Le TP « Enquête sur un e-mail suspect » : tableau des indices, analyse des URL, procédure et fiche réflexes.", "Les trois sources consultées."],
    bilan: "HTTPS ne prouve pas qu'un site est honnête : n'importe qui obtient un certificat gratuitement. Seul le nom de domaine compte, et l'urgence est le premier signal d'alerte.",
    work: [
      {
        title: "Mission 1 — Repérer les indices suspects",
        answers: [
          {
            q: "Six éléments analysés",
            a: [
              {
                table: {
                  head: ["Élément", "Observation", "Suspect ?", "Pourquoi"],
                  rows: [
                    ["Expéditeur", "support@microsoft-securite365.com, « Support Microsoft »", "Oui", "L'adresse ne correspond à aucun domaine officiel de Microsoft : elle l'imite avec quelques différences."],
                    ["Objet", "URGENT - Votre compte sera suspendu", "Oui", "Il provoque la peur, avec un sentiment d'urgence et de précipitation."],
                    ["Contenu", "Connexion inhabituelle, suspension sous 2 heures", "Oui", "C'est trop vague, et le délai est trop court."],
                    ["Lien", "https://microsoft-securite365.com/verification", "Oui", "Il imite le vrai domaine de Microsoft pour induire en erreur."],
                    ["Demande", "Saisir son adresse e-mail et son mot de passe", "Oui", "Un service ne demande jamais de saisir son mot de passe depuis un lien reçu par e-mail."],
                    ["Urgence", "2 heures avant la suspension", "Oui", "La peur pousse à agir sans vérifier."],
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        title: "Mission 2 — Investigation technique",
        answers: [
          {
            q: "Différence entre une adresse e-mail et un nom de domaine ?",
            a: ["Une adresse e-mail désigne une boîte de messagerie (nom@domaine) ; le nom de domaine, la partie après le @, identifie l'organisation ou le serveur auquel elle appartient."],
          },
          {
            q: "Quel est le nom de domaine de l'expéditeur ?",
            a: ["C'est microsoft-securite365.com."],
            fixed: true,
            note: "Corrigé : la réponse d'origine écrivait « microsoft-security365.com ».",
          },
          {
            q: "Le mot « Microsoft » dans un domaine prouve-t-il qu'il appartient à Microsoft ?",
            a: ["Non : tout le monde peut acheter un nom de domaine contenant le mot « microsoft », tant qu'il n'est pas déjà réservé."],
          },
          {
            q: "À quoi sert HTTPS ?",
            a: ["Il chiffre les échanges entre le navigateur et le serveur, ce qui protège la confidentialité et l'intégrité des données, et permet de vérifier l'identité du serveur grâce à un certificat."],
          },
          {
            q: "HTTPS suffit-il à garantir qu'un site est légitime ?",
            a: ["Non : HTTPS garantit seulement que la connexion est chiffrée, pas que le site est honnête. N'importe qui peut obtenir gratuitement un certificat."],
          },
          {
            q: "Sources consultées",
            a: [{ list: ["cybermalveillance.gouv.fr — la page sur l'hameçonnage", "cnil.fr — la page sur le phishing", "service-public.fr — la vérification d'un nom de domaine"] }],
          },
        ],
      },
      {
        title: "Mission 3 — Lire une URL",
        answers: [
          {
            n: "URL 1",
            q: "https://connexion.microsoft-securite365.com/account/login",
            a: [
              "Protocole HTTPS, sous-domaine « connexion », domaine microsoft-securite365.com, chemin /account/login.",
              "Le domaine réel, microsoft-securite365.com, n'appartient pas à Microsoft ; le sous-domaine « connexion » fait croire à une vraie page de connexion.",
            ],
          },
          {
            n: "URL 2",
            q: "https://microsoft.com.securite-compte.example/login",
            a: [
              "Protocole HTTPS, sous-domaine « microsoft.com », domaine securite-compte.example, chemin /login.",
              "Le site n'appartient pas à microsoft.com : le domaine réel est la partie juste avant l'extension finale. « microsoft.com » n'est ici qu'un sous-domaine placé devant pour tromper.",
            ],
          },
        ],
      },
      {
        title: "Mission 4 — Réagir à un incident",
        intro: "Un collègue a déjà cliqué sur le lien et saisi son mot de passe.",
        answers: [
          {
            q: "Procédure de réaction en cinq étapes",
            a: [
              {
                steps: [
                  "Changer immédiatement le mot de passe du compte, depuis le vrai site, pour empêcher l'attaquant de s'y connecter.",
                  "Alerter sans délai le service informatique, qui évalue l'ampleur de l'incident et surveille les connexions suspectes.",
                  "Activer ou vérifier l'authentification à double facteur, qui bloque une connexion frauduleuse même avec le mot de passe.",
                  "Fermer toutes les sessions ouvertes, vérifier l'activité récente du compte (règles de transfert, mails envoyés) et changer le mot de passe partout où il était réutilisé.",
                  "Signaler le message (signal-spam.fr, ou cybermalveillance.gouv.fr) et prévenir les collègues pour qu'ils ne cliquent pas à leur tour.",
                ],
              },
            ],
            fixed: true,
            note: "Les étapes 1 à 3 sont d'origine ; les étapes 4 et 5 ont été ajoutées.",
          },
        ],
      },
      {
        title: "Mission finale — 5 réflexes avant de cliquer",
        answers: [
          {
            q: "Mini-fiche de sensibilisation pour un salarié non informaticien",
            a: [
              {
                steps: [
                  "Vérifier l'adresse exacte de l'expéditeur, pas seulement le nom affiché.",
                  "Ne jamais cliquer directement sur un lien reçu par e-mail.",
                  "Survoler un lien pour lire sa vraie adresse, et regarder le domaine juste avant l'extension.",
                  "Se méfier de l'urgence et des menaces : un vrai service ne laisse pas deux heures pour réagir.",
                  "En cas de doute, joindre le service par un autre moyen (son site tapé soi-même, son numéro) ou demander au service informatique.",
                ],
              },
            ],
            fixed: true,
            note: "Les réflexes 1 et 2 sont d'origine ; les réflexes 3 à 5 ont été ajoutés.",
          },
          {
            q: "Conclusion — diagnostic final",
            a: [
              "Message suspect : c'est du phishing. Le domaine imite Microsoft sans lui appartenir, le message crée une urgence artificielle et demande le mot de passe par un lien : tout vise à voler les identifiants Microsoft 365 du salarié.",
            ],
            added: true,
          },
        ],
      },
    ],
  },
  {
    slug: "securiser-un-compte",
    title: "Sécuriser un compte : mots de passe, hachage et MFA",
    wordmark: "Hachage & MFA",
    summary: "Juger quatre comptes, réagir au vol d'un mot de passe, comprendre le hachage, le sel et le MFA.",
    category: "bloc3",
    from: "21/09/26",
    format: "TP en binôme puis individuel",
    context: "TP court en équipe cybersécurité : analyser les risques liés à l'authentification dans un service numérique.",
    need: "Repérer les risques de quatre comptes, aider une victime de phishing, puis expliquer pourquoi et comment un service doit protéger les mots de passe.",
    contribution:
      "J'ai analysé les quatre comptes et proposé une recommandation pour chacun, décrit la réaction à un vol de mot de passe, expliqué la chaîne du hachage, puis fait le bonus développeur sur bcrypt, Argon2 et le salage.",
    tools: ["Recommandations de la CNIL", "bcrypt", "Argon2", "Gestionnaire de mots de passe"],
    difficulty: "Ne pas juger un mot de passe à sa seule complexité apparente : « B!lal2026 » a l'air solide mais contient un prénom, une année et une substitution connue.",
    solution: "J'ai croisé quatre critères pour chaque compte : longueur et prévisibilité, réutilisation, présence du MFA, et exposition au phishing.",
    competences: { patrimoine: [2], incidents: [0] },
    proofs: [
      "Le TP « Sécuriser un compte utilisateur » : tableau d'analyse, incident, hachage et mini-évaluation.",
      "Le bonus développeur : bcrypt, Argon2 et salage.",
      "Sur mon site vodystudio.fr, les mots de passe sont hachés avec bcrypt et la double authentification est proposée (voir la fiche du site).",
    ],
    bilan:
      "Ce TP m'a servi directement : j'ai vérifié que mon propre site faisait ce que j'avais écrit au bonus (hachage avec sel, MFA, limitation des essais). Ce que l'on apprend en cyber se retrouve en lignes de code.",
    work: [
      {
        title: "Mission 1 — Analyse de comptes",
        answers: [
          {
            q: "Risques et recommandation pour chaque compte",
            a: [
              {
                table: {
                  head: ["Compte", "Mot de passe", "MFA", "Réutilisé", "Risques", "Recommandation"],
                  rows: [
                    ["Alice", "azerty123", "Non", "Oui", "Mot de passe très courant et facile à deviner ; réutilisé, donc une fuite touche plusieurs comptes ; pas de MFA.", "Un mot de passe différent par compte, et activer le MFA."],
                    ["Bilal", "B!lal2026", "Non", "Non", "Son prénom et l'année, faciles à deviner ; le « ! » à la place du « i » est connu ; pas de MFA.", "Un mot de passe long, sans prénom ni date, et activer le MFA."],
                    ["Chloé", "Piano-Lune-Train-84", "Oui", "Non", "Risque faible : long, unique, avec MFA ; il reste le risque de phishing.", "Rien à changer, mais rester vigilante face aux faux messages."],
                    ["David", "Soleil2026!", "Oui", "Oui", "Mot courant + année + « ! » : trop prévisible, et réutilisé. Le MFA aide mais ne suffit pas.", "Un mot de passe long et différent par compte, un gestionnaire de mots de passe, et garder le MFA."],
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        title: "Mission 2 — Incident",
        intro: "Chloé a saisi son mot de passe sur une page de phishing : l'attaquant le connaît.",
        answers: [
          { q: "Pourquoi l'attaquant peut-il quand même être bloqué ?", a: ["Grâce au MFA : il a le mot de passe mais pas le deuxième facteur, il ne peut donc pas finir la connexion. Le site peut aussi bloquer un appareil inconnu."] },
          {
            q: "Le MFA rend-il le compte impossible à pirater ?",
            a: ["Non : il réduit fortement le risque sans le supprimer. Par exemple un faux site qui vole aussi le code, des notifications envoyées en boucle jusqu'à ce que la victime accepte, ou le vol de la carte SIM."],
          },
          {
            q: "Actions à conseiller immédiatement à Chloé",
            a: [
              {
                steps: [
                  "Changer son mot de passe tout de suite, depuis le vrai site.",
                  "Fermer toutes les sessions ouvertes et retirer les appareils inconnus.",
                  "Vérifier l'activité récente et les réglages du compte (e-mail de secours, méthodes MFA).",
                  "Changer aussi le mot de passe partout où elle l'a utilisé.",
                  "Prévenir le service informatique et signaler le message de phishing.",
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Mission 3 — Comprendre le hachage",
        answers: [
          { q: "Compléter la chaîne", a: ["Mot de passe → fonction de hachage → empreinte."] },
          {
            q: "Pourquoi ne pas stocker les mots de passe en clair ?",
            a: ["Si la base de données est volée, tous les mots de passe en clair sont lisibles. Avec le hachage, le pirate ne voit que des empreintes, très difficiles à retransformer en mots de passe."],
          },
        ],
      },
      {
        title: "Mission 4 — Mini-évaluation",
        answers: [
          {
            q: "Qu'est-ce que le credential stuffing ?",
            a: ["Une attaque automatique : le pirate prend des identifiants volés sur un site et les essaie sur beaucoup d'autres. Elle marche si la victime réutilise son mot de passe."],
          },
          { q: "Pourquoi un mot de passe différent par service ?", a: ["Si un site est piraté, le pirate ne peut pas entrer dans les autres comptes : une fuite ne touche qu'un seul compte."] },
          {
            q: "Quel est le rôle du hachage d'un mot de passe ?",
            a: ["Il transforme le mot de passe en empreinte, dans un seul sens. Le service garde l'empreinte, pas le mot de passe ; à la connexion, il compare les empreintes. Si la base fuit, les mots de passe ne sont pas lisibles."],
          },
          {
            q: "Que signifie MFA et à quoi sert-il ?",
            a: ["L'authentification multifacteur demande au moins deux preuves de nature différente : ce que je sais (le mot de passe), ce que je possède (téléphone, clé de sécurité), ce que je suis (empreinte digitale). Le compte reste protégé même si le mot de passe est volé."],
          },
          {
            q: "« Si je développe une application avec des comptes utilisateurs, je dois… »",
            a: ["… ne jamais stocker les mots de passe en clair, les hacher avec un algorithme adapté (bcrypt, Argon2) et un sel, proposer le MFA, limiter les essais de connexion et utiliser HTTPS."],
          },
        ],
      },
      {
        title: "Bonus développeur",
        answers: [
          { q: "bcrypt", a: ["Un algorithme de hachage fait pour les mots de passe, volontairement lent, qui ajoute un sel tout seul. Intérêt : il ralentit énormément les pirates qui testent des millions de mots de passe."] },
          { q: "Argon2", a: ["Un algorithme de hachage moderne, recommandé pour les mots de passe, qui demande beaucoup de mémoire et de temps de calcul. Intérêt : il résiste bien aux attaques par cartes graphiques (GPU)."] },
          {
            q: "Le salage",
            a: ["Une valeur aléatoire, le sel, ajoutée au mot de passe avant le hachage, différente pour chaque utilisateur. Intérêt : deux mots de passe identiques donnent deux empreintes différentes, et les tables arc-en-ciel ne marchent plus."],
          },
        ],
      },
    ],
  },
  {
    slug: "authentification-sure",
    title: "Concevoir une authentification plus sûre",
    wordmark: "Authentification",
    summary: "Après un phishing, trier les protections et construire la chaîne d'authentification d'une future application.",
    category: "bloc3",
    from: "28/09/26",
    format: "Travail en trinôme, puis ticket individuel",
    context: "Après un incident de phishing qui a coûté un mot de passe, une entreprise demande de revoir l'authentification de sa future application.",
    need: "Proposer un système qui limite les conséquences d'un vol de mot de passe, avec plusieurs couches de protection.",
    contribution:
      "En trinôme, nous avons classé huit fonctionnalités (à retenir, à écarter, à discuter) et construit la chaîne d'authentification, de l'utilisateur jusqu'à la session ; j'ai ensuite rédigé seul le ticket SEC-001.",
    tools: ["Analyse de risques", "Schéma de la chaîne d'authentification"],
    difficulty: "Placer les protections dans le bon ordre : à quel moment limiter les tentatives par rapport à la vérification du mot de passe ?",
    solution: "Avant la vérification : on bloque les essais répétés avant même de comparer le hash, puis viennent le MFA et un jeton de session à durée limitée ; le journal et la notification couvrent la fin de la chaîne.",
    competences: { projet: [0], patrimoine: [2] },
    proofs: ["Le document « Bloc 3 — Incident de cybersécurité » : tableau des décisions, chaîne d'authentification et ticket SEC-001."],
    bilan: "Une seule protection ne suffit jamais : le hachage protège la base, pas l'utilisateur qui se fait piéger. C'est le principe de défense en profondeur, chaque couche couvrant l'échec d'une autre.",
    work: [
      {
        title: "Mission 1 — Faire les bons choix",
        answers: [
          {
            q: "À retenir, à écarter ou à discuter ?",
            a: [
              {
                table: {
                  head: ["Fonctionnalité", "Décision", "Justification"],
                  rows: [
                    ["Mot de passe", "À retenir", "Utile, mais pas suffisant seul : il peut être volé."],
                    ["Stockage en clair", "À écarter", "Si la base fuit, tous les mots de passe sont lus."],
                    ["Hachage + sel", "À retenir", "Le mot de passe devient une empreinte illisible."],
                    ["MFA", "À retenir", "Un mot de passe volé ne suffit plus."],
                    ["Limitation des tentatives", "À retenir", "Bloque les essais répétés d'un pirate."],
                    ["Journal des connexions", "À retenir", "Permet de repérer les connexions suspectes."],
                    ["Notification de nouvelle connexion", "À retenir", "L'utilisateur voit vite une connexion qu'il n'a pas faite."],
                    ["Réinitialisation sécurisée", "À retenir", "Un lien temporaire et à usage unique, envoyé par e-mail."],
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        title: "Mission 2 — La chaîne d'authentification",
        answers: [
          {
            q: "De l'utilisateur à l'ouverture de la session",
            a: [
              {
                steps: [
                  "L'utilisateur saisit son identifiant et son mot de passe dans le formulaire.",
                  "Envoi sécurisé en HTTPS vers le serveur.",
                  "Protection : limitation des tentatives.",
                  "Vérification du mot de passe (hash + sel).",
                  "MFA : code ou clé de sécurité.",
                  "Session : un jeton sécurisé à durée limitée.",
                  "Protection : journal des connexions et notification.",
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Mission 3 — Défense en profondeur",
        answers: [
          {
            q: "Si le mot de passe est haché, pourquoi encore le MFA ?",
            a: ["Le hachage protège la base de données, mais pas du phishing : si l'utilisateur donne lui-même son mot de passe, le pirate peut se connecter. Le MFA ajoute un second facteur que le pirate n'a pas. Une seule protection ne suffit jamais."],
          },
        ],
      },
      {
        title: "Ticket individuel SEC-001",
        answers: [
          { n: "1", q: "Attaque probable après la saisie d'identifiants sur un faux site ?", a: ["Le pirate utilise les identifiants volés pour se connecter au compte."] },
          { n: "2", q: "Action immédiate recommandée ?", a: ["Changer le mot de passe et fermer les sessions ouvertes."] },
          { n: "3", q: "Trois protections complémentaires ?", a: ["Le MFA, la limitation des tentatives et le journal des connexions."] },
          { n: "4", q: "Le principe de défense en profondeur, en une phrase ?", a: ["Utiliser plusieurs protections, pour que l'échec d'une seule ne suffise pas à l'attaquant."] },
        ],
      },
    ],
  },
  {
    slug: "audit-technova",
    title: "Audit de sécurité du système d'information de TechNova",
    wordmark: "Audit TechNova",
    summary: "Huit situations à risque, le bon vocabulaire, des mesures justifiées, et un agent IA à encadrer.",
    category: "bloc3",
    from: "01/10/26",
    format: "TD individuel",
    featured: true,
    context: "TechNova, une PME de 30 salariés, demande un premier diagnostic de la sécurité de son système d'information.",
    need: "Repérer les situations à risque, expliquer leurs conséquences, proposer des mesures adaptées et encadrer le projet d'agent IA de la direction.",
    contribution:
      "J'ai analysé seul huit situations, classé les notions (vulnérabilité, menace, impact), proposé et justifié une mesure pour cinq cas, identifié les risques d'un agent IA branché sur tout le SI, puis choisi trois mesures prioritaires.",
    tools: ["Analyse de risques", "Moindre privilège", "Sauvegardes 3-2-1", "MFA"],
    difficulty: "Distinguer vulnérabilité, menace et impact, que l'on mélange facilement.",
    solution:
      "Une phrase par notion : la vulnérabilité est une faiblesse du système, la menace ce qui peut l'exploiter, l'impact ce qui arrive ensuite. Le serveur non mis à jour est la vulnérabilité, le ransomware la menace, les fichiers chiffrés l'impact.",
    competences: { patrimoine: [3, 4, 2, 5] },
    proofs: ["Le document « Bloc 3 — Audit TechNova » : tableaux des missions 1 et 2, mesures, agent IA et conclusion."],
    bilan:
      "Trois mesures suffisent à changer beaucoup : le MFA, des sauvegardes isolées et le moindre privilège, y compris pour un agent IA. C'est cette mission qui m'a donné le sujet de ma veille : l'IA et la cybersécurité.",
    work: [
      {
        title: "Mission 1 — Repérer les situations à risque",
        answers: [
          {
            q: "Le problème et le danger de chaque constat",
            a: [
              {
                table: {
                  head: ["Situation", "Problème", "Danger"],
                  rows: [
                    ["Un seul compte administrateur partagé par le service informatique", "Compte admin partagé", "On ne sait pas qui agit, et le mot de passe fuit facilement."],
                    ["Wi-Fi « Entreprise2026 », inchangé depuis deux ans", "Wi-Fi faible, jamais changé", "Facile à deviner : un intrus peut entrer sur le réseau."],
                    ["Un ancien salarié a toujours un compte actif", "Compte d'ancien salarié actif", "Il peut servir à voler des données."],
                    ["Sauvegardes sur un disque USB toujours branché au serveur", "Sauvegarde toujours connectée", "Un ransomware peut la chiffrer aussi."],
                    ["Les salariés installent librement des logiciels", "Installation libre", "Risque d'installer un virus."],
                    ["Un serveur sans mise à jour de sécurité depuis des mois", "Serveur non mis à jour", "Des failles connues, faciles à exploiter."],
                    ["Des mots de passe sur des post-it près des écrans", "Mots de passe affichés", "Tout le monde peut les lire."],
                    ["Un e-mail pressant de cliquer pour éviter la fermeture du compte", "Phishing (fausse urgence)", "Le salarié peut donner son mot de passe."],
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        title: "Mission 2 — Le bon vocabulaire",
        answers: [
          {
            q: "Vulnérabilité, menace ou conséquence ?",
            a: [
              {
                table: {
                  head: ["Élément", "Classement"],
                  rows: [
                    ["Mot de passe faible", "Vulnérabilité"],
                    ["Ransomware", "Menace"],
                    ["Vol de données", "Conséquence / impact"],
                    ["Serveur non mis à jour", "Vulnérabilité"],
                    ["E-mail de phishing", "Menace"],
                    ["Indisponibilité du serveur", "Conséquence / impact"],
                    ["Compte d'un ancien salarié encore actif", "Vulnérabilité"],
                    ["Suppression ou chiffrement de fichiers", "Conséquence / impact"],
                  ],
                },
              },
              "Une vulnérabilité est une faiblesse du système ; une menace est ce qui peut l'exploiter.",
            ],
          },
        ],
      },
      {
        title: "Mission 3 — Responsable de la sécurité",
        answers: [
          {
            n: "A",
            q: "Tous les salariés sont administrateurs de leur poste.",
            a: ["Risque : un virus installé, et un pirate qui aurait tous les droits. Mesure : retirer les droits d'administration aux salariés. Pourquoi : plus d'installation risquée, et des dégâts limités en cas d'attaque."],
          },
          {
            n: "B",
            q: "Un simple mot de passe protège les applications, même depuis l'extérieur.",
            a: ["Risque : un mot de passe volé donne l'accès à un pirate. Mesure : ajouter la double authentification (MFA). Pourquoi : le mot de passe seul ne suffit plus."],
          },
          {
            n: "C",
            q: "Les accès d'un salarié qui part ne sont coupés que sur un e-mail envoyé à la main.",
            a: ["Risque : le mail est oublié et le compte reste actif. Mesure : couper les accès automatiquement au départ. Pourquoi : plus d'oubli, aucun compte inutile."],
          },
          {
            n: "D",
            q: "Les sauvegardes sont sur le même réseau que les fichiers de production.",
            a: ["Risque : un ransomware chiffre aussi les sauvegardes. Mesure : garder une copie hors ligne, séparée. Pourquoi : une copie reste intacte pour restaurer."],
          },
          {
            n: "E",
            q: "Aucune sensibilisation au phishing.",
            a: ["Risque : les salariés cliquent sur de faux mails. Mesure : former et tester les salariés. Pourquoi : ils apprennent à reconnaître les pièges."],
          },
        ],
      },
      {
        title: "Mission 4 — Un agent IA dans le système d'information",
        intro: "La direction veut un agent IA qui lit les e-mails, consulte les documents partagés et agit seul dans le SI, avec accès à tout « puisque seuls les salariés l'utilisent ».",
        answers: [
          { n: "1", q: "Trois risques au moins", a: [{ list: ["Fuite de données confidentielles.", "Des erreurs, comme la suppression de fichiers.", "Une injection de prompt cachée dans un e-mail piégé.", "Un pirate qui prendrait la main sur l'agent aurait accès à tout le SI."] }] },
          { n: "2", q: "Trois mesures pour l'encadrer", a: [{ list: ["Un compte dédié, aux droits limités.", "Une validation humaine des actions sensibles.", "Un journal de ses actions, contrôlé."] }] },
          {
            n: "3",
            q: "Le principe du moindre privilège, appliqué à l'agent",
            a: ["Ne donner que les droits nécessaires. Pour l'agent IA : lecture seule, sur un seul service, sans accès aux RH, à la comptabilité ni à l'administration."],
          },
        ],
      },
      {
        title: "Conclusion — trois mesures prioritaires",
        answers: [
          {
            q: "Ce que TechNova doit faire en premier",
            a: [{ steps: ["Le MFA : un mot de passe seul est trop faible.", "Des sauvegardes isolées : pour repartir après une attaque.", "Le moindre privilège : il limite les dégâts."] }],
          },
        ],
      },
    ],
  },
];
