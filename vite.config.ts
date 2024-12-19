import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsConfigPaths from "vite-tsconfig-paths";
import dynamicImport from "vite-plugin-dynamic-import";
import dns from "dns";

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  define: {
    "process.env": {}
  },
  plugins: [react(), viteTsConfigPaths(), dynamicImport()],
  server: {
    open: true,
    port: 3000,
  },
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        chunkFileNames: () => "chunks/[name].[hash].js"
      }
    }
  }
})