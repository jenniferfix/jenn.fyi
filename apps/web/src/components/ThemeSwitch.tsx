import { Label } from "@jenn.fyi/ui/components/label";
import { Switch } from "@jenn.fyi/ui/components/switch";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import * as React from "react";
import { useTheme } from "./theme-provider";

export function ThemeSwitch() {
	const id = React.useId();
	const { setTheme, theme } = useTheme();

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
