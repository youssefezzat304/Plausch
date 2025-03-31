import { getMessages } from "@/api/message";
import useChatStore from "@/stores/chat.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useMessageManager = () => {
  const currentChat = useChatStore((state) => state.currentChat);
  const setMessagesToChat = useChatStore((state) => state.setMessagesToChat);
  const conversationId = currentChat?._id;

  const {
    data: apiMessages,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId!),
    enabled: !!conversationId,
  });

  useEffect(() => {
    if (apiMessages && conversationId) {
      setMessagesToChat(conversationId, apiMessages);
    }
  }, [apiMessages, setMessagesToChat, conversationId]);

  return {
    isLoading,
    error,
  };
};

export default useMessageManager;
