import { UserSocket } from "@/types/socket.io";
import { Server } from "socket.io";

export default function userSocketHandler(io: Server, socket: UserSocket) {
  const userId = socket.userId;

  const privateChats = socket.user.privateChats;

  const rooms = [`user:${userId}`, `friendRequests:${userId}`];

  try {
    socket.join(rooms);
    privateChats.forEach((chat) => {
      socket.join(`chatList:${chat}`);
    });
    console.log(`User ${userId} joined ${rooms}`);
  } catch (error) {
    console.error("Failed to join rooms:", error);
  }
}
