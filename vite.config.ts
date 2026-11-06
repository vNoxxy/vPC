import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // One bundle on purpose: the whole portfolio (its texts included) loads once, then every page opens at once.
  build: { chunkSizeWarningLimit: 800 },
});
