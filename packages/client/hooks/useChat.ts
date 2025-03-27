import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import useChatStore from "@/stores/chat.store";
import { useUserStore } from "@/stores/user.store";
import { useSocketStore } from "@/stores/socket.store";
import { useEffect, useState, useCallback } from "react";
import { Socket } from "socket.io-client";
import { Message } from "@/types";
import { io } from "socket.io-client";
import { getMessages } from "@/api/message";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080";

interface ChatHookReturn {
  socket: Socket | null;
  typingUser: string | null;
  register: ReturnType<typeof useForm>["register"];
  handleSendMessage: (e: React.FormEvent) => void;
  watch: ReturnType<typeof useForm>["watch"];
  isSubmitting: boolean;
  error: Error | null;
}

export const useChat = (): ChatHookReturn => {
  const { register, handleSubmit, reset, watch } = useForm();

  const socket = useSocketStore((state) => state.socket);
  const setSocket = useSocketStore((state) => state.setSocket);
  const addMessage = useChatStore((state) => state.addMessage);
  const setMessages = useChatStore((state) => state.setMessages);

  const currentChat = useChatStore((state) => state.currentChat);
  const currentChatUser = useChatStore((state) => state.currentChatUser);
  const user = useUserStore((state) => state.user);

  const [typingUser, setTypingUser] = useState<string | null>(null);
  // TODO: Add a check to see if the current chat is a group chat or a direct chat
  const conversationId = currentChat?.conversationId || "1";

  const { data: apiMessages, isLoading } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
  });

  useEffect(() => {
    if (apiMessages) {
      setMessages(apiMessages);
    }
  }, [apiMessages, setMessages]);

  useEffect(() => {
    if (!user?._id) return;

    if (!socket) {
      const newSocket = io(SOCKET_URL, {
        withCredentials: true,
        transports: ["websocket"],
      });
      setSocket(newSocket);
    }

    const currentSocket = socket;
    if (currentSocket) {
      currentSocket.off("newMessage");
      currentSocket.off("typing");

      currentSocket.emit("joinConversation", conversationId);

      currentSocket.on("newMessage", (message: Message) => {
        addMessage(message);
      });

      currentSocket.on("typing", (typingUserId: string) => {
        setTypingUser(typingUserId);
        setTimeout(() => setTypingUser(null), 3000);
      });
    }

    return () => {
      if (currentSocket) {
        currentSocket.off("newMessage");
        currentSocket.off("typing");
      }
    };
  }, [conversationId, user?._id, socket, setSocket]);

  const sendMessageMutation = useMutation({
    mutationFn: async (values: any) => {
      if (socket) {
        socket.emit("sendMessage", {
          conversationId,
          content: { type: "text", text: values.content },
          senderId: user?._id,
          recipientId: currentChatUser?._id,
        });
      }
      return;
    },
    onSuccess: () => {
      reset();
    },
    onError: (error) => {
      console.error("Message send failed:", error);
    },
  });

  const handleSendMessage = handleSubmit(async (values) => {
    if (!values.content?.trim()) return;
    sendMessageMutation.mutate(values);
  });

  const notifyTyping = useCallback(() => {
    if (socket) {
      socket.emit("typing", conversationId);
    }
  }, [socket, conversationId]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "content" && value.content?.trim()) {
        notifyTyping();
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, notifyTyping]);

  return {
    socket,
    typingUser,
    register,
    handleSendMessage,
    watch,
    isSubmitting: sendMessageMutation.isPending,
    error: sendMessageMutation.error as Error | null,
  };
};
