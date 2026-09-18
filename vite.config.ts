import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  test: { include: ["src/**/*.test.ts"] },
  base: "/quiz-generator/",
  plugins: [react(), tailwindcss()],
});
