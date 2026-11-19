/**
 * From a TP to code in production: where a notion of the courses shows up in my own projects. `doc` is
 * found in the name of the work on the Documents page, which is then offered for download.
 */
export const BRIDGE: { notion: string; tp: string; doc: string; where: string; project: string }[] = [
  { notion: "Hachage et sel", tp: "Sécuriser un compte", doc: "Sécuriser un compte", project: "vodystudio-fr", where: "Les mots de passe de vodystudio.fr sont hachés avec bcrypt, jamais stockés en clair." },
  { notion: "MFA", tp: "Authentification sûre", doc: "authentification plus sûre", project: "vodystudio-fr", where: "La double authentification par codes TOTP est proposée sur chaque compte client." },
  { notion: "Limiter les essais", tp: "Authentification sûre", doc: "authentification plus sûre", project: "vodystudio-fr", where: "Les routes de connexion refusent les essais répétés depuis une même adresse." },
  { notion: "Moindre privilège", tp: "Audit TechNova", doc: "Audit de sécurité de TechNova", project: "vbot", where: "Les modules des clients de vBot tournent en bac à sable et ne voient que leur propre serveur." },
  { notion: "Vulnérabilité et contexte", tp: "Audit TechNova", doc: "Audit de sécurité de TechNova", project: "audit-fivem", where: "L'audit FiveM note la gravité d'un constat selon ce qu'il faut pour l'exploiter." },
  { notion: "Règles d'utilisation, RGPD", tp: "Charte informatique", doc: "La charte informatique", project: "vodystudio-fr", where: "Aucun traceur avant consentement, et des pages légales qui disent ce que le code fait." },
];
