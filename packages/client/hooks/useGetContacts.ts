import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";
import { useUserStore } from "@/stores/user.store";
import { QueryKeys } from "@/lib/constants";
import { IUser } from "@shared/types/user.types";

const useGetContacts = (enabled: boolean) => {
  const currentUser = useUserStore((state) => state.user);
  const { setContacts, contacts } = useUserStore();

  const query = useQuery<IUser[]>({
    queryKey: [QueryKeys.CONTACTS, { userId: currentUser?._id }],
    queryFn: async ({ signal }) => {
      if (!currentUser?._id) throw new Error("Unauthenticated");

      const response = await api.get(`/${currentUser._id}/contacts`, {
        signal,
      });
      setContacts(response.data);
      return response.data;
    },
    enabled: !!currentUser?._id && enabled,
    staleTime: 1000 * 60 * 5,
    placeholderData: contacts ?? undefined,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export default useGetContacts;
