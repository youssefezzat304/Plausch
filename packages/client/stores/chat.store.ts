import { Chat, Message } from "@/types";
import { IUser } from "@shared/types/user.types";
import { create } from "zustand";

interface ChatStore {
  currentChat: Chat | null;
  currentChatUser: IUser | null;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setCurrentChat: (chat: Chat) => void;
  setCurrentChatUser: (user: IUser) => void;
}

const useChatStore = create<ChatStore>((set) => ({
  currentChat: null,
  currentChatUser: null,
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setCurrentChat: (chat) => set({ currentChat: chat }),
  setCurrentChatUser: (user) => set({ currentChatUser: user }),
}));

export default useChatStore;
