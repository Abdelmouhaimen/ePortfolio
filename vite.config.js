import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function hideLegacy(req, res, next) {
  if (/^\/legacy(?:\/|\?|$)/.test(req.url)) {
    res.writeHead(301, { Location: "/" });
    res.end();
    return;
  }
  next();
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "hide-archived-portfolio",
      configureServer(server) {
        server.middlewares.use(hideLegacy);
      },
      configurePreviewServer(server) {
        server.middlewares.use(hideLegacy);
      },
    },
  ],
});
