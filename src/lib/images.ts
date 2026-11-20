import { withBase } from "./site";

/**
 * The screenshots of public/images, each with its size and the WebP copies made of it
 * (`<name>-800.webp`, `<name>-1600.webp`). A new screenshot works without being listed here: it is
 * then served as it is. To add the WebP copies, see the README.
 */
const IMAGES: Record<string, { width: number; height: number; webp: number[] }> = {
  "vodystudio-accueil": { width: 2880, height: 1800, webp: [800, 1600] },
  "vodystudio-tableau-de-bord": { width: 2560, height: 1640, webp: [800, 1600] },
  "forge-schematics": { width: 2284, height: 1042, webp: [800, 1600] },
  "audit-fivem-carte": { width: 1314, height: 1236, webp: [800] },
  "vbot-carte": { width: 800, height: 692, webp: [800] },
  // The 3D renders of Creature Hunters (public/images/3d/).
  "boss-ronce-sphinx": { width: 1345, height: 486, webp: [800, 1600] },
  "boss-wyrm-titan": { width: 1362, height: 486, webp: [800, 1600] },
  "creatures": { width: 1360, height: 333, webp: [800, 1600] },
  "pets": { width: 1332, height: 333, webp: [800, 1600] },
  "armes": { width: 1400, height: 368, webp: [800, 1600] },
  "reliques": { width: 1400, height: 331, webp: [800, 1600] },
  "armurerie-rouge": { width: 1200, height: 750, webp: [800, 1600] },
  "armurerie-bleue": { width: 1200, height: 750, webp: [800, 1600] },
  "epee": { width: 1400, height: 900, webp: [800, 1600] },
  "whynot-carte": { width: 1200, height: 630, webp: [800, 1600] },
};

export function picture(src: string): { srcSet?: string; width?: number; height?: number } {
  const name = src.split("/").pop()!.replace(/\.[a-z]+$/i, "");
  const info = IMAGES[name];
  if (!info) return {};
  const dir = src.slice(0, src.lastIndexOf("/") + 1);
  const srcSet = info.webp.map((w) => `${withBase(`${dir}${name}-${w}.webp`)} ${Math.min(w, info.width)}w`).join(", ");
  return { srcSet, width: info.width, height: info.height };
}
