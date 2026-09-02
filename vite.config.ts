import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { sites } from "@openai/sites-vite-plugin";
import { existsSync } from "node:fs";
import path from "path";

// https://vitejs.dev/config/
const sitesConfigPath = path.resolve(__dirname, ".openai/hosting.json");

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), ...(existsSync(sitesConfigPath) ? [sites()] : [])],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));