"use client";
import { IoClose } from "react-icons/io5";
import ButtonIcon from "../buttons/ButtonIcon";
import useTabsStore from "@/stores/tabs.store";
import { useUserStore } from "@/stores/user.store";
import { api } from "@/api/api";
import { FriendRequest } from "@shared/types";
import FriendRequestListItem from "./FriendRequestListItem";
import { ScrollArea } from "../ui/shadcn/scroll-area";
import { useQuery } from "@tanstack/react-query";

const FriendRequestsPanel = () => {
  const currentUser = useUserStore((state) => state.user);
  const friendRequests = useUserStore((state) => state.friendRequests);
  const setTab = useTabsStore((state) => state.setTab);
  const setFriendRequests = useUserStore((state) => state.setFriendRequests);

  // TODO: set up isLoading and isError.
  const { isLoading, isError } = useQuery({
    queryKey: ["friendRequests", currentUser?._id],
    queryFn: async () => {
      const response = await api.get<FriendRequest[]>(
        `/${currentUser?._id}/friendRequests`,
      );
      setFriendRequests(response.data);
      return response.data;
    },
    enabled: !!currentUser,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="w-full h-full bg-white rounded-2xl p-4">
      <div className="flex justify-between items-center border-b pb-2">
        <span className="text-lg font-semibold">
          Friend Requests {`( ${friendRequests.length} )`}
        </span>
        <ButtonIcon
          tooltip="Close"
          icon={<IoClose size={20} />}
          onClick={() => {
            setTab("friendRequests", false);
            setTab("chatInfo", false);
          }}
          className="cursor-pointer p-2 rounded-full hover:bg-gray-200"
        />
      </div>
      {friendRequests?.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No Friend Requests</p>
      ) : (
        <ScrollArea className="flex flex-col gap-2">
          {friendRequests?.map((friendRequest) => (
            <FriendRequestListItem
              key={friendRequest._id}
              friendRequest={friendRequest}
            />
          ))}
        </ScrollArea>
      )}
    </div>
  );
};

export default FriendRequestsPanel;
