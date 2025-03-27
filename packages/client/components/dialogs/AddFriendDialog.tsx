import { IoPersonAdd } from "react-icons/io5";
import { Button } from "../ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/shadcn/dialog";
import ButtonIcon from "../buttons/ButtonIcon";
import { useForm } from "react-hook-form";
import Input from "../forms/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/api";
import { useUserStore } from "@/stores/user.store";
import { toast } from "sonner";
import { IUser } from "@shared/types/user.types";

const AddFriendDialog = () => {
  const currentUser = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      object({
        email: string().email({ message: "Invalid email address format." }),
      }),
    ),
    mode: "onTouched",
  });

  const addFriendMutation = useMutation({
    mutationFn: async (email: string) => {
      try {
        const response = await api.post<IUser>(
          `/${currentUser?._id}/add/${email}`,
        );
        setUser(response.data);
        return response.data;
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message || "Failed to add friend",
        );
      }
    },
    onSuccess: () => {
      toast.success("Friend request sent successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "An unknown error occurred");
    },
  });

  const onSubmit = (data: { email: string }) => {
    addFriendMutation.mutate(data.email);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonIcon
          side="right"
          tooltip="Add friend"
          icon={<IoPersonAdd className="text-2xl" />}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>ADD FRIEND</DialogTitle>
            <DialogDescription>
              You can add a friend by entering their email address.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              name="email"
              error={errors.email?.message}
              className="p-3 border-2 rounded-xl"
              placeholder="Enter email address"
              register={register}
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="cursor-pointer active:scale-95">
              Add Friend
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDialog;
