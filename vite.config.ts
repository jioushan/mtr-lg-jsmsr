import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
//	tailwindcss(),
      	plugins: [ 
	tailwindcss(),
	react(),
	],
//css: {
//    postcss: "postcss.config.mjs",
//  },
});
