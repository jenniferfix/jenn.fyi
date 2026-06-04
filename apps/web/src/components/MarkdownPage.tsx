import { ScrollArea } from "@jenn.fyi/ui/components/scroll-area";
import { MarkdownContent } from "./MarkdownContent";

export const MarkdownPage = ({
	title,
	content,
}: {
	title: React.ReactNode;
	content: string;
}) => {
	return (
		<section id="resume" className="flex flex-col min-h-screen snap-start">
			<h2 className="text-2xl font-bold mx-2 mb-4 my-4">{title}</h2>
			<div className="grow flex flex-col justify-center items-center">
				<div className="h-[85vh] flex flex-col max-w-4xl">
					<ScrollArea className="h-1 grow">
						<div className="mr-4">
							<MarkdownContent content={content} />
						</div>
					</ScrollArea>
				</div>
			</div>
		</section>
	);
};
