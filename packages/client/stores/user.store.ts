import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IUser, FriendRequest, PrivateChat } from "@shared/types";

interface UserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;

  chats: Record<string, PrivateChat>;
  updateChat: (updatedChat: PrivateChat) => void;
  setChats: (chats: PrivateChat[]) => void;

  contacts: Record<string, IUser>;
  setContacts: (contacts: IUser[]) => void;
  onlineStatus: Record<string, boolean>;
  setOnlineStatus: (userId: string, isOnline: boolean) => void;
  setOnlineFriends: (onlineFriends: string[]) => void;
  friendRequests: FriendRequest[];
  setFriendRequests: (friendRequests: FriendRequest[]) => void;
  addFriendRequest: (friendRequest: FriendRequest) => void;
  removeFriendRequest: (friendRequest: FriendRequest) => void;
}

const createUserSlice = (set: any): Pick<UserStore, "user" | "setUser"> => ({
  user: null,
  setUser: (user: IUser | null) =>
    set((state: UserStore) => {
      state.user = user;
    }),
});

const createChatSlice = (
  set: any,
): Pick<UserStore, "chats" | "updateChat" | "setChats"> => ({
  chats: {},
  updateChat: (updatedChat: PrivateChat) =>
    set((state: UserStore) => {
      state.chats[updatedChat._id] = updatedChat;
    }),
  setChats: (chats: PrivateChat[]) =>
    set((state: UserStore) => {
      chats.forEach((chat) => {
        state.chats[chat._id] = chat;
      });
    }),
});

const createContactsSlice = (
  set: any,
): Pick<
  UserStore,
  | "contacts"
  | "onlineStatus"
  | "setOnlineStatus"
  | "setContacts"
  | "friendRequests"
  | "setFriendRequests"
  | "addFriendRequest"
  | "removeFriendRequest"
  | "setOnlineFriends"
> => ({
  contacts: {},
  onlineStatus: {},
  friendRequests: [],
  setContacts: (contacts: IUser[]) =>
    set((state: UserStore) => {
      contacts.forEach((contact) => {
        state.contacts[contact._id] = contact;
      });
    }),
  setOnlineStatus: (userId: string, isOnline: boolean) =>
    set((state: UserStore) => {
      state.onlineStatus[userId] = isOnline;
    }),
  setFriendRequests: (friendRequests: FriendRequest[]) =>
    set((state: UserStore) => {
      state.friendRequests = friendRequests;
    }),
  addFriendRequest: (friendRequest: FriendRequest) =>
    set((state: UserStore) => {
      state.friendRequests.push(friendRequest);
    }),
  removeFriendRequest: (friendRequest: FriendRequest) =>
    set((state: UserStore) => {
      state.friendRequests = state.friendRequests.filter(
        (request) => request._id !== friendRequest._id,
      );
    }),
  setOnlineFriends: (onlineFriends: string[]) =>
    set((state: UserStore) => {
      onlineFriends.forEach((friend) => {
        state.onlineStatus[friend] = true;
      });
    }),
});

export const useUserStore = create<UserStore>()(
  immer((set) => ({
    ...createUserSlice(set),
    ...createChatSlice(set),
    ...createContactsSlice(set),
  })),
);
