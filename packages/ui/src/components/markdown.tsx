import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
//biome-ignore format: leave alone
import { 
  Anchor, Blockquote, Em,
  H1, H2, H3, H4, H5, H6,
  InlineCode,Li,
  Ol, P, Pre, Strong, Subscript, 
  Superscript, Ul 
} from "../typography";

interface MarkdownProps {
	children?: string | null;
}

type MarkdownElementProps<T extends keyof React.JSX.IntrinsicElements> =
	React.ComponentPropsWithoutRef<T> & {
		node?: unknown;
	};

const markdownComponents: Components = {
	h1: ({ node: _node, ...props }: MarkdownElementProps<"h1">) => (
		<H1 {...props} />
	),
	h2: ({ node: _node, ...props }: MarkdownElementProps<"h2">) => (
		<H2 {...props} />
	),
	h3: ({ node: _node, ...props }: MarkdownElementProps<"h3">) => (
		<H3 {...props} />
	),
	h4: ({ node: _node, ...props }: MarkdownElementProps<"h4">) => (
		<H4 {...props} />
	),
	h5: ({ node: _node, ...props }: MarkdownElementProps<"h5">) => (
		<H5 {...props} />
	),
	h6: ({ node: _node, ...props }: MarkdownElementProps<"h6">) => (
		<H6 {...props} />
	),
	blockquote: ({
		node: _node,
		...props
	}: MarkdownElementProps<"blockquote">) => <Blockquote {...props} />,
	p: ({ node: _node, ...props }: MarkdownElementProps<"p">) => <P {...props} />,
	a: ({ node: _node, ...props }: MarkdownElementProps<"a">) => (
		<Anchor {...props} />
	),
	strong: ({ node: _node, ...props }: MarkdownElementProps<"strong">) => (
		<Strong {...props} />
	),
	em: ({ node: _node, ...props }: MarkdownElementProps<"em">) => (
		<Em {...props} />
	),
	ul: ({ node: _node, ...props }: MarkdownElementProps<"ul">) => (
		<Ul {...props} />
	),
	ol: ({ node: _node, ...props }: MarkdownElementProps<"ol">) => (
		<Ol {...props} />
	),
	li: ({ node: _node, ...props }: MarkdownElementProps<"li">) => (
		<Li {...props} />
	),
	code: ({ node: _node, ...props }: MarkdownElementProps<"code">) => (
		<InlineCode {...props} />
	),
	pre: ({ node: _node, ...props }: MarkdownElementProps<"pre">) => (
		<Pre {...props} />
	),
	sub: ({ node: _node, ...props }: MarkdownElementProps<"sub">) => (
		<Subscript {...props} />
	),
	sup: ({ node: _node, ...props }: MarkdownElementProps<"sup">) => (
		<Superscript {...props} />
	),
};

const rehypePlugins = [rehypeRaw];

export const Markdown = ({ children }: MarkdownProps) => {
	return (
		<ReactMarkdown
			children={children}
			components={markdownComponents}
			rehypePlugins={rehypePlugins}
		/>
	);
};
