import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@jenn.fyi/ui/components/input-group";
import { cn } from "@jenn.fyi/ui/lib/utils";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import React from "react";

export const PasswordInput = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<"input">) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <InputGroup>
      <InputGroupInput
        disabled={disabled}
        type={showPassword ? "text" : "password"}
        className={cn("", className)}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          disabled={disabled}
          variant="ghost"
          size="icon-sm"
          onClick={() => setShowPassword((show) => !show)}
        >
          {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};
