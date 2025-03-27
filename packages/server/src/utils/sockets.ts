import { Server } from "socket.io";
import messageSocketHandler from "@/routes/messages/messages.socket";
import { authenticateSocket } from "@/middleswares/authenticateSocket.middleware";
import { UserSocket } from "@/types/socket.io";
import { AuthError } from "./exception";
import UserService from "@/routes/users/users.service";
import { FriendsService } from "@/routes/friends/friends.service";

const userService = new UserService();
const friendService = new FriendsService();

export default function initializeSockets(io: Server) {
  io.use(async (socket, next) => {
    try {
      const userId = await authenticateSocket(socket);
      socket.userId = userId;
      next();
    } catch (error) {
      next(new AuthError("Authentication error"));
    }
  });

  io.on("connection", async (socket: UserSocket) => {
    const userId = socket.userId;

    await userService.setOnlineStatus(userId, true);
    console.log(`User connected: ${userId}`);

    const contacts = await friendService.getUserContacts(userId);

    contacts.forEach((contactId) => {
      io.to(`user:${contactId}`).emit("presence", {
        userId,
        onlineStatus: true,
        lastSeen: null,
      });
    });

    messageSocketHandler(io, socket);

    socket.on("disconnect", async () => {
      console.log(`User disconnected: ${userId}`);
      await userService.setOnlineStatus(userId, false);
      contacts.forEach((contactId) => {
        io.to(`user:${contactId}`).emit("presence", {
          userId,
          onlineStatus: false,
          lastSeen: new Date(),
        });
      });
    });
  });
}
