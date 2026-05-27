import { ThemeSwitch } from "./ThemeSwitch";

const FloatingTheme = () => {
	return (
		<div className="absolute top-4 lg:top-8 right-4 lg:right-8">
			<ThemeSwitch />
		</div>
	);
};

export default FloatingTheme;
