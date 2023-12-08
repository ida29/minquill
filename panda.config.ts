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

  conditions: {
    extend: {
      light: "[data-color-mode=light] &",
      dark: "[data-color-mode=dark] &",
      normalTheme: "[data-theme=normal] &",
    },
  },

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          fira: { value: "var(--font-hind)" },
        },
      },
      semanticTokens: {
        colors: {
          bg1: {
            value: {
              _normalTheme: {
                base: "{colors.stone.300}",
                _dark: "{colors.stone.950}",
              },
            },
          },
          bg2: {
            value: {
              _normalTheme: {
                base: "{colors.stone.950}",
                _dark: "{colors.stone.300}",
              },
            },
          },
          bg3: {
            value: {
              _normalTheme: {
                base: "{colors.stone.50}",
                _dark: "{colors.stone.950}",
              },
            },
          },
          text1: {
            value: {
              _normalTheme: {
                base: "{colors.stone.950}",
                _dark: "{colors.stone.50}",
              },
            },
          },
          text2: {
            value: {
              _normalTheme: {
                base: "{colors.stone.50}",
                _dark: "{colors.stone.950}",
              },
            },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
