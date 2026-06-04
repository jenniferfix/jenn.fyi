import { ScrollArea } from "@jenn.fyi/ui/components/scroll-area";
import bio from "../../data/bio.md?html";

export const Bio = () => {
	return (
		<section id="resume" className="flex flex-col min-h-screen snap-start">
			<div className="grow flex flex-col justify-center items-center">
				<div className="h-[85vh] flex flex-col max-w-4xl">
					<ScrollArea className="h-1 grow">
						<div className="mr-8" dangerouslySetInnerHTML={{ __html: bio }} />
					</ScrollArea>
				</div>
			</div>
		</section>
	);
};
