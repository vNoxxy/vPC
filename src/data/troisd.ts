import type { Shot } from "./types";

/**
 * My 3D work. Creature Hunters, a Roblox game: every creature, weapon and building is built by my own
 * Luau code from Roblox primitives, without any imported model. The renders come from the game's
 * own docs (avant / après: the number of pieces of the model before and after its redesign).
 */
export const CREATURE_HUNTERS = {
  title: "Creature Hunters",
  kind: "Jeu Roblox · modèles 3D procéduraux",
  period: "Novembre 2026",
  summary:
    "Un simulateur de collection de créatures sur Roblox. Aucun modèle importé : chaque créature, chaque arme et chaque décor est sculpté par mon code Luau, à partir des formes de base de Roblox.",
  how: [
    {
      label: "Des volumes continus",
      text: "Troncs, cous, pattes et queues suivent des courbes (splines Catmull-Rom) le long desquelles des sections elliptiques se recouvrent : la créature ne ressemble plus à un empilement de boules.",
    },
    {
      label: "Une anatomie",
      text: "Cage thoracique, bassin, cuisses, joues, museau ; une fourrure en mèches effilées regroupées en touffes ; des yeux en couches (globe, iris en deux tons, pupille, reflets, cornée).",
    },
    {
      label: "Matières et lumière",
      text: "Un dégradé vertical sur chaque pièce (ombres froides, lumières chaudes) et une finition par matière : fourrure, corne, gemme, métal.",
    },
    {
      label: "Performance",
      text: "Un niveau de détail réduit retire les petites pièces sur les appareils modestes ; les ailes, queues et oreilles sont animées côté joueur.",
    },
  ],
  figures: [
    { src: "/images/3d/boss-ronce-sphinx.jpg", caption: "Deux boss mythiques, avant et après la refonte : la Ronce ancestrale passe de 142 à 258 pièces." },
    { src: "/images/3d/boss-wyrm-titan.jpg", caption: "Le Wyrm du blizzard et le Titan du volcan, avant et après." },
    { src: "/images/3d/creatures.jpg", caption: "Des créatures de la première zone, avant et après : le Scaraboule passe de 55 à 187 pièces." },
    { src: "/images/3d/pets.jpg", caption: "Des Pets : Phénix mirage, Phoque givre, Loup blizzard." },
  ] as Shot[],
  armory: [
    { src: "/images/3d/epee.jpg", caption: "L'épée du joueur, avant (44 pièces) et après (83 pièces)." },
    { src: "/images/3d/armes.jpg", caption: "Une partie des 20 armes de l'Armurerie, toutes modélisées en code." },
    { src: "/images/3d/reliques.jpg", caption: "Reliques et potions." },
    { src: "/images/3d/armurerie-rouge.jpg", caption: "L'Armurerie dans le jeu : les armes exposées sur leurs présentoirs." },
    { src: "/images/3d/armurerie-bleue.jpg", caption: "La même boutique, aux couleurs d'une autre zone." },
  ] as Shot[],
};

/** The tools of my 3D work. */
export const TOOLS_3D = [
  { name: "Roblox Studio & Luau", text: "Creature Hunters : modèles, décors et animations générés par le code." },
  { name: "Blender", text: "Modélisation et rendu de mes scènes 3D." },
  { name: "Unreal Engine", text: "Scènes et prototypes de jeu." },
];
