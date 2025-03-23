import { Chat, User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/shadcn/avatar";

const ChatListItem = ({ chat }: { chat: Chat }) => {
  const otherParticipant = chat.participants[0];
  const lastMessage = chat.lastMessage;

  return (
    <div className="flex justify-between items-center cursor-pointer whitespace-nowrap overflow-x-hidden text-ellipsis w-full max-w-full p-2.5 rounded-lg transition-all duration-100 hover:bg-secondary-soft active:bg-(--primary-hard) active:scale-98">
      <section className="flex items-center gap-2">
        <Avatar className="h-14 w-14 hover:opacity-90 rounded-2xl">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt={otherParticipant.displayName}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <label className="text-sm">{otherParticipant.displayName}</label>
          <p className="text-xs text-gray-500">{lastMessage?.content.text}</p>
        </div>
      </section>

      <section className="m-2">
        <p className="text-xs text-gray-500">{lastMessage?.createdAt}</p>
      </section>
    </div>
  );
};

export default ChatListItem;
