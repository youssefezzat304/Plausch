import { Server, Socket } from "socket.io";
import messageSocketHandler from "@/routes/messages/messages.socket";
import { authenticateSocket } from "@/middleswares/authenticateSocket.middleware";

export default function initializeSockets(io: Server) {
  io.use(async (socket, next) => {
    const userId = await authenticateSocket(socket);
    if (userId) {
      (socket as any).userId = userId;
      next();
    } else {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const userId = (socket as any).userId;
    console.log(`User connected: ${userId}`);

    messageSocketHandler(socket, userId);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${userId}`);
    });
  });
}
