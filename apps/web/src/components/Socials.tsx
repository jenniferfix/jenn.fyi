import { Button, buttonVariants } from "@jenn.fyi/ui/components/button";
import { BlueskyIcon, GitlabIcon, LinkedInIcon } from "@jenn.fyi/ui/icons";
import { AtIcon, GithubLogoIcon, XLogoIcon } from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import { useContent } from "./ContentContext";
import { MailForm } from "./MailForm";

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
	const navigate = useNavigate();

	return (
		<div className="flex gap-1">
			{socials.map((item) => (
				<a
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
			<Button
				size="icon-lg"
				variant="ghost"
				aria-label="Email"
				className="size-18 cursor-pointer sm:size-16"
				onClick={() => navigate({ to: "/", search: { showContactForm: true } })}
			>
				<AtIcon className={iconClassName} />
			</Button>
		</div>
	);
};
