/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        // Vody Studio's own wordmark face, for the studio's name only.
        brand: ["Syne", "Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        night: "var(--night)",
        soft: "var(--soft)",
        faint: "var(--faint)",
        rule: "var(--rule)",
        blue: { DEFAULT: "var(--blue)", text: "var(--blue-text)", light: "var(--blue-light)" },
      },
    },
  },
  plugins: [],
};
