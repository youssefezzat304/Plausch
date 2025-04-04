import { UserSocket } from "@/types/socket.io";
import { Server } from "socket.io";
import { FriendsService } from "./friends.service";

const friendService = new FriendsService();

export default function friendsSocketHandler(io: Server, socket: UserSocket) {
  const userId = socket.userId;

  socket.on("addFriend", async (data: { email: string }, callback) => {
    try {
      console.log(data);
      const friendRequest = await friendService.addFriend(userId, data.email);

      io.to(`friendRequests:${friendRequest?.recipient._id}`).emit(
        "friendRequest",
        friendRequest,
      );
      callback({
        success: true,
        recipientEmail: data.email,
      });
    } catch (error: any) {
      callback({ success: false, error: error.message });
    }
  });

  socket.on("acceptFriendRequest", async ({ friendId }, callback) => {
    try {
      const { friendRequest, chat } = await friendService.acceptFriendRequest(
        userId,
        friendId,
      );

      io.to(`friendRequests:${userId}`).emit("friendRequestAccepted", {
        friendRequest,
        chat,
      });

      io.to(`friendRequests:${friendId}`).emit("friendRequestAccepted", {
        friendRequest,
        chat,
      });

      callback({ success: true, friendRequest, chat });
    } catch (error: any) {
      callback({ success: false, error: error.message });
    }
  });

  socket.on("rejectFriendRequest", async ({ friendId }, callback) => {
    try {
      const updatedRequest = await friendService.rejectFriendRequest(
        userId,
        friendId,
      );

      io.to(`friendRequests:${userId}`).emit(
        "friendRequestRejected",
        updatedRequest,
      );

      callback({ success: true, friendRequest: updatedRequest });
    } catch (error: any) {
      callback({ success: false, error: error.message });
    }
  });
}
