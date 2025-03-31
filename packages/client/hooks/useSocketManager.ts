import useChatStore from "@/stores/chat.store";
import { useSocketStore } from "@/stores/socket.store";
import { useUserStore } from "@/stores/user.store";
import { FriendRequest, Message, PrivateChat } from "@/types";
import { useEffect } from "react";
import { io } from "socket.io-client";

export const useSocketManager = () => {
  const socket = useSocketStore((state) => state.socket);
  const setSocket = useSocketStore((state) => state.setSocket);
  const currentChat = useChatStore((state) => state.currentChat);
  const addMessageToChat = useChatStore((state) => state.addMessageToChat);
  const addFriendRequest = useUserStore((state) => state.addFriendRequest);
  const removeFriendRequest = useUserStore(
    (state) => state.removeFriendRequest,
  );
  const updateChat = useUserStore((state) => state.updateChat);
  const setOnlineStatus = useUserStore((state) => state.setOnlineStatus);
  const setOnlineFriends = useUserStore((state) => state.setOnlineFriends);

  const conversationId = currentChat?._id;

  useEffect(() => {
    if (!socket) {
      const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
        withCredentials: true,
        transports: ["websocket"],
      });

      setSocket(newSocket);
    }

    const currentSocket = socket;

    if (currentSocket) {
      currentSocket.off("newMessage");
      currentSocket.off("typing");

      currentSocket.emit("onlineFriends", (onlineFriends: string[]) => {
        setOnlineFriends(onlineFriends);
      });

      currentSocket.on("userOnline", (userId) => {
        setOnlineStatus(userId, true);
      });

      currentSocket.on("userOffline", (userId) => {
        setOnlineStatus(userId, false);
      });

      currentSocket.on("updateLastMessage", (updatedChat: PrivateChat) => {
        updateChat(updatedChat);
      });

      currentSocket.on(
        "friendRequest",
        async (friendRequest: FriendRequest) => {
          addFriendRequest(friendRequest);
        },
      );

      currentSocket.on(
        "friendRequestAccepted",
        async (friendRequest: FriendRequest) => {
          removeFriendRequest(friendRequest);
        },
      );

      currentSocket.on(
        "friendRequestRejected",
        async ({ friendRequest, chat }) => {
          removeFriendRequest(friendRequest);
        },
      );

      currentSocket.emit("leaveConversation", conversationId);

      currentSocket.emit("joinConversation", conversationId);

      currentSocket.on("newMessage", async (message: Message) => {
        addMessageToChat(message.conversationId, message);
      });

      return () => {
        if (currentSocket) {
          currentSocket.off("friendRequest");
          currentSocket.off("friendRequestAccepted");
          currentSocket.off("friendRequestRejected");
          currentSocket.off("newMessage");
          currentSocket.off("userOnline");
          currentSocket.off("userOffline");
          currentSocket.off("connect");

          if (conversationId) {
            currentSocket.emit("leaveConversation", conversationId);
          }
        }
      };
    }
  }, [socket, setSocket, currentChat, addMessageToChat]);
};
