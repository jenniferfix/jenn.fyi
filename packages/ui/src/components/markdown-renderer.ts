import { typographyClassNames } from "@jenn.fyi/ui/typography/class-names";
import React from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownProps {
	children?: string | null;
}

type MarkdownElementProps<T extends keyof React.JSX.IntrinsicElements> =
	React.ComponentPropsWithoutRef<T> & {
		node?: unknown;
	};

function cn(...classNames: Array<string | undefined>) {
	return classNames.filter(Boolean).join(" ");
}

function markdownElement<T extends keyof React.JSX.IntrinsicElements>(
	tag: T,
	className: string,
) {
	return ({
		node: _node,
		className: existingClassName,
		...props
	}: MarkdownElementProps<T>) =>
		React.createElement(tag, {
			...props,
			className: cn(className, existingClassName),
		});
}

export const markdownComponents: Components = {
	h1: markdownElement("h1", typographyClassNames.h1),
	h2: markdownElement("h2", typographyClassNames.h2),
	h3: markdownElement("h3", typographyClassNames.h3),
	h4: markdownElement("h4", typographyClassNames.h4),
	h5: markdownElement("h4", typographyClassNames.h5),
	h6: markdownElement("h4", typographyClassNames.h6),
	blockquote: markdownElement("blockquote", typographyClassNames.blockquote),
	p: markdownElement("p", typographyClassNames.p),
	a: markdownElement("a", typographyClassNames.anchor),
	strong: markdownElement("code", typographyClassNames.strong),
	em: markdownElement("code", typographyClassNames.em),
	ul: markdownElement("ul", typographyClassNames.ul),
	ol: markdownElement("ul", typographyClassNames.ol),
	li: markdownElement("li", ""),
	code: markdownElement("code", typographyClassNames.inlineCode),
	pre: markdownElement("pre", typographyClassNames.pre),
	sub: markdownElement("sub", typographyClassNames.subScript),
	sup: markdownElement("sup", typographyClassNames.superScript),
};

export const rehypePlugins = [rehypeRaw];

export const Markdown = ({ children }: MarkdownProps) => {
	return React.createElement(ReactMarkdown, {
		children,
		components: markdownComponents,
		rehypePlugins,
	});
};
