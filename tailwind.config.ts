import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#4A90E2", // Blue, for primary actions and highlights
      secondary: "#50E3C2", // Green, for secondary actions and success states
      tertiary: "#F5A623", // Orange, for warnings and non-critical alerts
      quaternary: "#D0021B", // Red, for errors and critical alerts
      lightBackground: "#F5F7FA", // Light gray, for background and inactive elements
      darkBackground: "#3A405A", // Dark gray, for text and active elements
      white: "#FFFFFF", // White, for text on dark backgrounds
      black: "#000000", // Black, for text on light backgrounds
    },
  },
  plugins: [],
};
export default config;
