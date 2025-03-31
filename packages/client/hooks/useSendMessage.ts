import { useMutation } from "@tanstack/react-query";
import { useSocketStore } from "@/stores/socket.store";
import { useUserStore } from "@/stores/user.store";
import useChatStore from "@/stores/chat.store";
export const useSendMessage = () => {
  const socket = useSocketStore((state) => state.socket);
  const user = useUserStore((state) => state.user);
  const currentChat = useChatStore((state) => state.currentChat);
  const conversationId = currentChat?._id;

  const sendMessage = (content: string) => {
    if (socket && conversationId && user) {
      socket.emit("sendMessage", {
        senderId: user._id,
        content: { type: "text", text: content },
        conversationId,
      });
    }
  };

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      sendMessage(content);
    },
  });

  return {
    sendMessage: mutation.mutateAsync,
    isSending: mutation.isPending,
    error: mutation.error,
  };
};
