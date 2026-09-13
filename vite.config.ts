import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// package.json sets "type": "module", so the config is loaded as ESM — derive the
// project root from import.meta.url rather than __dirname.
const rootDir = path.dirname(fileURLToPath(import.meta.url));
const extensionDir = path.join(rootDir, "extension");
const outDir = path.join(rootDir, "dist");

/**
 * MV3 requires manifest.json to sit next to index.html in the built bundle, but the
 * manifest is authored in `extension/` (plan.md §2). Copy it in at the end of the build
 * so `dist/` is directly loadable as an unpacked extension.
 */
function copyExtensionAssets(): Plugin {
  return {
    name: "glasstab:copy-extension-assets",
    apply: "build",
    closeBundle() {
      if (!fs.existsSync(extensionDir)) return;
      fs.cpSync(extensionDir, outDir, { recursive: true });
    },
  };
}

// base './' so the build output works when loaded as an unpacked Chrome extension
export default defineConfig({
  plugins: [react(), copyExtensionAssets()],
  base: "./",
  resolve: {
    alias: {
      "@": path.join(rootDir, "src"),
    },
  },
  build: {
    outDir: "dist",
    target: "es2020",
    cssCodeSplit: false,
  },
});
