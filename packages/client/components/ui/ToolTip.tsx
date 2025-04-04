import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/shadcn/tooltip";

const ToolTip = ({
  children,
  tooltip,
  side,
  theme,
  className,
  delayDuration = 100,
}: {
  children: React.ReactNode;
  tooltip: string;
  side: "top" | "right" | "bottom" | "left";
  theme: "dark" | "light";
  className?: string;
  delayDuration?: number;
}) => {
  const tooltipStyles = {
    dark: "bg-[hsl(240,10%,3.9%)] text-[hsl(0,0%,100%)] p-2 rounded-lg shadow-lg",
    light:
      "bg-[hsl(240,4.8%,95.9%)] text-[hsl(240,10%,3.9%)] p-2 rounded-lg shadow-lg",
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          className={cn(tooltipStyles[theme], className)}
        >
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTip;
