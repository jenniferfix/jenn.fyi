import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@jenn.fyi/ui/components/tabs";
import { cn } from "@jenn.fyi/ui/lib/utils";
import React from "react";
import type { ProjectSlide, ScreenshotType, VariantRecord } from "@/lib/schema";
import { type Theme, useTheme } from "./theme-provider";

export type ScreenshotPageProps = ScreenshotType &
	React.ComponentProps<"figure">;

export const ScreenshotPageImage = ({
	alt,
	description,
	images,
	...props
}: ScreenshotType & React.ComponentProps<"figure">) => {
	const id = React.useId();

	const defaultImg = images.find((img) => img.default === true) ?? images[0];
	const srcset = images.map((img) => `${img.url} ${img.width}w`).join(", ");

	return (
		<figure id={id} {...props}>
			<figcaption className="px-4 py-2 bg-background/30 text-foreground text-sm">
				{description}
			</figcaption>
			<img
				loading="lazy"
				src={defaultImg.url}
				width={defaultImg.width}
				height={defaultImg.height}
				alt={alt}
				srcSet={srcset}
				sizes={"(min-width: 768px) 600px, 100vw"}
			/>
		</figure>
	);
};

type VariantSlideProps = { variants: VariantRecord };

export const ScreenshotPageVariants = ({ variants }: VariantSlideProps) => {
	const { theme } = useTheme();
	const [currentTheme, setCurrentTheme] = React.useState<"dark" | "light">(
		theme === "system" ? "light" : theme,
	);

	return (
		<Tabs value={currentTheme}>
			<TabsList>
				{Object.entries(variants).map(([key, variant]) => {
					return (
						<TabsTrigger key={key} value={key}>
							{variant.name}
						</TabsTrigger>
					);
				})}
			</TabsList>

			{Object.entries(variants).map(([key, variant]) => (
				<TabsContent key={key} value={key}>
					<ScreenshotPageImage {...variant} />
				</TabsContent>
			))}
		</Tabs>
	);
};

export type SlidePageProps = {} & ProjectSlide;

export const SlidePage = (props: SlidePageProps) => {
	// if (images?.length)
	// 	return <ScreenshotPageImages images={images} {...props} />;
	// if (variants)
	// 	return <ScreenshotPageVariants variants={variants} {...props} />;
	// throw Error("Must have one of images or variants");
	return (
		<div className="snap-start min-h-full pr-4">
			<div className="border rounded-3xl h-full overflow-hidden">
				{props.type === "basic" && <ScreenshotPageImage {...props.image} />}
				{props.type === "variants" && (
					<ScreenshotPageVariants variants={props.variants} />
				)}
			</div>
		</div>
	);
};
