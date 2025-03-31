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
import { useAddFriend } from "@/hooks/useFriendRequestsManager";

const addFriendSchema = object({
  email: string().email({ message: "Invalid email address format." }),
});

const AddFriendDialog = () => {
  const { addFriend } = useAddFriend();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addFriendSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: { email: string }) => {
    addFriend(data.email);
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
              autoComplete="off"
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
