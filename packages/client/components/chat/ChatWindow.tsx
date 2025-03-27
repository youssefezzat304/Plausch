import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { useUserStore } from "@/stores/user.store";
import useChatStore from "@/stores/chat.store";
import { Message } from "@/types";
import dayjs from "dayjs";
import { FaAngleDown } from "react-icons/fa";

const ChatWindow = () => {
  const currentUser = useUserStore((state) => state.user);
  const messages = useChatStore((state) => state.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 100;

    if (isNearBottom) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 10);
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full overflow-y-auto p-4 gap-1 transition-all duration-300"
    >
      {messages.map((message: Message) => (
        <MessageBubble
          key={message._id}
          message={message.content.text}
          senderAvatar={message.sender.profilePicture}
          type={message.content.type}
          alignment={message.sender._id === currentUser?._id ? "right" : "left"}
          timestamp={dayjs(message.createdAt).format("HH:mm")}
        />
      ))}
      <div ref={messagesEndRef} className="pt-2" />
      <div className="cursor-pointer absolute bottom-1 bg-(--primary-hard) rounded-full p-2 active:scale-95 transition-all duration-100">
        <FaAngleDown />
      </div>
    </div>
  );
};

export default ChatWindow;
