import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#1e2327",
        aurora: "#3730a3",
        violet: "#7c3aed",
      },
      boxShadow: {
        glow: "0 0 40px rgba(124, 58, 237, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
