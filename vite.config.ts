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
	server: {
	allowedHosts: ['mtr.jsmsr.com'],
	host: true
	},
	// 明確排除系統文件
	build: {
		rollupOptions: {
			external: []
		}
	},
	// 忽略這些文件
	optimizeDeps: {
		exclude: []
	}
//css: {
//    postcss: "postcss.config.mjs",
//  },
});
