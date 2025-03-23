import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";
import { useUserStore } from "@/stores/user.store";
import { User } from "@/types";

const useGetContacts = () => {
  const currentUser = useUserStore((state) => state.user);
  const { setContacts } = useUserStore();

  const query = useQuery<User[]>({
    queryKey: ["contacts", currentUser?._id],
    queryFn: async () => {
      if (!currentUser || !currentUser._id) {
        throw new Error("User not authenticated");
      }
      const response = await api.get(`/${currentUser._id}/contacts`);
      setContacts(response.data || []);
      return response.data;
    },
    enabled: !!currentUser?._id,
    staleTime: 1000 * 60 * 5,
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
