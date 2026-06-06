import { buttonVariants } from "@jenn.fyi/ui/components/button";
import { BlueskyIcon, GitlabIcon, LinkedInIcon } from "@jenn.fyi/ui/icons";
import { AtIcon, GithubLogoIcon, XLogoIcon } from "@phosphor-icons/react";
import { usePostHog } from "@posthog/react";
import { Link } from "@tanstack/react-router";
import { useContent } from "./ContentContext";

const iconClassName = "size-9 sm:size-10";

const icons = {
	github: <GithubLogoIcon className={iconClassName} />,
	x: <XLogoIcon className={iconClassName} />,
	bluesky: <BlueskyIcon className={iconClassName} />,
	linkedin: <LinkedInIcon className={iconClassName} />,
	gitlab: <GitlabIcon className={iconClassName} />,
};

export const Socials = () => {
	const { socials } = useContent();
	const posthog = usePostHog();

	return (
		<div className="flex gap-1">
			{socials.map((item) => (
				<a
					onMouseOver={() => {
						posthog.capture("social_button.mouseover", { item: item.name });
					}}
					onFocus={() => {
						posthog.capture("social_button.focus", { item: item.name });
					}}
					onClick={() => {
						posthog.capture("social_button.click", { item: item.name });
					}}
					onTouchStart={() => {
						posthog.capture("social_button.touch", { item: item.name });
					}}
					key={item.name}
					href={item.url}
					target="_blank"
					rel="noopener"
					className={buttonVariants({
						variant: "ghost",
						size: "icon-lg",
						className: "size-18",
					})}
				>
					{icons[item.name]}
				</a>
			))}
			<Link
				to="/send-email"
				mask={{ to: "/" }}
				aria-label="Email"
				className={buttonVariants({
					variant: "ghost",
					size: "icon-lg",
					className: "size-18 cursor-pointer sm:size-16",
				})}
			>
				<AtIcon className={iconClassName} />
			</Link>
		</div>
	);
};
