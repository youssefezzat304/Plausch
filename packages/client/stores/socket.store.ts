import { create } from "zustand";
import { Socket } from "socket.io-client";
import { Message } from "@/types";

interface SocketStore {
  socket: Socket | null;
  messages: Message[];
  setSocket: (socket: Socket | null) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  messages: [],
  setSocket: (socket) => set({ socket }),
  addMessage: (message: Message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}));
