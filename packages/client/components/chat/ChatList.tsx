import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";
import { useUserStore } from "@/stores/user.store";
import useTabsStore from "@/stores/tabs.store";
import SearchBar from "../ui/SearchBar";
import ChatListItem from "./ChatListItem";
import { Chat } from "@/types";

const ChatList = () => {
  const currentUser = useUserStore((state) => state.user);
  const { isFriendsOpen, isContactsOpen, setTab } = useTabsStore(); // Changed from isChatsOpen

  // Fetch friends data only when friends tab is open
  const { data: friends, isLoading: friendsLoading } = useQuery({
    queryKey: ["friends", currentUser?._id],
    queryFn: async () => {
      const response = await api.get(`${currentUser!._id}/friends`);
      return response.data;
    },
    enabled: !!currentUser && isFriendsOpen,
  });

  // Fetch contacts data only when contacts tab is open
  const { data: contacts, isLoading: contactsLoading } = useQuery({
    queryKey: ["contacts", currentUser?._id], // Changed from chats
    queryFn: async () => {
      const response = await api.get(`${currentUser!._id}/contacts`);
      return response.data;
    },
    enabled: !!currentUser && isContactsOpen,
  });

  const isLoading = isFriendsOpen ? friendsLoading : contactsLoading;
  const activeData = isFriendsOpen ? friends : contacts;
  const activeTabName = isFriendsOpen ? "friends" : "contacts"; // Changed from chats

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
            {activeData?.length > 0 ? (
              activeData.map((item: Chat) => (
                <Link
                  key={item.conversationId}
                  href={`/${activeTabName}/${item.conversationId}`}
                >
                  <ChatListItem chat={item} />
                </Link>
              ))
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
