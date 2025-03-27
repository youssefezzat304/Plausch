import { signOut } from "next-auth/react";
import { useUserStore } from "@/stores/user.store";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/api/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSocketStore } from "@/stores/socket.store";

const useLogOut = () => {
  const { setUser } = useUserStore();
  const router = useRouter();
  const socket = useSocketStore((state) => state.socket);
  const setSocket = useSocketStore((state) => state.setSocket);

  const { mutate: logOut } = useMutation({
    mutationFn: async () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }

      await signOut({ redirect: false });

      const response = await auth.get("/logout");
      return response.data;
    },
    onSuccess: () => {
      setUser(null);
      localStorage.removeItem("me");

      router.push("/login");
      toast.success("Logged out successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to log out");
    },
  });

  const handleLogOut = () => {
    logOut();
  };

  return { handleLogOut };
};

export default useLogOut;
