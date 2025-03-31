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
}: {
  children: React.ReactNode;
  tooltip: string;
  side: "top" | "right" | "bottom" | "left";
  theme: "dark" | "light";
}) => {
  const tooltipStyles = {
    dark: "bg-[hsl(240,10%,3.9%)] text-[hsl(0,0%,100%)] p-2 rounded-lg shadow-lg",
    light:
      "bg-[hsl(240,4.8%,95.9%)] text-[hsl(240,10%,3.9%)] p-2 rounded-lg shadow-lg",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} className={tooltipStyles[theme]}>
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTip;
