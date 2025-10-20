import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    // Base path: "/" for local dev, "/repo-name/" for GitHub Pages
    base: mode === "production" ? "/ayushmansingh-portfolio/" : "/",
    server: {
      host: "::",      // allows local network access
      port: 8080,      // dev server port
    },
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
