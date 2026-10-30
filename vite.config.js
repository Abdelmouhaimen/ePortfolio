import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [
    {
      name: "original-portfolio-jsx",
      enforce: "pre",
      async transform(code, id) {
        if (/\/src\/.*\.js$/.test(id)) {
          return transformWithOxc(code, id, {
            lang: "jsx",
            jsx: { runtime: "automatic" },
          });
        }
      },
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (/^\/legacy(?:\/[^.?]+)*\/?(?:\?.*)?$/.test(req.url))
            req.url = "/legacy/index.html";
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (/^\/legacy(?:\/[^.?]+)*\/?(?:\?.*)?$/.test(req.url))
            req.url = "/legacy/index.html";
          next();
        });
      },
    },
    react(),
  ],
  optimizeDeps: { rolldownOptions: { moduleTypes: { ".js": "jsx" } } },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        legacy: fileURLToPath(new URL("./legacy/index.html", import.meta.url)),
      },
    },
  },
});
