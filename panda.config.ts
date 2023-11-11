import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  // Files to exclude
  exclude: [],
  jsxFramework: "react",

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          fira: { value: "var(--font-hind)" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
