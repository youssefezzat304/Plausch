import { BsSearch, BsTelephone, BsThreeDotsVertical } from "react-icons/bs";
import ButtonIcon from "../buttons/ButtonIcon";
import { Dropdown } from "../ui/DropDown";
import useTabsStore from "@/stores/tabs.store";

const ChatHeaderIcons = () => {
  const setTab = useTabsStore((state) => state.setTab);
  const chatOptions = [
    { label: "Contact info", action: () => setTab("chatInfo", true) },
  ];
  return (
    <div className="text-gray-500 text-xl flex pr-2.5">
      <ButtonIcon tooltip="Search" icon={<BsSearch />} />

      <ButtonIcon tooltip="Voice call" icon={<BsTelephone />} />

      <Dropdown
        label="Chat settings"
        icon={<BsThreeDotsVertical />}
        options={chatOptions}
        className="cursor-pointer hover:bg-transparent hover:text-(--primary-hard)"
      />
    </div>
  );
};

export default ChatHeaderIcons;
