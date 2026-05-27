import { cn } from "@jenn.fyi/ui/lib/utils";

// const Jennifer = () => {
//   return <ResponsiveImage alt="Headshot of Jennifer" sizes={} />
// }
// 400x513
// 250x321
// 150x192
// 80x103
//

export const JenniferAvatar = ({
	className,
	...props
}: React.ComponentProps<"img">) => {
	return (
		<img
			loading="eager"
			src="/images/jennifer_250.webp"
			alt="Headshot of Jennifer"
			srcSet="/images/jennifer_150.webp 150w, /images/jennifer_250.webp 250w, /images/jennifer_400.webp 400w, /images/jennifer_600.webp 600w"
			sizes="144px"
			width={150}
			height={192}
			className={cn(
				"size-36 object-cover object-[center_20%] rounded-full",
				className,
			)}
			{...props}
		/>
	);
};
