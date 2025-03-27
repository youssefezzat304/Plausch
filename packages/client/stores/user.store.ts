import { FriendRequest } from "@/types";
import { IUser } from "@shared/types/user.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  user: IUser | null;
  friends: IUser[];
  contacts: IUser[];
  friendRequests: FriendRequest[];
  setUser: (user: IUser | null) => void;
  setFriends: (friends: IUser[]) => void;
  setContacts: (contacts: IUser[]) => void;
  setFriendRequests: (friendRequests: FriendRequest[]) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      friends: [],
      contacts: [],
      friendRequests: [],
      setUser: (user) => set({ user }),
      setFriends: (friends) => set({ friends }),
      setContacts: (contacts) => set({ contacts }),
      setFriendRequests: (friendRequests) => set({ friendRequests }),
    }),
    {
      name: "me",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
