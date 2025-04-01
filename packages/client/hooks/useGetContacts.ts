import { useQuery } from "@tanstack/react-query";
import { api, getPrivateChats } from "@/api/api";
import { useUserStore } from "@/stores/user.store";
import { QueryKeys } from "@/lib/constants";
import { IUser } from "@shared/types";
import { useEffect } from "react";

const useGetContacts = (enabled: boolean) => {
  const currentUser = useUserStore((state) => state.user);
  const { setContacts, setChats } = useUserStore();

  const { data: chats, isLoading: chatsLoading } = useQuery({
    queryKey: [QueryKeys.CHATS, currentUser?._id],
    queryFn: () => getPrivateChats(currentUser?._id!),
    enabled: !!currentUser,
  });

  useEffect(() => {
    if (chats) {
      setChats(chats);
    }
  }, [chats]);

  const query = useQuery<IUser[]>({
    queryKey: [QueryKeys.CONTACTS, { userId: currentUser?._id }],
    queryFn: async ({ signal }) => {
      if (!currentUser?._id) throw new Error("Unauthenticated");

      const response = await api.get(`/${currentUser._id}/contacts`, {
        signal,
      });
      setContacts(response.data);
      console.log("contacts", response.data);
      return response.data;
    },
    enabled: !!currentUser?._id && enabled,
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    chats,
    chatsLoading,
  };
};

export default useGetContacts;
