import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      colors: {
        bg: "#0a0a0b",
        surface: "#111113",
        surface2: "#18181b",
        accent: "#e8431a",
        gold: "#c9a96e",
        muted: "#6b6b72",
        dim: "rgba(240,237,232,0.5)",
        "text-primary": "#f0ede8",
        border: "rgba(255,255,255,0.06)",
        "border-hover": "rgba(255,255,255,0.12)",
      },
      borderColor: {
        DEFAULT: "rgba(255,255,255,0.06)",
      },
      animation: {
        pulse: "pulse 2s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
