import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownProps {
	children?: string | null;
}

const rehypePlugins = [rehypeRaw];

export const Markdown = ({ children }: MarkdownProps) => {
	return (
		<div className="prose">
			<ReactMarkdown children={children} rehypePlugins={rehypePlugins} />
		</div>
	);
};
