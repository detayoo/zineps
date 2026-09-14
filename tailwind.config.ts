import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Desktop-first: every breakpoint except 2xl is a max-width override.
    screens: {
      "2xl": { min: "1600px" },
      xl: { max: "1440px" },
      lg: { max: "1180px" },
      md: { max: "900px" },
      sm: { max: "640px" },
      xs: { max: "420px" },
    },
    // One radius for everything: 4px. Replaces Tailwind's default scale, so
    // `rounded`, `rounded-full`, `rounded-2xl` and friends all resolve to 4px.
    borderRadius: {
      none: "0px",
      sm: "4px",
      DEFAULT: "4px",
      md: "4px",
      lg: "4px",
      xl: "4px",
      "2xl": "4px",
      "3xl": "4px",
      full: "4px",
      pill: "4px",
    },
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          strong: "rgb(var(--accent-strong) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
          ink: "rgb(var(--accent-ink) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        // The house ease — fast start, soft settle. Used across the header.
        zineps: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
