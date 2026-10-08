import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        orangeBrand: "#F47C20",
        orangeDeep: "#C75B0A",
        orangeTint: "#FFF1E5",
      },
      boxShadow: {
        soft: "0 12px 35px rgba(17,24,39,0.08)",
        glass: "0 8px 30px rgba(244,124,32,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
