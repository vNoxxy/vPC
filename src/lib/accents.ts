/**
 * The colors of Vody Studio's family (sampled from its VS marks). In the portfolio each bloc of the
 * BTS keeps one of them, shown as a small dot next to its name.
 */
export type AccentKey = "vody" | "green" | "violet" | "red" | "orange" | "yellow" | "cyan";

export const ACCENTS: Record<AccentKey, string> = {
  vody: "#2485ea",
  green: "#3dbb7c",
  violet: "#8f6fe8",
  red: "#e5242f",
  orange: "#f0702a",
  yellow: "#e3a83e",
  cyan: "#16c0dc",
};
