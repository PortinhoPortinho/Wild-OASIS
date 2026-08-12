import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      features: fileURLToPath(new URL("./src/features", import.meta.url)),
      ui: fileURLToPath(new URL("./src/ui", import.meta.url)),
      hooks: fileURLToPath(new URL("./src/hooks", import.meta.url)),
      services: fileURLToPath(new URL("./src/services", import.meta.url)),
      utils: fileURLToPath(new URL("./src/utils", import.meta.url)),
      data: fileURLToPath(new URL("./src/data", import.meta.url)),
      styles: fileURLToPath(new URL("./src/styles", import.meta.url)),
    },
  },
});
