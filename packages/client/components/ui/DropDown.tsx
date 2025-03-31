import { Button } from "@/components/ui/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { ComponentProps, JSX } from "react";
import ToolTip from "./ToolTip";

type DropDownOption = {
  label: string;
  icon?: JSX.Element;
  action?: () => void;
};

type DropDownMenuProps = ComponentProps<"button"> & {
  icon: JSX.Element;
  label?: string;
  theme?: "dark" | "light";
  options: DropDownOption[];
};

export function Dropdown({
  label,
  icon,
  theme = "light",
  options,
  ...props
}: DropDownMenuProps) {
  const themeStyles = {
    dark: "bg-[hsl(240,10%,3.9%)] text-white",
    light: "bg-[hsl(240,4.8%,95.9%)] text-black",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={`${props.className}`} variant="ghost">
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-56 shadow-md rounded-md border-none ${themeStyles[theme]}`}
      >
        <DropdownMenuLabel className="font-bold">{label}</DropdownMenuLabel>
        <DropdownMenuGroup>
          {options.map((option, index) => (
            <DropdownMenuItem
              key={index}
              onClick={option.action}
              className="cursor-pointer"
            >
              {option.icon && <span className="mr-2">{option.icon}</span>}
              <span>{option.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
