import { PrivateChat, Message } from "@/types";
import { IUser } from "@shared/types/user.types";
import { create } from "zustand";
import { produce } from "immer";

export interface PrivateChatStore {
  messages: Message[];
  metadata: {
    lastUpdated: Date;
    isFetching: boolean;
  };
}

interface ChatStore {
  currentChat: PrivateChat | null;
  currentChatUser: IUser | null;
  privateChats: Record<string, PrivateChatStore>;
  messages: Message[];
  getChatMessages: (conversationId: string) => PrivateChatStore;
  addMessageToChat: (conversationId: string, message: Message) => void;
  setMessagesToChat: (conversationId: string, messages: Message[]) => void;
  setCurrentChat: (chat: PrivateChat | null) => void;
  setCurrentChatUser: (user: IUser) => void;
}

const useChatStore = create<ChatStore>((set, get) => ({
  currentChat: null,
  currentChatUser: null,
  privateChats: {},
  messages: [],
  getChatMessages: (conversationId: string) => {
    return (
      get().privateChats[conversationId] ?? {
        messages: [],
        metadata: {
          lastUpdated: new Date(),
          isFetching: false,
        },
      }
    );
  },

  addMessageToChat: (conversationId, message) =>
    set(
      produce((state: ChatStore) => {
        state.messages = [...state.messages, message];

        if (!state.privateChats[conversationId]) {
          state.privateChats[conversationId] = {
            messages: [],
            metadata: { lastUpdated: new Date(), isFetching: false },
          };
        }

        state.privateChats[conversationId].messages.push(message);

        state.privateChats[conversationId].metadata = {
          lastUpdated: new Date(),
          isFetching: false,
        };
      }),
    ),

  setMessagesToChat: (conversationId, messages) =>
    set(
      produce((state: ChatStore) => {
        if (state.privateChats[conversationId]) {
          state.messages = state.privateChats[conversationId].messages;
        } else {
          state.messages = messages;
        }

        state.privateChats[conversationId] = {
          messages,
          metadata: {
            lastUpdated: new Date(),
            isFetching: false,
          },
        };
      }),
    ),

  setCurrentChat: (chat) =>
    set(
      produce((state: ChatStore) => {
        if (state.currentChat) {
          state.privateChats[state.currentChat._id] = {
            messages: state.messages,
            metadata: {
              lastUpdated: new Date(),
              isFetching: false,
            },
          };
        }
        state.currentChat = chat;
      }),
    ),
  setCurrentChatUser: (user) => set({ currentChatUser: user }),
}));

export default useChatStore;
