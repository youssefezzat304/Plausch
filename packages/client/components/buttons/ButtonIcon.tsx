import { ComponentProps, JSX } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/shadcn/tooltip";
import Link from "next/link";

type NavBarBtnProps = ComponentProps<"button"> & {
  icon: JSX.Element;
  theme?: "dark" | "light";
  tooltip?: string;
  side?: "top" | "right" | "bottom" | "left";
  to?: string;
};

const ButtonIcon = ({
  icon,
  tooltip,
  side = "top",
  theme = "dark",
  to,
  ...props
}: NavBarBtnProps) => {
  const tooltipStyles = {
    dark: "bg-[hsl(240,10%,3.9%)] text-[hsl(0,0%,100%)] p-2 rounded-lg shadow-lg",
    light:
      "bg-[hsl(240,4.8%,95.9%)] text-[hsl(240,10%,3.9%)] p-2 rounded-lg shadow-lg",
  };

  const mainStyle =
    "flex flex-col items-center gap-2 p-2 text-(--text-gray) hover:text-(--primary-hard) transition-colors cursor-pointer";

  return (
    <Link href={to || ""}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={`${mainStyle} ${props.className}`}
            type={props.type || "button"}
            title={props.title}
            onClick={props.onClick}
          >
            {icon}
          </TooltipTrigger>
          <TooltipContent side={side} className={tooltipStyles[theme]}>
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
};

export default ButtonIcon;
