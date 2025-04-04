"use client";
import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { RiContactsBook3Fill, RiLogoutCircleLine } from "react-icons/ri";
import { PiChatsFill } from "react-icons/pi";
import { FaUserFriends } from "react-icons/fa";
import Link from "next/link";
import useTabsStore from "@/stores/tabs.store";
import ButtonIcon from "../buttons/ButtonIcon";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import AddFriendDialog from "../dialogs/AddFriendDialog";
import useLogOut from "@/hooks/useLogOut";
import { toast, Toaster } from "sonner";

const NavBar = () => {
  const setTab = useTabsStore((state) => state.setTab);
  const { handleLogOut } = useLogOut();

  return (
    <div className="fixed left-4 h-screen w-14 flex flex-col justify-center items-center bg-[var(--primary-dark)]">
      <Link href={"/profile"} className="cursor-pointer absolute top-5">
        <Avatar className="h-14 w-14 hover:opacity-90">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="Profile Picture"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex flex-col gap-8 mt-24">
        <ButtonIcon
          side="right"
          tooltip="Notifications"
          icon={<IoNotifications className="text-2xl" />}
        />
        <ButtonIcon
          side="right"
          tooltip="Chats"
          to="/chat"
          icon={<PiChatsFill className="text-2xl" />}
          onClick={() => {
            setTab("chats");
            setTab("contacts", false);
          }}
        />
        <ButtonIcon
          side="right"
          tooltip="Contacts"
          to="/chat"
          icon={<RiContactsBook3Fill className="text-2xl" />}
          onClick={() => {
            setTab("contacts");
            setTab("chats", false);
          }}
        />
        <AddFriendDialog />
        <ButtonIcon
          side="right"
          tooltip="Friend requests"
          icon={<FaUserFriends className="text-2xl" />}
          onClick={() => setTab("friendRequests")}
        />
        <button
          title="click"
          className="bg-primary-soft text-primary-hard px-4 py-2 rounded-lg cursor-pointer text-white"
          onClick={() =>
            toast("Event has been created", {
              description: "Monday, January 3rd at 6:00pm",
              position: "bottom-center",
            })
          }
        >
          t
        </button>
      </div>

      <div className="absolute bottom-4 flex flex-col gap-4">
        <ButtonIcon
          side="right"
          tooltip="Settings"
          icon={<IoSettingsSharp className="text-2xl" />}
        />
        <ButtonIcon
          side="right"
          tooltip="Log out"
          icon={<RiLogoutCircleLine className="text-2xl text-red-500" />}
          onClick={handleLogOut}
          className="flex flex-col items-center gap-2 p-2 hover:text-red-500 transition-colors"
        />
      </div>
    </div>
  );
};

export default NavBar;
