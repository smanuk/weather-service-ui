import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The browser only ever talks to this dev server (same origin), and Vite
// proxies /api calls through to the Spring service on :8080 — so there are no
// CORS concerns during development.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Listen on all interfaces so the dev server is reachable from other hosts
    // on the network (not just localhost).
    host: true,
    // Vite blocks requests whose Host header isn't allow-listed; permit the
    // custom hostname used to reach this machine.
    allowedHosts: ["octo.homehack.cc"],
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});