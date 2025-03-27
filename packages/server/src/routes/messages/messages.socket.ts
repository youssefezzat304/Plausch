import { Server } from "socket.io";
import MessagesService from "../messages/messages.service";
import { Content } from "./messages.model";
import { UserSocket } from "@/types/socket.io";

export default function messageSocketHandler(io: Server, socket: UserSocket) {
  const userId = socket.userId;
  const messagesService = new MessagesService();

  socket.on("joinConversation", (conversationId: string) => {
    socket.join(conversationId);
    console.log(`User ${userId} joined conversation ${conversationId}`);
  });

  socket.on(
    "sendMessage",
    async (data: {
      conversationId: string;
      content: Content;
      senderId: string;
      recipientId: string;
    }) => {
      try {
        const { conversationId, content, senderId, recipientId } = data;

        const message = await messagesService.sendMessage(
          senderId,
          conversationId,
          content,
          recipientId,
        );

        io.to(conversationId).emit("newMessage", message);
      } catch (error) {
        socket.emit("error", { message: "Failed to send message" });
      }
    },
  );

  socket.on("typing", (conversationId: string) => {
    socket.to(conversationId).emit("typing", userId);
  });
}
