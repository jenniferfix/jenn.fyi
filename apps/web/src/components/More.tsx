"use client";
import { cn } from "@jenn.fyi/ui/lib/utils";
import { CaretDownIcon } from "@phosphor-icons/react";
import React from "react";

export const More = () => {
	const [scrollPos, setScrollPos] = React.useState(0);
	const [show, setShow] = React.useState(true);

	React.useEffect(() => {
		const mainElement = document.getElementById("main");
		if (!mainElement) return;
		const full = mainElement.scrollHeight - window.innerHeight;
		if (scrollPos > full - 20) {
			setShow(false);
		} else {
			setShow(true);
		}
	}, [scrollPos]);

	React.useEffect(() => {
		const handleScroll = () => {
			const mainElement = document.getElementById("main");
			if (!mainElement) return;

			setScrollPos(mainElement.scrollTop);
		};
		handleScroll();

		const mainElement = document.getElementById("main");
		if (mainElement) {
			mainElement.addEventListener("scroll", handleScroll, { passive: true });
		}

		return () => {
			if (mainElement) mainElement.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			className={cn(
				"text-sm cursor-default absolute bottom-2 inset-x-0 w-fit mx-auto bg-popover/75 text-popover-foreground  py-2 px-4 rounded flex items-center gap-1",
				show
					? "animate-in fade-in-25 slide-in-from-bottom"
					: "animate-out fade-out-0 slide-out-to-bottom-0",
				show ? "opacity-100" : "opacity-0 pointer-events-none",
				show ? "translate-y-0" : "translate-y-4",
			)}
		>
			More <CaretDownIcon className="inline-block" />
		</div>
	);
};
