import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { effuse } from "@effuse/compiler/vite";
import { resolve } from "path";
import { execSync } from "child_process";
import { version } from "./node_modules/tagix/package.json";

const getReleaseDate = () => {
  try {
    return execSync(`npm view tagix@${version} time.modified`).toString().trim();
  } catch (e) {
    console.warn("Failed to fetch release date for tagix:", e);
    return new Date().toISOString();
  }
};

const releaseDate = getReleaseDate();

export default defineConfig({
  define: {
    __TAGIX_RELEASE_DATE__: JSON.stringify(releaseDate),
  },
  plugins: [
    effuse({
      debug: false,
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      // Stub out fast-check + pure-rand (testing libs pulled in by effect)
      "fast-check": resolve(__dirname, "./src/stubs/fast-check.ts"),
      "pure-rand": resolve(__dirname, "./src/stubs/fast-check.ts"),
    },
  },
  optimizeDeps: {
    include: [
      "prismjs",
      "prismjs/components/prism-typescript",
      "prismjs/components/prism-bash",
      "prismjs/components/prism-javascript",
      "prismjs/components/prism-jsx",
      "prismjs/components/prism-json",
      "prismjs/components/prism-tsx",
      "prismjs/components/prism-markdown",
      "tagix",
    ],
    exclude: ["fast-check", "pure-rand"],
  },
  build: {
    sourcemap: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          const parts = id.split("node_modules/");
          const packagePath = parts[parts.length - 1];
          const packageName = packagePath.startsWith("@")
            ? packagePath.split("/").slice(0, 2).join("/")
            : packagePath.split("/")[0];

          if (packageName === "prismjs") return "vendor-prism";
          if (packageName === "tagix") return "vendor-tagix";
          if (packageName.startsWith("@effuse")) return "vendor-effuse";
          if (packageName === "gsap") return "vendor-gsap";
          if (packageName === "effect") return "vendor-effect";

          return "vendor";
        },
      },
    },
  },
});
