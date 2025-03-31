import { IoCheckmark, IoClose } from "react-icons/io5";
import ButtonIcon from "../buttons/ButtonIcon";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/shadcn/avatar";
import { FriendRequest } from "@/types";
import dayjs from "dayjs";
import { api } from "@/api/api";
import { useUserStore } from "@/stores/user.store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAddFriend } from "@/hooks/useFriendRequestsManager";

const FriendRequestListItem = ({
  friendRequest,
}: {
  friendRequest: FriendRequest;
}) => {
  const { displayName, profilePicture, _id: friendId } = friendRequest.sender;
  const createdAt = friendRequest.createdAt;

  const { acceptFriendRequest, rejectFriendRequest } = useAddFriend();

  const handleAcceptFriendRequest = async () => {
    acceptFriendRequest(friendId);
  };

  const handleRejectFriendRequest = async () => {
    rejectFriendRequest(friendId);
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
