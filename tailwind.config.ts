import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #003e9d, #0050c9)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-jakarta)", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

export default config;