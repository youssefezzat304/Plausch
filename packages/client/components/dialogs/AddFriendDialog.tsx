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
import FormWrapper from "../forms/FormWrapper";

const AddFriendDialog = () => {
  const currentUser = useUserStore((state) => state.user);

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
      const response = await api.post(`/${currentUser?._id}/add/${email}`, {
        email,
      });
    },
    onSuccess: () => {
      toast.success("Friend added successfully");
    },
    onError: () => {
      toast.error("Failed to add friend");
    },
  });

  const onSubmit = handleSubmit((data) => {
    addFriendMutation.mutate(data.email);
  });

  return (
    <FormWrapper onSubmit={onSubmit}>
      <Dialog>
        <DialogTrigger asChild>
          <ButtonIcon
            side="right"
            tooltip="Add friend"
            icon={<IoPersonAdd className="text-2xl" />}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>ADD FRIEND</DialogTitle>
            <DialogDescription>
              You can add a friend by entering their email address.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              error={errors.email?.message}
              className="p-3 border-2 rounded-xl"
              {...register("email")}
              placeholder="Enter email address"
              register={register}
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="cursor-pointer active:scale-95">
              Add Friend
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormWrapper>
  );
};

export default AddFriendDialog;
