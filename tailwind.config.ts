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
        brand: {
          50: "#e8f7f7",
          100: "#D0ECED",
          200: "#a3d9db",
          300: "#6bbfc2",
          400: "#3a9fa3",
          500: "#124546",
          600: "#023E40",
          700: "#023236",
          800: "#01262a",
          900: "#011a1d",
          950: "#000f10",
        },
        ink: {
          DEFAULT: "#023E40",
          light: "#124546",
          muted: "#5a7e7f",
        },
        surface: {
          DEFAULT: "#ffffff",
          warm: "#f0fafa",
          cool: "#D0ECED",
          dark: "#023E40",
        },
        accent: {
          DEFAULT: "#124546",
          soft: "#D0ECED",
        },
        success: "#16a34a",
        warning: "#d97706",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        body: [
          "var(--font-body)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-md": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "heading-lg": ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-md": ["1.25rem", { lineHeight: "1.25", letterSpacing: "-0.005em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "caption": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
      },
      spacing: {
        section: "6rem",
        "section-sm": "4rem",
        gutter: "2rem",
        "gutter-sm": "1rem",
      },
      borderRadius: {
        card: "0.75rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(2,62,64,0.06), 0 4px 12px rgba(2,62,64,0.04)",
        "card-hover": "0 2px 8px rgba(2,62,64,0.08), 0 8px 24px rgba(2,62,64,0.06)",
        subtle: "0 1px 2px rgba(2,62,64,0.04)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
