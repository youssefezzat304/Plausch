import { Avatar, AvatarFallback, AvatarImage } from "../ui/shadcn/avatar";
import useChatStore from "@/stores/chat.store";
import { IUser } from "@shared/types";

const ContactListItem = ({ user }: { user: IUser }) => {
  const setCurrentChatUser = useChatStore((state) => state.setCurrentChatUser);

  return (
    <div
      onClick={() => setCurrentChatUser(user)}
      className="flex justify-between items-center cursor-pointer whitespace-nowrap overflow-x-hidden text-ellipsis h-full w-full max-w-full px-1 py-2 rounded-lg transition-all duration-100 hover:bg-gray-200 active:bg-(--primary-hard) active:scale-98"
    >
      <section className="flex items-center gap-2">
        <Avatar className="h-14 w-14 hover:opacity-90 rounded-2xl">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt={user.displayName}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <label className="text-sm">{user.displayName}</label>
        </div>
      </section>
    </div>
  );
};

export default ContactListItem;
