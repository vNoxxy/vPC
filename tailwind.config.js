/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Bricolage Grotesque Variable", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        serif: ["Instrument Serif", "Georgia", "serif"],
        // Vody Studio's own wordmark face, for the studio's name only.
        brand: ["Syne", "Bricolage Grotesque Variable", "sans-serif"],
        mono: ["JetBrains Mono Variable", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        bg: "rgb(var(--bg-rgb) / <alpha-value>)",
        surface: "var(--surface)",
        raised: "var(--raised)",
        fg: "var(--fg)",
        soft: "var(--soft)",
        faint: "var(--faint)",
        line: "var(--line)",
        accent: { DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)", soft: "var(--accent-soft)" },
        signal: "var(--signal)",
      },
      screens: { xs: "420px" },
    },
  },
  plugins: [],
};
