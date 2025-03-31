import { toast } from "sonner";
import { useSocketStore } from "@/stores/socket.store";
import { FriendRequest } from "@/types";

export function useAddFriend() {
  const socket = useSocketStore((state) => state.socket);

  const addFriend = (email: string) => {
    if (!socket) {
      toast.error("No connection");
      return;
    }

    socket.emit(
      "addFriend",
      { email },
      (response: { success: boolean; error?: string }) => {
        if (response && response.success) {
          toast.info(`Friend request sent to ${email}`);
        } else {
          toast.error(response?.error || "Failed to send friend request");
        }
      },
    );
  };

  const acceptFriendRequest = (friendId: string) => {
    if (!socket) {
      toast.error("No connection");
      return;
    }

    socket.emit(
      "acceptFriendRequest",
      { friendId },
      (response: { success: boolean; friendRequest?: FriendRequest }) => {
        if (response && response.success) {
          toast.success(`Friend request accepted`);
        }
      },
    );
  };

  const rejectFriendRequest = (friendId: string) => {
    if (!socket) {
      toast.error("No connection");
      return;
    }

    socket.emit(
      "rejectFriendRequest",
      { friendId },
      (response: { success: boolean; friendRequest?: FriendRequest }) => {
        if (response && response.success) {
          toast.success(`Friend request rejected`);
        }
      },
    );
  };

  return { addFriend, acceptFriendRequest, rejectFriendRequest };
}
