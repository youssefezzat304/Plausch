import { IoCheckmark, IoClose } from "react-icons/io5";
import ButtonIcon from "../buttons/ButtonIcon";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/shadcn/avatar";

const FriendRequestListItem = () => {
  return (
    <div className="flex justify-between items-center cursor-pointer whitespace-nowrap overflow-x-hidden text-ellipsis w-full max-w-full p-2.5 rounded-lg transition-all duration-100 hover:bg-secondary-soft active:bg-(--primary-hard) active:scale-98">
      <section className="flex items-center gap-2">
        <Avatar className="h-14 w-14 hover:opacity-90 rounded-2xl">
          <AvatarImage src="https://github.com/shadcn.png" alt="No image" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <label className="text-sm">Name Surname</label>
        </div>
      </section>

      <section className="m-2">
        <ButtonIcon title="Accept" icon={<IoCheckmark />} value="accepted" />
        <ButtonIcon title="Reject" icon={<IoClose />} value="rejected" />
      </section>
    </div>
  );
};

export default FriendRequestListItem;
