import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/shadcn/avatar";
import { messageTimestamp } from "@/utils/time";

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

      <div className="flex flex-col gap-1">
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
      </div>
    </div>
  );
};

export default MessageBubble;
