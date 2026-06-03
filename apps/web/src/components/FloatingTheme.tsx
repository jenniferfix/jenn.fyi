import { cn } from "@jenn.fyi/ui/lib/utils";
import React from "react";
import { ThemeSwitch } from "./ThemeSwitch";

export const FloatingTheme = React.memo(() => {
	const [scrollPos, setScrollPos] = React.useState(0);
	const [show, setShow] = React.useState(true);

	React.useEffect(() => {
		if (scrollPos > 25) {
			setShow(false);
		} else {
			setShow(true);
		}
	}, [scrollPos]);

	React.useEffect(() => {
		const handleScroll = () => {
			setScrollPos(window.scrollY);
		};
		handleScroll();

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			className={cn(
				"fixed top-4 lg:top-8 right-4 lg:right-8 transition-opacity duration-300",
				show
					? "opacity-100 pointer-events-auto"
					: "opacity-0 pointer-events-none",
			)}
		>
			<ThemeSwitch />
		</div>
	);
});
