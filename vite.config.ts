import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Where the site is served from: "/" by default, "/vPC/" on GitHub Pages (set by the deploy workflow).
  base: process.env.BASE_PATH || "/",
  // One bundle on purpose: the whole portfolio (its texts included) loads once, then every page opens at once.
  build: { chunkSizeWarningLimit: 800 },
});
