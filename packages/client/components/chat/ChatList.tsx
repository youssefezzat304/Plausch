import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/stores/user.store";
import useTabsStore from "@/stores/tabs.store";
import SearchBar from "../ui/SearchBar";
import ContactListItem from "./ContactListItem";
import ChatListItem from "./ChatListItem";
import useGetContacts from "@/hooks/useGetContacts";
import { getChats } from "@/api/api";
import { IUser } from "@shared/types/user.types";
import { Chat } from "@/types";

const ChatList = () => {
  const { isChatsOpen, isContactsOpen } = useTabsStore();
  const currentUser = useUserStore((state) => state.user);

  const { data: chats, isLoading: chatsLoading } = useQuery({
    queryKey: ["chats", currentUser?._id],
    queryFn: () => getChats(currentUser?._id!),
    enabled: !!currentUser && isChatsOpen,
  });

  const { data: contacts, isLoading: contactsLoading } =
    useGetContacts(isContactsOpen);

  const isLoading = isChatsOpen ? chatsLoading : contactsLoading;
  const activeData = isChatsOpen ? chats : contacts;
  const activeTabName = isChatsOpen ? "chats" : "contacts";

  return (
    <div className="will-change-transform overflow-x-hidden rounded-bl-[22px] w-full max-w-full overflow-y-auto listShadow">
      <SearchBar />

      <div className="flex flex-col p-2">
        {isLoading ? (
          <div className="flex justify-center items-center h-32 text-gray-500">
            Loading {activeTabName}...
          </div>
        ) : (
          <>
            {activeData && activeData.length > 0 ? (
              isChatsOpen ? (
                (activeData as Chat[]).map((chat) => (
                  <ChatListItem key={chat._id} chat={chat} />
                ))
              ) : (
                (activeData as IUser[]).map((user) => (
                  <ContactListItem key={user._id} user={user} />
                ))
              )
            ) : (
              <div className="flex justify-center items-center h-32 text-gray-500">
                No {activeTabName} found
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatList;
