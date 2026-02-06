import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { effuse } from "@effuse/compiler/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    effuse({
      debug: false,
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
  },
});
