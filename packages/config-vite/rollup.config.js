import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

const config = defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "es",
    },
  ],
  plugins: [
    typescript({ declaration: true, declarationDir: "dist", outDir: "dist" }),
  ],
  external: ["vite", "path", "process"],
});

export default config;
