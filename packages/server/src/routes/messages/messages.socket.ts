import { Socket } from "socket.io";
import MessagesService from "../messages/messages.service";

export default function messageSocketHandler(socket: Socket, userId: string) {
  const messagesService = new MessagesService();

  socket.on("joinConversation", (conversationId: string) => {
    socket.join(conversationId);
    console.log(`User ${userId} joined conversation ${conversationId}`);
  });

  socket.on(
    "sendMessage",
    async (data: { conversationId: string; content: any }) => {
      try {
        const message = await messagesService.sendMessage(
          userId,
          data.conversationId,
          data.content,
        );

        // Broadcast to conversation room
        socket.to(data.conversationId).emit("newMessage", message);
      } catch (error) {
        socket.emit("error", { message: "Failed to send message" });
      }
    },
  );

  socket.on("typing", (conversationId: string) => {
    socket.to(conversationId).emit("typing", userId);
  });
}
