import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/shadcn/dialog";
import ButtonIcon from "../buttons/ButtonIcon";
import { Button } from "../ui/shadcn/button";
import { FaCirclePlus } from "react-icons/fa6";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/shadcn/avatar";
import { Textarea } from "../ui/shadcn/textarea";
import { Input } from "../ui/shadcn/input";
import { ScrollArea } from "../ui/shadcn/scroll-area";
import useGetContacts from "@/hooks/useGetContacts";
import AddToGroupListItem from "./AddToGroupListItem";

const CreateGroupDialog = () => {
  const { data: contacts } = useGetContacts(true);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonIcon
          side="right"
          tooltip="Create group"
          icon={<FaCirclePlus className="text-2xl" />}
        />
      </DialogTrigger>
      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>Create a new group</DialogTitle>
            <section className="flex gap-4 mt-4 px-2">
              <Avatar
                aria-label="Group picture"
                className="w-52 h-52 rounded-2xl"
              >
                <AvatarImage
                  className="rounded-sm"
                  src="https://github.com/shadcn.png"
                  alt="Group picture"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col py-2 w-full justify-start gap-2">
                <Input type="text" placeholder="Group name" className="py-2" />
                <Textarea
                  placeholder="Group description..."
                  className="resize-none h-full"
                />
              </div>
            </section>

            <section className="flex flex-grow h-96">
              <div className="flex-grow rounded-lg px-2 pt-2">
                <Input
                  title="Search"
                  className="px-7 rounded-xl"
                  placeholder="Search"
                />

                <ScrollArea className="flex flex-col gap-1 w-full h-full py-2">
                  {contacts?.map((user) => (
                    <AddToGroupListItem key={user._id} user={user} />
                  ))}
                </ScrollArea>
              </div>
              <div className="p-2 w-[20%]">
                <div className="w-full h-full rounded-lg border-2"></div>
              </div>
            </section>
          </DialogHeader>
          <div className="grid gap-4 py-4"></div>
          <DialogFooter>
            <Button type="submit" className="cursor-pointer active:scale-95">
              Create Group
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
