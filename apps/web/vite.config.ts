import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
	server: {
		allowedHosts: [
			"archwitch.tail2b2c5b.ts.net",
			"catty",
			"jenn.fyi",
			"www.jenn.fyi",
		],
	},
	plugins: [
		nitro({ publicAssets: [{ baseURL: "/", dir: "public", maxAge: 2592000 }] }), // one month in seconds
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tailwindcss(),
		tanstackStart({
			prerender: {
				enabled: true,
				autoStaticPathsDiscovery: true,
			},
		}),
		viteReact(),
	],
});

export default config;
