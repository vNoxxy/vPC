import type { CSSProperties } from "react";

/**
 * The accent family of Vody Studio (sampled from its VS marks), one per part of the portfolio, so each
 * bloc of the BTS has its own color like each project of vodystudio.fr. `deep` and `fill` are the color
 * darkened just enough to pass WCAG AA (4.5:1) as text on paper and as a filled surface.
 */
export type AccentKey = "vody" | "green" | "violet" | "red" | "orange" | "yellow" | "cyan" | "pink";

export interface Accent {
  hex: string;
  deep: string;
  fill: string;
  on: string;
}

export const ACCENTS: Record<AccentKey, Accent> = {
  vody: { hex: "#2485ea", deep: "#1d6cbe", fill: "#1e6fc3", on: "#ffffff" },
  green: { hex: "#3dbb7c", deep: "#277950", fill: "#3dbb7c", on: "#04140c" },
  violet: { hex: "#8f6fe8", deep: "#745abc", fill: "#785dc3", on: "#ffffff" },
  red: { hex: "#e5242f", deep: "#d0212b", fill: "#d4212b", on: "#ffffff" },
  orange: { hex: "#f0702a", deep: "#ac501e", fill: "#f0702a", on: "#160a03" },
  yellow: { hex: "#e3a83e", deep: "#886525", fill: "#e3a83e", on: "#161003" },
  cyan: { hex: "#16c0dc", deep: "#0a6476", fill: "#16c0dc", on: "#03181c" },
  pink: { hex: "#e8298a", deep: "#c62376", fill: "#cb2479", on: "#ffffff" },
};

/**
 * Scopes an element (and everything inside it) to one accent. Pass `tone` when that element sits
 * inside a section of another accent: the tone classes derive the readable text shade once, on the
 * section itself, so a nested scope restates it for its own color.
 */
export function accentStyle(key: AccentKey, tone?: "dark" | "light"): CSSProperties {
  const a = ACCENTS[key];
  return {
    "--accent": a.hex,
    "--accent-deep": a.deep,
    "--accent-fill": a.fill,
    "--accent-on": a.on,
    ...(tone && { "--accent-text": tone === "light" ? a.deep : `color-mix(in srgb, ${a.hex} 88%, #fff)` }),
  } as CSSProperties;
}
