import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	useCarousel,
} from "@jenn.fyi/ui/components/carousel";
import React from "react";
import { useContent } from "./ContentContext";
import { Section } from "./home/Section";
import { Project } from "./Project";

export const Portfolio = () => {
	const { projects } = useContent();
	return (
		<Section id="portfolio" className="flex-col">
			<h2 className="text-2xl font-bold mx-4 mb-4 mt-2">
				Projects I&apos;ve done
			</h2>
			<div className="grow flex justify-center">
				<div className="w-full max-w-4xl h-[80vh]">
					<Carousel className="">
						<CarouselContent className="h-full">
							{projects.map((project) => (
								<CarouselItem key={project.name} className="flex flex-col">
									<article className="grow px-0 py-2">
										<Project {...project} />
									</article>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</div>
		</Section>
	);
};
