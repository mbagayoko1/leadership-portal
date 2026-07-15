import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  // Production is served from https://mbagayoko1.github.io/leadership-portal/
  base: command === "build" ? "/leadership-portal/" : "/",
  plugins: [react()],
  server: { port: 3005 },
}));
