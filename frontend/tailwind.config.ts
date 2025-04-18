import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#f8fafc',
        'custom-text': '#1f2937',
        'custom-purple': '#6366f1',
        'custom-purple-dark': '#4f46e5',
      },
    },
  },
  plugins: [],
};

export default config;
