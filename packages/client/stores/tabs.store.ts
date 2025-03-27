import { create } from "zustand";

type TabName =
  | "notifications"
  | "friendRequests"
  | "chats"
  | "contacts"
  | "chatInfo";

type TabsStore = {
  isNotificationsOpen: boolean;
  isFriendRequestsOpen: boolean;
  isChatsOpen: boolean;
  isContactsOpen: boolean;
  isChatInfoOpen: boolean;

  setTab: (tab: TabName, state?: boolean) => void;
};

const useTabsStore = create<TabsStore>((set) => ({
  isNotificationsOpen: false,
  isFriendRequestsOpen: false,
  isChatsOpen: true,
  isContactsOpen: false,
  isChatInfoOpen: false,

  setTab: (tab, state) =>
    set((prev) => {
      if (tab === "chats") {
        return {
          isChatsOpen: state !== undefined ? state : !prev.isChatsOpen,
          isContactsOpen: state !== undefined ? !state : false,
        };
      }

      if (tab === "contacts") {
        return {
          isContactsOpen: state !== undefined ? state : !prev.isContactsOpen,
          isChatsOpen: state !== undefined ? !state : false,
        };
      }

      if (tab === "chatInfo") {
        return {
          ...prev,
          isChatInfoOpen: state !== undefined ? state : !prev.isChatInfoOpen,
        };
      }

      if (tab === "friendRequests") {
        return {
          ...prev,
          isFriendRequestsOpen:
            state !== undefined ? state : !prev.isFriendRequestsOpen,
        };
      }

      return {
        ...prev,
        [`is${tab[0].toUpperCase() + tab.slice(1)}Open`]:
          state !== undefined
            ? state
            : !prev[
                `is${
                  tab[0].toUpperCase() + tab.slice(1)
                }Open` as keyof TabsStore
              ],
      };
    }),
}));

export default useTabsStore;
