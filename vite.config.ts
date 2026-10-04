import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Render the portfolio at build time; publish only dist/client on a static host.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    prerender: { enabled: true, crawlLinks: false, failOnError: true },
  },
  nitro: false,
});
