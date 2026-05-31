import { buttonVariants } from "@jenn.fyi/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@jenn.fyi/ui/components/card";
import { ScrollArea } from "@jenn.fyi/ui/components/scroll-area";
import { GithubLogoIcon } from "@phosphor-icons/react";
import type { ProjectType } from "@/lib/schema";
import { SlidePage } from "./ScreenshotPage";

export interface ProjectProps extends ProjectType {}

export const Project = ({
	name,
	description,
	demo,
	slides,
	github,
	...props
}: ProjectProps & React.ComponentProps<typeof Card>) => {
	return (
		<Card {...props} className="max-h-full h-[80vh]">
			<CardHeader>
				<CardTitle>{name}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="grow flex flex-col">
				<ScrollArea className="h-1 grow [&_[data-slot=scroll-area-viewport]]:snap-y [&_[data-slot=scroll-area-viewport]]:snap-mandatory [&_[data-slot=scroll-area-viewport]]:overflow-y-auto">
					{slides?.length ? (
						slides.map((slide, i) => (
							<SlidePage key={`slide-${i}`} {...slide} />
						))
					) : (
						<span>No images...</span>
					)}
				</ScrollArea>
			</CardContent>
			<CardFooter className="justify-center">
				{github && (
					<a
						href={github}
						className={buttonVariants({
							variant: "ghost",
							size: "icon",
							className: "grow max-w-sm",
						})}
					>
						<GithubLogoIcon />
					</a>
				)}
				{demo && (
					<a
						href={demo}
						className={buttonVariants({
							variant: "ghost",
							size: "icon",
							className: "grow max-w-sm",
						})}
					>
						<GithubLogoIcon />
					</a>
				)}
			</CardFooter>
		</Card>
	);
};
