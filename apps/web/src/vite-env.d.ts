/// <reference types="vite/client" />

declare module "*.md?html" {
	const html: string;
	export default html;
}

declare module "*.css";
declare module "@fontsource/*" {
	const url: string;
	export default url;
}
declare module "@fontsource-variable/*?url" {
	const url: string;
	export default url;
}
