import { readFile } from "node:fs/promises";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import type { Plugin } from "vite";
import { markdownComponents, rehypePlugins } from "../components/markdown";

export function staticMarkdown(): Plugin {
	return {
		name: "static-markdown",
		enforce: "pre",
		async load(id) {
			const [filePath, query] = id.split("?", 2);

			if (!filePath?.endsWith(".md") || query !== "html") {
				return null;
			}

			const markdown = await readFile(filePath, "utf8");
			const html = renderToStaticMarkup(
				React.createElement(ReactMarkdown, {
					components: markdownComponents,
					rehypePlugins,
					children: markdown,
				}),
			);

			return `export default ${JSON.stringify(html)}`;
		},
	};
}
