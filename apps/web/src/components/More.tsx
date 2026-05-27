"use client";
import { cn } from "@jenn.fyi/ui/lib/utils";
import { CaretDownIcon } from "@phosphor-icons/react";
import React from "react";

export const More = ({ visible = true }: { visible?: boolean }) => {
	const [scrollPos, setScrollPos] = React.useState(0);
	const [show, setShow] = React.useState(true);

	React.useEffect(() => {
		if (scrollPos > 0) {
			setShow(false);
		} else {
			setShow(true);
		}
	}, [scrollPos]);

	React.useEffect(() => {
		const handleScroll = () => {
			const mainElement = document.getElementById("main");
			if (mainElement) {
				setScrollPos(mainElement.scrollTop);
			}
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

	console.log("more", show, scrollPos);

	return (
		<div
			data-state={visible ? "visible" : "hidden"}
			className={cn(
				"text-sm cursor-default absolute bottom-2 inset-x-0 w-fit mx-auto bg-popover text-popover-foreground border py-1 px-2 rounded flex items-center gap-1",
				"data-[state=visible]:animate-in data-[state=hidden]:animate-out",
				"data-[state=visible]:fade-in-25 data-[state=hidden]:fade-out-0",
				"data-[state=visible]:slide-in-from-bottom data-[state=hidden]:slide-out-to-bottom-0",
				show ? "opacity-25" : "opacity-0 pointer-events-none",
				show ? "translate-y-0" : "translate-y-4",
			)}
		>
			More <CaretDownIcon className="inline-block" />
		</div>
	);
};
