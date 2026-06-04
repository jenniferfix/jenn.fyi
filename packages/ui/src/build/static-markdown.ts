import { readFile } from "node:fs/promises";
import { Markdown } from "@jenn.fyi/ui/components/markdown-renderer";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { Plugin } from "vite";

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
				React.createElement(Markdown, null, markdown),
			);

			return `export default ${JSON.stringify(html)}`;
		},
	};
}
