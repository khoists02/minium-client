import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import dynamicImport from "vite-plugin-dynamic-import";
import dns from "dns";
import path from "path";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  define: {
    "process.env": {},
  },
  resolve: {
    alias: {
      "@minium/common": path.resolve(__dirname, "../minium-common/src"),
    },
  },
  plugins: [react(), viteTsConfigPaths(), dynamicImport()],
  optimizeDeps: {
    include: ["slate", "slate-react", "slate-history", "prismjs"],
  },
  server: {
    open: true,
    port: 3000,
  },
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        chunkFileNames: () => "chunks/[name].[hash].js",
      },
    },
  },
});
