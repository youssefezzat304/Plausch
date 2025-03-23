import { mockMessages, mockUsers } from "@/lib/db";
import MessageBubble from "./MessageBubble";

const ChatWindow = () => {
  const messages = mockMessages;
  const currentUser = mockUsers[0];
  return (
    <div className="flex flex-col h-full overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageBubble
          key={message._id}
          message={message.content.text}
          type={message.content.type}
          alignment={message.senderId === currentUser._id ? "right" : "left"}
        />
      ))}
    </div>
  );
};

export default ChatWindow;
