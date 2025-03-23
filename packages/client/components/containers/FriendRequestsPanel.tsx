import { IoClose } from "react-icons/io5";
import ButtonIcon from "../buttons/ButtonIcon";
import useTabsStore from "@/stores/tabs.store";

const FriendRequestsPanel = () => {
  const setTab = useTabsStore((state) => state.setTab);
  return (
    <div className="w-full h-full bg-white rounded-2xl p-4">
      <div className="flex justify-between items-center border-b pb-2">
        <span className="text-lg font-semibold">Friend Requests</span>
        <ButtonIcon
          tooltip="Close"
          icon={<IoClose size={20} />}
          onClick={() => {
            setTab("friendRequests", false);
            setTab("chatInfo", false);
          }}
          className="cursor-pointer p-2 rounded-full hover:bg-gray-200"
        />
      </div>
    </div>
  );
};

export default FriendRequestsPanel;
