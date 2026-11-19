import type { Realisation } from "../types";

const ROW_LEVEL_SECURITY = `-- Le journal d'activité est privé : chaque utilisateur ne voit que ses lignes,
-- et une activité issue d'une séance ne se modifie que par la séance.
create policy "activity_logs_select_own"
  on public.activity_logs for select to authenticated
  using (user_id = (select auth.uid()));

create policy "activity_logs_insert_own_manual"
  on public.activity_logs for insert to authenticated
  with check (user_id = (select auth.uid()) and session_id is null);

create policy "activity_logs_delete_own_manual"
  on public.activity_logs for delete to authenticated
  using (user_id = (select auth.uid()) and session_id is null);`;

const AUTH_LIMITER = `// Les routes de connexion et d'inscription : au plus 20 essais par adresse IP
// toutes les 15 minutes, puis un refus poli (HTTP 429).
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many attempts. Please try again later." },
});

// À l'inscription : le mot de passe n'est jamais stocké, seulement son empreinte
// bcrypt (sel aléatoire inclus, coût 10).
const passwordHash = await bcrypt.hash(password, 10);`;

export const PERSO: Realisation[] = [
  {
    slug: "vodystudio-fr",
    title: "vodystudio.fr, le site de mon studio",
    short: "vodystudio.fr",
    kind: "Site et application",
    summary: "Un site vitrine en quatre langues et une application complète : comptes, paiements, espace client, administration.",
    category: "perso",
    from: "21/10/26",
    to: "",
    format: "Projet personnel, en production",
    featured: true,
    live: { label: "vodystudio.fr", href: "https://vodystudio.fr" },
    context:
      "Vody Studio est ma micro-entreprise (Timéo Vaast EI, immatriculée le 21 octobre 2026, code APE 6201Z — programmation informatique) : sites web, applications, et outils pour les serveurs FiveM et Discord.",
    need: "Un site qui présente les services du studio, vend ses abonnements et donne à chaque client un espace pour suivre son projet, en respectant le RGPD et le droit de la consommation.",
    contribution:
      "Je conçois et développe tout le site : la vitrine en français, anglais, allemand et espagnol, les comptes clients, les paiements, l'espace client, le panneau d'administration et les pages légales, puis je le mets en ligne et le maintiens sur mon serveur.",
    tools: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js & Express", "Prisma", "PostgreSQL", "Stripe", "Docker Compose", "VPS Hostinger", "Git"],
    difficulty: "Sécuriser les comptes des clients : un site qui gère des paiements et des données personnelles est une cible.",
    solution:
      "J'ai appliqué ce que j'ai vu en Bloc 3 : mots de passe hachés avec bcrypt, double authentification (codes TOTP), nombre de tentatives de connexion limité, session dans un cookie httpOnly que les scripts de la page ne peuvent pas lire, et aucun traceur avant le consentement du visiteur (RGPD, CNIL).",
    competences: { presence: [0, 1, 2], service: [1, 2], projet: [1], devpro: [3] },
    proofs: [
      "Le site en ligne : vodystudio.fr.",
      "L'extrait de code ci-dessous : la limitation des tentatives de connexion et le hachage des mots de passe.",
      "L'historique Git du projet.",
      "Les pages légales (mentions, CGV, confidentialité, cookies) en quatre langues.",
    ],
    code: [{ title: "Extrait du serveur : limiter les essais et hacher les mots de passe", lang: "TypeScript", code: AUTH_LIMITER }],
    cover: { src: "/images/vodystudio-accueil.jpg", caption: "L'accueil de vodystudio.fr." },
    shots: [{ src: "/images/vodystudio-tableau-de-bord.jpg", caption: "L'espace client : chaque produit du studio au même endroit (données de démonstration)." }],
    bilan:
      "Passer du TP au vrai projet change tout : les protections vues en cours deviennent du code que je dois maintenir, et une erreur touche de vrais clients. C'est aussi ce projet qui m'a appris à mettre un service en ligne, de Docker au nom de domaine.",
  },
  {
    slug: "vbot",
    title: "vBot, un bot Discord modulable",
    short: "vBot",
    kind: "Bot Discord",
    summary: "Journaux, giveaways, musique et mini-jeux réglés depuis un tableau de bord, et des modules JavaScript en bac à sable.",
    category: "perso",
    from: "21/10/26",
    to: "",
    format: "Projet personnel, en production",
    context: "vBot est le bot Discord de Vody Studio : il fonctionne seul ou relié au site, où chaque abonné règle son serveur.",
    need: "Donner aux serveurs Discord des outils réglables depuis un tableau de bord (journaux, giveaways, musique, mini-jeux) et laisser les clients ajouter leurs propres modules en JavaScript.",
    contribution:
      "J'ai développé le bot et son éditeur de réglages, partagé entre le panneau d'administration et l'espace des abonnés : un réglage par type de journal, les giveaways par bouton ou réaction, la musique, les mini-jeux et l'exécution des modules des clients.",
    tools: ["Node.js", "TypeScript", "discord.js", "QuickJS", "Worker threads", "yt-dlp", "ffmpeg", "Vitest"],
    difficulty: "Exécuter le code JavaScript d'un client sans qu'il puisse toucher au reste du bot, aux autres serveurs, ni bloquer le bot entier.",
    solution:
      "Chaque module tourne dans un bac à sable QuickJS, dans un thread à part surveillé par un chien de garde qui l'arrête s'il bloque. Il ne voit que l'API prévue et seulement son propre serveur, et ne peut ni prendre le nom d'une commande du bot ni modifier ses réglages : le principe du moindre privilège vu en Bloc 3.",
    competences: { service: [1, 0], incidents: [2], projet: [0] },
    proofs: ["Les tests unitaires des règles des mini-jeux et du bac à sable.", "Le tableau de bord du bot sur vodystudio.fr."],
    cover: { src: "/images/vbot-carte.jpg", caption: "vBot dans l'espace client de vodystudio.fr." },
    bilan: "Laisser des utilisateurs exécuter du code est la fonctionnalité la plus risquée que j'ai écrite : elle m'a appris à penser d'abord à ce qu'un module ne doit pas pouvoir faire.",
  },
  {
    slug: "forge",
    title: "Forge, des éditeurs visuels de scripts FiveM",
    short: "Forge",
    kind: "Éditeurs de scripts FiveM",
    summary: "Dessiner une interface et relier des blocs par des fils, puis obtenir un script Lua prêt pour un serveur FiveM.",
    category: "perso",
    from: "21/10/26",
    to: "",
    format: "Projet personnel, en production",
    context: "FiveM permet d'héberger des serveurs multijoueurs personnalisés pour GTA V ; leurs scripts s'écrivent en Lua, ce qui bloque beaucoup de créateurs de serveurs.",
    need: "Permettre de créer des scripts et leurs interfaces sans écrire de code, puis de récupérer une ressource prête à installer.",
    contribution:
      "J'ai conçu deux éditeurs : Anvil, pour dessiner les interfaces, et Schematics, pour décrire la logique en reliant des blocs par des fils. Un compilateur transforme ensuite le projet en Lua.",
    tools: ["React", "TypeScript", "React Flow", "Lua", "Un compilateur maison", "Vitest"],
    difficulty: "Empêcher les liaisons absurdes entre blocs : un mauvais type, une boucle, un bloc relié à lui-même, le même fil deux fois.",
    solution:
      "Une seule fonction décide si une liaison est permise, utilisée à la fois par l'éditeur et par l'indice affiché à côté du fil que l'on tire : ce que l'éditeur accepte et ce qu'il annonce ne peuvent pas diverger.",
    competences: { service: [0], incidents: [2], projet: [1] },
    proofs: ["La démo interactive de Forge sur vodystudio.fr.", "Les tests du compilateur."],
    cover: { src: "/images/forge-schematics.jpg", caption: "Schematics, l'éditeur de logique de Forge, sur vodystudio.fr." },
    bilan: "Une règle écrite à un seul endroit ne se contredit pas : c'est devenu ma façon de coder dès qu'une même décision est prise à deux endroits.",
  },
  {
    slug: "audit-fivem",
    title: "L'audit FiveM gratuit",
    short: "Audit FiveM",
    kind: "Analyse de sécurité",
    summary: "Une note de sécurité sur 100 pour une ressource Lua, où chaque point perdu correspond à un constat expliqué.",
    category: "perso",
    from: "21/10/26",
    to: "",
    format: "Projet personnel, en production",
    context: "Les serveurs FiveM installent souvent des ressources Lua trouvées en ligne, sans les relire. Une faille peut laisser un tricheur se donner de l'argent ou des droits.",
    need: "Donner gratuitement une note de sécurité à une ressource, et dire précisément pourquoi elle perd des points.",
    contribution:
      "J'ai écrit l'analyseur : il parcourt le code Lua, relève les constats et les note. La gravité d'un constat dépend de son contexte : faut-il un outil de triche pour l'exploiter, ou une simple commande ? Le code s'exécute-t-il une fois ou en boucle ?",
    tools: ["TypeScript", "Analyse statique", "Lua", "Vitest"],
    difficulty: "Éviter les faux positifs : une valeur que le serveur vérifie lui-même avec ses propres données n'est pas une faille.",
    solution: "Des ressources d'exemple, volontairement mauvaises, et une ressource propre servent de tests : la propre doit toujours rester à 100, et chaque point perdu doit correspondre à un constat listé.",
    competences: { incidents: [2], service: [0], presence: [0] },
    proofs: ["L'audit en ligne sur vodystudio.fr.", "Les ressources de test et leurs résultats attendus."],
    cover: { src: "/images/audit-fivem-carte.jpg", caption: "L'audit gratuit, sur l'accueil de vodystudio.fr." },
    bilan: "Vulnérabilité, menace, contexte : le vocabulaire de l'audit TechNova m'a servi à noter juste, sans affoler pour rien.",
  },
  {
    slug: "whynot",
    title: "WhyNot?, une application mobile de fitness et de nutrition",
    short: "WhyNot?",
    kind: "Application mobile",
    summary: "Musculation, nutrition, progression et régularité dans une seule app iOS et Android, avec un espace social privé entre amis.",
    category: "perso",
    from: "11/11/26",
    to: "",
    format: "Projet personnel, prêt à publier sur les stores",
    live: { label: "whynotapp.fr", href: "https://whynotapp.fr" },
    context:
      "WhyNot? (« Why Not This One? ») est une application mobile que je publie en tant qu'entrepreneur individuel, avec son site public whynotapp.fr. Elle s'adresse aux personnes qui s'entraînent en salle ou à la maison et veulent suivre leur alimentation au même endroit.",
    need: "Une seule app pour enregistrer ses séances, ce que l'on mange, ses mensurations et ses photos d'évolution, garder l'envie de revenir chaque jour, et partager ses progrès seulement avec ses amis, en protégeant des données de santé.",
    contribution:
      "J'ai tout conçu et développé, phase par phase à partir d'un plan technique : l'authentification, le profil et les objectifs caloriques, le catalogue de plus de 140 exercices, les programmes et la séance en cours, le journal alimentaire (Ciqual, USDA, Open Food Facts, scanner de codes-barres, fast-food), les mensurations et graphiques, les photos privées, le calendrier, les amis, groupes et défis, l'XP, les rangs et les quêtes, puis la préparation de la publication (site légal, fiches des stores).",
    tools: ["React Native", "Expo", "TypeScript", "Expo Router", "Supabase", "PostgreSQL", "TanStack Query", "Zustand", "Zod", "Jest", "Maestro", "EAS Build"],
    difficulty: "Ne jamais perdre une séance : on s'entraîne souvent avec un réseau faible ou absent (salle en sous-sol), et l'app peut être fermée en pleine séance.",
    solution:
      "La séance vit entièrement sur le téléphone et est enregistrée à chaque action. À la fin, elle part dans une file d'envoi persistante, vidée au retour du réseau ; côté serveur, l'enregistrement est transactionnel et idempotent (identifiants générés sur l'appareil), donc un renvoi ne crée jamais de doublon. Les données personnelles sont protégées par la sécurité au niveau des lignes (RLS) de PostgreSQL sur toutes les tables, et les photos d'évolution sont ré-encodées pour retirer leur position GPS.",
    competences: { service: [0, 1], projet: [0, 1], incidents: [2], patrimoine: [2] },
    proofs: [
      "Le dépôt GitHub du projet et son historique, phase par phase.",
      "Le plan technique et 14 décisions d'architecture écrites (ADR).",
      "Les tests : composants et logique (Jest), base de données (pgTAP), parcours de bout en bout (Maestro).",
      "L'extrait ci-dessous : les règles de sécurité au niveau des lignes de la base.",
      "Le site public whynotapp.fr (confidentialité, suppression du compte, support).",
    ],
    code: [{ title: "Extrait de la base : chaque utilisateur ne voit que ses propres données", lang: "SQL", code: ROW_LEVEL_SECURITY }],
    cover: { src: "/images/whynot-carte.jpg", caption: "L'identité de WhyNot?, telle qu'elle apparaît quand on partage l'app." },
    bilan:
      "C'est mon projet le plus complet : découper le travail en phases, écrire les décisions avant de coder et tester chaque règle m'a permis d'avancer vite sans casser ce qui marchait déjà. Avec des données de santé, la sécurité ne s'ajoute pas à la fin, elle se pense dès le schéma de la base.",
  },
];
