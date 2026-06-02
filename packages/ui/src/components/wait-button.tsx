import { Button } from "@jenn.fyi/ui/components/button";
import { Spinner } from "@jenn.fyi/ui/components/spinner";
import { cn } from "@jenn.fyi/ui/lib/utils";
import React from "react";

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
  loading?: boolean;
};

export const WaitButton = ({
  loading = false,
  children,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      {...props}
      className={cn("grid grid-cols-1 grid-rows-1", className)}
    >
      <div
        className={cn(
          "row-span-full col-span-full flex justify-center",
          loading ? "opacity-100" : "opacity-0",
        )}
      >
        <Spinner />
      </div>
      <div
        className={cn(
          "row-span-full col-span-full",
          loading ? "opacity-0" : "opacity-100",
        )}
      >
        {children}
      </div>
    </Button>
  );
};
