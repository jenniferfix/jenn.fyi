import { cn } from "@jenn.fyi/ui/lib/utils";

export type MarkdownContentProps = {
	content: string;
} & React.ComponentProps<"article">;
export const MarkdownContent = ({
	className,
	content,
	...props
}: MarkdownContentProps) => {
	return (
		<article
			className={cn("prose prose-pink dark:prose-invert", className)}
			{...props}
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
};
