import { Badge, badgeVariants } from "@jenn.fyi/ui/components/badge";
import { cn } from "@jenn.fyi/ui/lib/utils";
import React from "react";
import { useContent } from "./ContentContext";

interface StackBadgeProps {
  label: string;
  url?: string;
}

export const StackBadge = ({
  label,
  url,
  variant,
  ...props
}: StackBadgeProps & React.ComponentProps<typeof Badge>) => {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        className={badgeVariants({
          className: "",
        })}
      >
        {label}
      </a>
    );
  }
  return <Badge {...props}>{label}</Badge>;
};

export const TechStack = () => {
  const { stackBadges } = useContent();

  return (
    <div className="flex flex-wrap gap-0.5">
      {stackBadges.map((badge) => (
        <StackBadge
          className={cn("cursor-default")}
          key={badge.label}
          label={badge.label}
          url={badge.url}
        />
      ))}
    </div>
  );
};
