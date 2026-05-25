import { buttonVariants } from "@jenn.fyi/ui/components/button";
import {
  BlueskyIcon,
  GithubIcon,
  GitlabIcon,
  LinkedInIcon,
  XIcon,
} from "@jenn.fyi/ui/icons";
import { useContent } from "./ContentContext";

const icons = {
  github: <GithubIcon className="text" />,
  x: <XIcon />,
  bluesky: <BlueskyIcon />,
  linkedin: <LinkedInIcon />,
  gitlab: <GitlabIcon />,
};

export const Socials = () => {
  const { socials } = useContent();

  return (
    <div className="flex flex-wrap gap-1">
      {socials.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          className={buttonVariants({ size: "icon-lg" })}
        >
          {icons[item.name]}
        </a>
      ))}
    </div>
  );
};
