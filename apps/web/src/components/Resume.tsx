import { ScrollArea } from "@jenn.fyi/ui/components/scroll-area";
import resume from "../../data/resume.md?html";

export const Resume = () => {
	return (
		<section id="resume" className="flex flex-col min-h-screen snap-start">
			<h2 className="text-2xl font-bold mx-2 mb-4 my-4">Resume</h2>
			<div className="grow flex flex-col justify-center items-center">
				<div className="h-[85vh] flex flex-col max-w-4xl">
					<ScrollArea className="h-1 grow">
						<div
							className="mr-8"
							dangerouslySetInnerHTML={{ __html: resume }}
						/>
					</ScrollArea>
				</div>
			</div>
		</section>
	);
};
