import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0A",
        fg: "#F5F4F0",
        accent: "#E8A045",
        border: "#1F1F1F",
        muted: "#888888",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "heading": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "subheading": ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.3" }],
      },
      spacing: {
        section: "clamp(5rem, 12vw, 10rem)",
      },
      borderColor: {
        DEFAULT: "#1F1F1F",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
