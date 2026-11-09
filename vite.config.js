import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/portfolio/",
  plugins: [react()],
  build: {
    // three.js lives in lazily-imported chunks (Earth/Stars), so the large
    // chunk is never part of the first page load.
    chunkSizeWarningLimit: 1100,
  },
});
