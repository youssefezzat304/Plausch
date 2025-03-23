import { chats } from "@/api/chats";
import { useMutation } from "@tanstack/react-query";

export const useCreateChat = () => {
  const createChatMutation = useMutation({
    mutationFn: async (participants: string[]) => {
      const response = await chats.post("/private", { participants });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Chat created successfully:", data);
    },
    onError: (error) => {
      console.error("Failed to create chat:", error);
    },
  });

  return { createChatMutation };
};
