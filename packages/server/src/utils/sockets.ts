import { Server } from "socket.io";
import messageSocketHandler from "@/routes/messages/messages.socket";
import { authenticateSocket } from "@/middleswares/authenticateSocket.middleware";
import { UserSocket } from "@/types/socket.io";
import { AuthError } from "./exception";
import UserService from "@/routes/users/users.service";
import friendsSocketHandler from "@/routes/friends/friends.socket";
import userSocketHandler from "@/routes/users/users.socket";
import { UserModel } from "@/routes/users/users.model";

const userService = new UserService();

const onlineUsers = new Map<string, Set<string>>();

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

    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }

    onlineUsers.get(userId)?.add(socket.id);

    if (onlineUsers.get(userId)?.size === 1) {
      await userService.setOnlineStatus(userId, true);
      io.emit("userOnline", userId);
    }

    userSocketHandler(io, socket);
    friendsSocketHandler(io, socket);
    messageSocketHandler(io, socket);

    socket.on("onlineFriends", async (callback) => {
      try {
        const user = await UserModel.findById(userId).populate(
          "contacts",
          "_id",
        );
        if (user) {
          const onlineFriends = user.contacts
            .filter((contact: any) => onlineUsers.has(contact._id.toString()))
            .map((contact: any) => contact._id.toString());

          socket.emit("onlineFriends", onlineFriends);
          callback(onlineFriends);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    });

    socket.on("disconnect", async () => {
      console.log(`User disconnected: ${userId} (socket: ${socket.id})`);
      const userSockets = onlineUsers.get(userId);
      if (userSockets) {
        userSockets.delete(socket.id);

        if (userSockets.size === 0) {
          await userService.setOnlineStatus(userId, false);
          onlineUsers.delete(userId);
          io.emit("userOffline", userId);
          console.log(`User ${userId} went offline`);
        }
      }
    });
  });
}
