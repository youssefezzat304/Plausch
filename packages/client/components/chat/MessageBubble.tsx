// components/chat/MessageBubble.tsx
import { cn } from "@/lib/utils"; // Utility for conditional classNames
import { Avatar, AvatarFallback, AvatarImage } from "../ui/shadcn/avatar";

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
        "flex gap-2 max-w-[80%]",
        isSender ? "ml-auto" : "mr-auto",
        className,
      )}
    >
      {!isSender && (
        <Avatar className="h-8 w-8">
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
              ? "bg-primary text-primary-foreground rounded-tr-none"
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
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {timestamp && <span>{timestamp}</span>}
          {isSender && isRead && (
            <span className="text-primary">✓✓</span> // Double tick for read
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
