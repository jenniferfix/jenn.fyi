import { Button } from "@jenn.fyi/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@jenn.fyi/ui/components/dropdown-menu";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import * as React from "react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
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
			setScrollPos(window.scrollY);
		};
		handleScroll();

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						data-theme={theme}
						data-state={show ? "visible" : "hidden"}
						variant="ghost"
						size="icon-lg"
						className="size-18 relative"
						// className="data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=visible]:fade-in-0 data-[state=hidden]:fade-out-0 data-[state=visible]:visible data-[state=hidden]:invisible duration-1000"
					>
						<SunIcon
							data-theme={theme}
							className="absolute size-12 transition-opacity opacity-100 data-[theme=dark]:opacity-0 duration-250"
						/>
						<MoonIcon
							data-theme={theme}
							className="absolute size-12 transition-opacity opacity-100 data-[theme=light]:opacity-0 duration-250"
						/>
						<span className="sr-only">Toggle theme</span>
					</Button>
				}
			/>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("light")}>
					Light
				</DropdownMenuItem>
				{/* <DropdownMenuItem onClick={() => setTheme("system")}> */}
				{/*   System */}
				{/* </DropdownMenuItem> */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
