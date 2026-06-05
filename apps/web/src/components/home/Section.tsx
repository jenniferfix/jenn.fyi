import { cn } from "@jenn.fyi/ui/lib/utils";

export const Section = ({
	title,
	className,
	...props
}: React.ComponentProps<"section">) => {
	return (
		<section
			className={cn("flex min-h-screen snap-start", className)}
			{...props}
		/>
	);
};
