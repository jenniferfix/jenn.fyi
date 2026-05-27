import { Button, buttonVariants } from "@jenn.fyi/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@jenn.fyi/ui/components/card";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	useCarousel,
} from "@jenn.fyi/ui/components/carousel";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@jenn.fyi/ui/components/tooltip";
import { GithubLogoIcon } from "@phosphor-icons/react";
import React from "react";
import { useContent } from "./ContentContext";

export const Portfolio = () => {
	const { projects } = useContent();
	return (
		<section className="p-4 min-h-full snap-start flex flex-col">
			<h2 className="text-2xl font-bold p-1 pb-2">Projects I&apos;ve done</h2>
			<div className="grow flex justify-center items-center">
				<div className="w-full max-w-xl h-[80%]">
					<Carousel>
						<CarouselContent>
							{projects.map((p) => (
								<CarouselItem key={p.name}>
									<div className="p-1">
										<Card typeof="article" className="h-[80vh]">
											<CardHeader>
												<CardTitle>{p.name}</CardTitle>
											</CardHeader>
											<CardContent>
												<div>
													<p>{p.description}</p>
												</div>
											</CardContent>
											<CardFooter>
												{p.github && (
													<Tooltip>
														<TooltipTrigger
															render={
																<a
																	href={p.github}
																	target="_blank"
																	rel="noopener"
																	className={buttonVariants({
																		size: "icon",
																		variant: "ghost",
																	})}
																>
																	<GithubLogoIcon />
																</a>
															}
														/>
														<TooltipContent>See code on Github</TooltipContent>
													</Tooltip>
												)}
											</CardFooter>
										</Card>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</div>
		</section>
	);
};
