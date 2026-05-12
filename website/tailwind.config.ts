import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "rgba(0, 104, 155, 1)",
          dark: "#005481",
          light: "rgba(239, 246, 255, 1)",
          50: "#EFF6FF",
          100: "#DBEAFE",
          500: "#00689B",
          600: "#005481",
          700: "#004166",
        },
        ink: {
          DEFAULT: "#0F172A",
          muted: "#64748B",
          soft: "#475569",
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
        },
        success: "#10B981",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "20px",
        button: "12px",
      },
      boxShadow: {
        card: "0 4px 20px rgba(15, 23, 42, 0.04)",
        cardHover: "0 12px 32px rgba(15, 23, 42, 0.08)",
        float: "0 8px 28px rgba(15, 23, 42, 0.08)",
      },
      maxWidth: {
        container: "1240px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.15)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        fadeUp: "fadeUp 0.6s ease-out forwards",
        pulseDot: "pulseDot 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
