import React from "react";
import { JenniferAvatar } from "./JenniferAvatar";
import { Socials } from "./Socials";

const Char = React.memo(({ char }: { char: string }) => {
	return <span>{char}</span>;
});

const Typer = ({ text, delay }: { text: string; delay: number }) => {
	const [count, setCount] = React.useState(0);
	const [curText, setCurText] = React.useState("");
	const [flash, setFlash] = React.useState(true);

	React.useEffect(() => {
		let interval: ReturnType<typeof setInterval>;
		if (count >= text.length)
			interval = setInterval(() => setFlash((prev) => !prev), 500);

		return () => clearInterval(interval);
	}, [count, text]);

	React.useEffect(() => {
		let timeout: ReturnType<typeof setTimeout>;
		if (count < text.length) {
			timeout = setTimeout(() => {
				setCurText((prevText) => prevText + text[count]);
				setCount((prevCount) => prevCount + 1);
			}, delay);
		}

		return () => clearTimeout(timeout);
	}, [count, text, delay]);
	const outChar = flash ? "_" : "\xA0";
	return <span>{curText + outChar}</span>;
};

export const Hero = () => {
	return (
		<section id="hero" className="herosection">
			<div className="">
				<figure className="">
					<JenniferAvatar />
				</figure>
				<div className="">
					<div className="text-2xl font-code md:text-xl">
						<Typer text="Hello, World" delay={200} />
					</div>
					<div className="text-4xl my-2 sm:text-5xl">
						<span className="text-teal-400">I&#39;m </span>
						<span className="rainbowtext">Jennifer Fix</span>
					</div>
					<Socials />
				</div>
			</div>
		</section>
	);
};
