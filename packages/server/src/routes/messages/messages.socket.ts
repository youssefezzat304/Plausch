import { Server } from "socket.io";
import MessagesService from "../messages/messages.service";
import { Content } from "./messages.model";
import { UserSocket } from "@/types/socket.io";
import ChatsService from "../privateChats/privateChats.service";

const privateChatsService = new ChatsService();

export default function messageSocketHandler(io: Server, socket: UserSocket) {
  const userId = socket.userId;
  const messagesService = new MessagesService();

  socket.on("joinConversation", (conversationId: string) => {
    const roomName = `chats:${conversationId}`;
    socket.join(roomName);
    console.log(`User ${userId} joined ${roomName}`);
  });

  socket.on(
    "sendMessage",
    async (data: { content: Content; conversationId: string }, callback) => {
      try {
        const senderId = userId;
        const { content, conversationId } = data;

        const message = await messagesService.sendMessage(
          senderId,
          content,
          conversationId,
        );

        io.to(`chats:${conversationId}`).emit("newMessage", message);

        const chat = await privateChatsService.getChat(conversationId);

        io.to(`chatList:${conversationId}`).emit("updateLastMessage", chat);
      } catch (error: any) {
        callback({ error: error.message, success: false });
      }
    },
  );

  socket.on("typing", (conversationId: string) => {
    socket.to(conversationId).emit("typing", userId);
  });

  socket.on("leaveConversation", (conversationId: string) => {
    const rooms = Array.from(socket.rooms);

    rooms.forEach((room) => {
      if (room.startsWith("chats:") && room !== `chats:${conversationId}`) {
        socket.leave(room);
        console.log(`User ${userId} left ${room}`);
      }
    });
  });
}
