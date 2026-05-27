import { Label } from "@jenn.fyi/ui/components/label";
import { Switch } from "@jenn.fyi/ui/components/switch";
import { cn } from "@jenn.fyi/ui/lib/utils";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import * as React from "react";
import { useTheme } from "./theme-provider";

export function ThemeSwitch() {
	const id = React.useId();
	const { setTheme, theme } = useTheme();
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

	const toggleTheme = React.useCallback(() => {
		setTheme(theme === "dark" ? "light" : theme === "light" ? "dark" : "dark");
	}, [theme, setTheme]);

	return (
		<div className="flex items-center gap-2">
			<Label
				htmlFor={id}
				aria-hidden="true"
				className="cursor-pointer text-muted-foreground"
			>
				<MoonIcon data-theme={theme} className="size-8" />
			</Label>
			<Switch
				id={id}
				checked={theme === "dark" ? false : true}
				onCheckedChange={toggleTheme}
			/>
			<Label
				htmlFor={id}
				aria-hidden="true"
				className="cursor-pointer text-muted-foreground"
			>
				<SunIcon data-theme={theme} className="size-8" />
			</Label>
		</div>
	);
}
