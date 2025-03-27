import { IoClose, IoLink } from "react-icons/io5";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { LuFiles, LuMusic4 } from "react-icons/lu";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { GrMicrophone } from "react-icons/gr";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/shadcn/accordion";
import useTabsStore from "@/stores/tabs.store";
import ButtonIcon from "../buttons/ButtonIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import useChatStore from "@/stores/chat.store";

const ChatInfoPanel = () => {
  const setTab = useTabsStore((state) => state.setTab);
  const currentChatUser = useChatStore((state) => state.currentChatUser);

  return (
    <div className="w-full h-full bg-white rounded-2xl p-4">
      <div className="flex justify-between items-center border-b pb-2">
        <span className="text-lg font-semibold">Contact Info</span>
        <ButtonIcon
          tooltip="Close"
          icon={<IoClose size={20} />}
          onClick={() => setTab("chatInfo", false)}
          className="cursor-pointer p-2 rounded-full hover:bg-gray-200"
        />
      </div>

      <div className="flex flex-col items-center py-4">
        <Avatar className="cursor-pointer hover:opacity-90">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="Profile Picture"
            className="rounded-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-lg font-medium mt-2">
          {currentChatUser?.displayName}
        </span>
      </div>

      <Accordion type="single" collapsible className="space-y-0 divide-y-0">
        {[
          { label: "Photos (322)", icon: <TbPhotoSquareRounded size={20} /> },
          { label: "Files (15)", icon: <LuFiles size={20} /> },
          { label: "Audio Files (4)", icon: <LuMusic4 size={20} /> },
          { label: "Videos (46)", icon: <HiOutlineVideoCamera size={20} /> },
          { label: "Shared Links (16)", icon: <IoLink size={20} /> },
          { label: "Voice Messages (52)", icon: <GrMicrophone size={20} /> },
        ].map((item, index) => (
          <AccordionItem
            key={index}
            value={`panel-${index}`}
            className="border-none"
          >
            <AccordionTrigger className="cursor-pointer flex justify-between items-center gap-2 hover:no-underline">
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-left">{item.label}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="transition-transform duration-300 ease-in-out">
              <p>Content for {item.label} goes here.</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ChatInfoPanel;
