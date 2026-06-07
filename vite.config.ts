import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/react-portfolio/",
  build: {
    chunkSizeWarningLimit: 2500,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes("@react-three/rapier")) return "vendor-rapier";
          if (id.includes("@react-three/drei")) return "vendor-drei";
          if (id.includes("@react-three/fiber") || id.includes("@react-three/postprocessing")) return "vendor-r3f";
          if (id.includes("node_modules/three/")) return "vendor-three";
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) return "vendor-react";
        },
      },
    },
  },
});
