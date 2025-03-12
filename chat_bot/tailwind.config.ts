import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
         'primary-200':"#fef7ff",
         'primary-500':'#eaddff',
         'secondary-200':'#E8DEF8',
         'secondary-300':'#ECE6F0',
         'secondary-900':'#625b71',
         'label-200': '#1D1B20',
         'label-500':'#21005D',
         "modal-overlay": "rgba(70, 75, 86, 0.7)",

      }
    },
  },
  plugins: [],
};
export default config;
