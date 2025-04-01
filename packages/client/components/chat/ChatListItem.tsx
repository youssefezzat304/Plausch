import { PrivateChat } from "@shared/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/shadcn/avatar";
import useChatStore from "@/stores/chat.store";
import { useUserStore } from "@/stores/user.store";
import { FaCircle } from "react-icons/fa";
import { timestamp } from "@/utils/time";

const ChatListItem = ({ chat }: { chat: PrivateChat }) => {
  const { participants, lastMessage } = chat;

  const currentUser = useUserStore((state) => state.user);
  const setCurrentChat = useChatStore((state) => state.setCurrentChat);
  const setCurrentChatUser = useChatStore((state) => state.setCurrentChatUser);
  const onlineStatus = useUserStore((state) => state.onlineStatus);
  const otherParticipants = participants.filter(
    (participant) => participant._id !== currentUser?._id,
  );

  const isMe = lastMessage?.sender._id === currentUser?._id;

  const directChatParticipant = otherParticipants[0];

  const isOnline = onlineStatus[directChatParticipant._id];

  return (
    <div
      onClick={() => {
        setCurrentChat(chat);
        setCurrentChatUser(directChatParticipant);
        window.scrollTo(0, 0);
      }}
      className="flex justify-between items-center cursor-pointer whitespace-nowrap overflow-x-hidden text-ellipsis h-full w-full max-w-full px-1 py-2 rounded-lg transition-all duration-100 hover:bg-gray-200 active:bg-(--primary-hard) active:scale-98"
    >
      <section className="flex items-center gap-2">
        <div className="flex items-center relative">
          <Avatar className="h-14 w-14 hover:opacity-90 rounded-2xl">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt={directChatParticipant.displayName}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <FaCircle
            size={12}
            className={`text-green-500 z-50 absolute bottom-0 right-0 border-2 border-white rounded-full bg-green-500 transition-all duration-500 ${
              isOnline ? "scale-100" : "scale-0"
            }`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-md">{directChatParticipant.displayName}</label>
          <p className="text-sm text-gray-500">
            <span className="text-(--primary-hard)">{isMe && "You: "}</span>
            {lastMessage?.content.text}
          </p>
        </div>
      </section>

      <section className="m-2">
        <p className="text-xs text-gray-500">
          {timestamp(lastMessage?.createdAt)}
        </p>
      </section>
    </div>
  );
};

export default ChatListItem;
