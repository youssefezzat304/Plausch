import { Avatar, AvatarFallback, AvatarImage } from "../ui/shadcn/avatar";
import { IUser } from "@shared/types";
import { Button } from "../ui/shadcn/button";

const AddToGroupListItem = ({ user }: { user: IUser }) => {
  return (
    <div className="flex justify-between items-center cursor-pointer whitespace-nowrap overflow-x-hidden text-ellipsis h-full w-full max-w-full px-2 py-2 rounded-lg transition-all duration-100 hover:bg-gray-200">
      <section className="flex items-center gap-2">
        <Avatar className="h-10 w-10 hover:opacity-90 rounded-lg">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt={user.displayName}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <label className="text-sm">{user.displayName}</label>
        </div>
      </section>

      <section>
        <Button className="cursor-pointer">+ Add</Button>
      </section>
    </div>
  );
};

export default AddToGroupListItem;
