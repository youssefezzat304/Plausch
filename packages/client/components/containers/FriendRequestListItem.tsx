import { IoCheckmark, IoClose } from "react-icons/io5";
import ButtonIcon from "../buttons/ButtonIcon";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/shadcn/avatar";
import { FriendRequest } from "@/types";
import dayjs from "dayjs";
import { api } from "@/api/api";
import { useUserStore } from "@/stores/user.store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const FriendRequestListItem = ({
  friendRequest,
}: {
  friendRequest: FriendRequest;
}) => {
  const currentUser = useUserStore((state) => state.user);
  const { displayName, profilePicture, _id: friendId } = friendRequest.sender;
  const createdAt = friendRequest.createdAt;

  const acceptMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        `/${currentUser?._id}/accept/${friendId}`,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success(`${displayName} is now your friend.`);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to accept friend request");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        `/${currentUser?._id}/reject/${friendId}`,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Friend request rejected.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to reject friend request");
    },
  });

  const handleAcceptFriendRequest = async () => {
    acceptMutation.mutate();
  };

  const handleRejectFriendRequest = async () => {
    rejectMutation.mutate();
  };

  return (
    <div className="flex justify-between items-center whitespace-nowrap overflow-x-hidden text-ellipsis w-full max-w-full p-2.5 rounded-lg transition-all duration-100 hover:bg-secondary-soft">
      <section className="flex items-center gap-2">
        <Avatar className="cursor-pointer h-14 w-14 hover:opacity-90 rounded-2xl">
          <AvatarImage src={profilePicture} alt="No image" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <label className="text-sm">{displayName}</label>
          <p className="text-xs text-gray-500">
            {dayjs(createdAt).format("DD/MM/YYYY hh:mm A")}
          </p>
        </div>
      </section>

      <section className="flex gap-1 my-2">
        <ButtonIcon
          tooltip="Accept"
          icon={
            <IoCheckmark
              size={30}
              className="text-green-500 bg-green-200 rounded-full p-1 active:scale-95"
            />
          }
          onClick={handleAcceptFriendRequest}
        />
        <ButtonIcon
          tooltip="Reject"
          icon={
            <IoClose
              size={30}
              className="text-red-500 bg-red-200 rounded-full p-1 active:scale-95"
            />
          }
          onClick={handleRejectFriendRequest}
        />
      </section>
    </div>
  );
};

export default FriendRequestListItem;
