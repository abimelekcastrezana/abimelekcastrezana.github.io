import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";

export default defineConfig({
  output: "static",
  site: "https://abimelekcastrezana.github.io",
  integrations: [
    mermaid({
      theme: "neutral",
      autoTheme: true,
    }),
  ],
});
