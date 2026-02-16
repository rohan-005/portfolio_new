// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "royal-blue": {
          DEFAULT: "#4169E1",
          50: "#E6EBFA",
          100: "#D0D9F6",
          200: "#A1B3ED",
          300: "#728DE4",
          400: "#4367DB",
          500: "#4169E1",
          600: "#2A4DBF",
          700: "#1F3A9A",
          800: "#152775",
          900: "#0C1550",
        },
        green: {
          DEFAULT: "#0F3D2E",
          50: "#E6F2EE",
          100: "#CDE5DD",
          200: "#9BCBBB",
          300: "#69B199",
          400: "#3E8F73",
          500: "#0F3D2E",
          600: "#0C3226",
          700: "#09281E",
          800: "#061D16",
          900: "#03120E",
        },

        "game-green": {
          DEFAULT: "#4CAF50",
          50: "#E8F5E9",
          100: "#C8E6C9",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#66BB6A",
          500: "#4CAF50",
          600: "#43A047",
          700: "#388E3C",
          800: "#2E7D32",
          900: "#1B5E20",
        },
        "terminal-green": {
          DEFAULT: "#2ECC71",
          50: "#EAFBF1",
          100: "#D4F7E3",
          200: "#A9EFC7",
          300: "#7EE7AB",
          400: "#53DF8F",
          500: "#2ECC71",
          600: "#25A65B",
          700: "#1C7E45",
          800: "#13562F",
          900: "#0A2D19",
        },
        coral: {
          DEFAULT: "#FF6B6B",
          50: "#FFEEEE",
          100: "#FFDDDD",
          200: "#FFBBBB",
          300: "#FF9999",
          400: "#FF7777",
          500: "#FF6B6B",
          600: "#E05555",
          700: "#B33F3F",
          800: "#862A2A",
          900: "#591515",
        },
      },
      fontFamily: {
        mono: [
          "SF Mono",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      animation: {
        flicker: "flicker 3s infinite",
        scanline: "scanline 8s linear infinite",
        "cursor-blink": "blink 1s step-end infinite",
        grain: "grain 8s steps(10) infinite",
        "parallax-slow": "parallax 20s ease infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "slide-in-left": "slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-right": "slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-pulse": "scale-pulse 2s ease-in-out infinite",
        "profile-switch":
          "profile-switch 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        shimmer: "shimmer 3s infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.98 },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        parallax: {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "25%": { transform: "translate(-5px, 5px)" },
          "75%": { transform: "translate(5px, -5px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 0 5px rgba(76, 175, 80, 0.3), 0 0 20px rgba(76, 175, 80, 0.1)",
          },
          "50%": {
            boxShadow:
              "0 0 20px rgba(76, 175, 80, 0.5), 0 0 40px rgba(76, 175, 80, 0.2)",
          },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%) scale(0.8)", opacity: 0 },
          "100%": { transform: "translateX(0) scale(1)", opacity: 1 },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%) scale(0.8)", opacity: 0 },
          "100%": { transform: "translateX(0) scale(1)", opacity: 1 },
        },
        "scale-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "profile-switch": {
          "0%": { transform: "scale(0.9) rotate(-2deg)", opacity: 0 },
          "50%": { transform: "scale(1.05) rotate(1deg)", opacity: 0.8 },
          "100%": { transform: "scale(1) rotate(0)", opacity: 1 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-100%" },
          "100%": { backgroundPosition: "200%" },
        },
      },
      backgroundImage: {
        "pixel-grid":
          "linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)",
        "pixel-grid-dark":
          "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
        "gradient-game":
          "linear-gradient(135deg, #FF8C42 0%, #FF6B6B 50%, #4CAF50 100%)",
        "gradient-fullstack":
          "linear-gradient(135deg, #4169E1 0%, #2ECC71 50%, #FF8C42 100%)",
        shimmer:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
      },
      backgroundSize: {
        grid: "20px 20px",
        shimmer: "200% 100%",
      },
    },
  },
  plugins: [],
};
