import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1D2B45",
        indigo: "#2B4BC4",
        ember: "#CE3426",
        surface: "#F6F7F9",
        ink: "#111317",
        muted: "#5C6370",
        hairline: "#E3E5EA",
        // Off-crest club wayfinding rules (3-4px rules, dots, badges only)
        club: {
          arsenal: "#E8192C",
          chelsea: "#1C6BB0",
          tottenham: "#24376B",
        },
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        display: ["var(--font-archivo)", "sans-serif"],
        body: ["var(--font-newsreader)", "Georgia", "serif"],
      },
      maxWidth: {
        site: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
