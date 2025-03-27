import { Chat } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/shadcn/avatar";
import useChatStore from "@/stores/chat.store";
import { useUserStore } from "@/stores/user.store";
import dayjs from "dayjs";
import { FaCircle } from "react-icons/fa";

const ChatListItem = ({ chat }: { chat: Chat }) => {
  const currentUser = useUserStore((state) => state.user);
  const setCurrentChatUser = useChatStore((state) => state.setCurrentChatUser);
  const setCurrentChat = useChatStore((state) => state.setCurrentChat);
  const { participants, lastMessage } = chat;

  const otherParticipants = participants.filter(
    (participant) => participant._id !== currentUser?._id,
  );

  const isMe = lastMessage?.sender === currentUser?._id;

  const directChatParticipant = otherParticipants[0];

  //TODO: Add group chat support
  // const groupParticipants = otherParticipants;

  return (
    <div
      onClick={() => {
        setCurrentChat(chat);
        setCurrentChatUser(directChatParticipant);
      }}
      className="flex justify-between items-center cursor-pointer whitespace-nowrap overflow-x-hidden text-ellipsis w-full max-w-full p-2.5 rounded-lg transition-all duration-100 hover:bg-gray-200 active:bg-(--primary-hard) active:scale-98"
    >
      <section className="flex items-center gap-2">
        <div>
          <Avatar className="h-14 w-14 hover:opacity-90 rounded-2xl">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt={directChatParticipant.displayName}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <FaCircle
            size={12}
            className="text-green-500 z-50 relative left-1 bottom-2 border-2 border-white rounded-full bg-green-500"
          />
        </div>

        <div>
          <label className="text-md">{directChatParticipant.displayName}</label>
          <p className="text-sm text-gray-500">
            <span className="text-(--primary-hard)">{isMe && "You: "}</span>
            {lastMessage?.content.text}
          </p>
        </div>
      </section>

      <section className="m-2">
        <p className="text-xs text-gray-500">
          {dayjs(lastMessage?.createdAt).format("DD/MM/YYYY HH:mm")}
        </p>
      </section>
    </div>
  );
};

export default ChatListItem;
