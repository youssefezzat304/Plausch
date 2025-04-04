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
import createGroupAvatar from "@/public/assets/create-group-placeholder.svg";
import { Textarea } from "../ui/shadcn/textarea";
import { Input } from "../ui/shadcn/input";
import { CiSearch } from "react-icons/ci";
import { ScrollArea } from "../ui/shadcn/scroll-area";

const CreateGroupDialog = () => {
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

            <section className="flex flex-grow h-96 bg-amber-300">
              <div className="flex-grow rounded-lg px-2 pt-2">
                <Input
                  title="Search"
                  className="px-7 rounded-xl"
                  placeholder="Search"
                />

                <ScrollArea className="flex flex-col gap-1 w-full h-full bg-amber-500"></ScrollArea>
              </div>
              <div className="p-2 w-[20%]">
                <div className="w-full bg-amber-200 h-full rounded-lg"></div>
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
