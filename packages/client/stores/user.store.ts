import { User } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  user: User | null;
  friends: User[];
  contacts: User[];
  setUser: (user: User | null) => void;
  setFriends: (friends: User[]) => void;
  setContacts: (contacts: User[]) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      friends: [],
      contacts: [],
      setUser: (user) => set({ user }),
      setFriends: (friends) => set({ friends }),
      setContacts: (contacts) => set({ contacts }),
    }),
    {
      name: "me",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
