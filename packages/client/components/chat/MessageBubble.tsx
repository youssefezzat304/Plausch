import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/shadcn/avatar";
import { messageTimestamp } from "@/utils/time";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { useState } from "react";
import { toast } from "sonner";
import ToolTip from "../ui/ToolTip";

interface MessageBubbleProps {
  message?: string;
  type: "text" | "image";
  alignment: "left" | "right";
  senderName?: string;
  senderAvatar?: string;
  timestamp?: string;
  isRead?: boolean;
  className?: string;
}

const MessageBubble = ({
  message,
  type,
  alignment,
  senderName,
  senderAvatar,
  timestamp,
  isRead,
  className,
}: MessageBubbleProps) => {
  const isSender = alignment === "right";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (message && type === "text") {
      try {
        await navigator.clipboard.writeText(message);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
        toast.success("Copied", {
          style: {
            backgroundColor: "var(--primary-hard)",
            color: "var(--white)",
            border: "none",
          },
        });
      } catch (err) {
        toast.error("Failed to copy text");
      }
    }
  };

  return (
    <div
      className={cn(
        "flex gap-1 max-w-[80%]",
        isSender ? "ml-auto" : "mr-auto",
        className,
      )}
    >
      {!isSender && (
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={senderAvatar} alt={senderName} />
          <AvatarFallback>{senderName?.[0]}</AvatarFallback>
        </Avatar>
      )}

      <div className="flex group gap-2">
        {!isSender && senderName && (
          <span className="text-xs text-muted-foreground">{senderName}</span>
        )}

        <div
          className={cn(
            "rounded-lg p-3",
            isSender
              ? "bg-(--primary-hard) text-primary-foreground rounded-tr-none"
              : "bg-muted rounded-tl-none",
          )}
        >
          {type === "text" ? (
            <p className="text-sm">{message}</p>
          ) : (
            <img
              src={message}
              alt="Message image"
              className="rounded-md max-w-[200px]"
            />
          )}
          <div
            className={cn(
              "text-xs text-muted-foreground flex justify-end",
              isSender && "text-white",
            )}
          >
            {timestamp && <span>{messageTimestamp(timestamp)}</span>}
            {isSender && isRead && <span className="text-primary">✓✓</span>}
          </div>
        </div>
        <ToolTip
          tooltip="Copy"
          className="m-1"
          side={isSender ? "left" : "right"}
          theme="dark"
          delayDuration={10}
        >
          {copied ? (
            <LuCopyCheck
              className={cn(
                "text-muted-foreground opacity-0 self-center group-hover:opacity-100 transition-opacity duration-200 cursor-pointer active:scale-95",
                isSender ? "order-first" : "order-last",
              )}
            />
          ) : (
            <LuCopy
              onClick={handleCopy}
              className={cn(
                "text-muted-foreground opacity-0 self-center group-hover:opacity-100 transition-opacity duration-200 cursor-pointer active:scale-95",
                isSender ? "order-first" : "order-last",
              )}
            />
          )}
        </ToolTip>
      </div>
    </div>
  );
};

export default MessageBubble;
