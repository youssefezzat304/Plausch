import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { useUserStore } from "@/stores/user.store";
import useChatStore from "@/stores/chat.store";
import { Message } from "@/types";
import dayjs from "dayjs";
import { FaAngleDown } from "react-icons/fa";
import useMessageManager from "@/hooks/useMessageManager";

const ChatWindow = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const currentUser = useUserStore((state) => state.user);
  const messages = useChatStore((state) => state.messages);
  const { isLoading, error } = useMessageManager();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isNearBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100;
      setShowScrollButton(!isNearBottom);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading messages...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        Error loading messages.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col h-full overflow-y-auto p-4 gap-1 transition-all duration-300"
    >
      {messages.map((message: Message) => (
        <MessageBubble
          key={message._id}
          message={message.content.text}
          senderAvatar={message.sender.profilePicture}
          type={message.content.type}
          alignment={message.sender._id === currentUser?._id ? "right" : "left"}
          timestamp={message.createdAt}
        />
      ))}
      <div ref={messagesEndRef} className="pt-2" />
      {showScrollButton && (
        <div
          onClick={handleScrollToBottom}
          className="cursor-pointer absolute bottom-4 right-4 bg-(--primary-hard) rounded-full p-2 active:scale-95 transition-all duration-100"
        >
          <FaAngleDown />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
