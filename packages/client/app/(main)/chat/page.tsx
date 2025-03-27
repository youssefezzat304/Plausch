"use client";
import ChatList from "@/components/chat/ChatList";
import FriendRequestsPanel from "@/components/containers/FriendRequestsPanel";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import useTabsStore from "@/stores/tabs.store";
import useChatStore from "@/stores/chat.store";
import ChatHeaderIcons from "@/components/chat/ChatHeaderIcons";
import ChatWindow from "@/components/chat/ChatWindow";
import MessageInput from "@/components/containers/MessageInput";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import ChatInfoPanel from "@/components/chat/ChatInfoPanel";
import { FaCircle } from "react-icons/fa";

function ChatPage() {
  const isFriendRequestsOpen = useTabsStore(
    (state) => state.isFriendRequestsOpen,
  );

  const isChatInfoOpen = useTabsStore((state) => state.isChatInfoOpen);

  const currentChatUser = useChatStore((state) => state.currentChatUser);

  const onlineStatus = currentChatUser?.onlineStatus;

  return (
    <PanelGroup
      direction="horizontal"
      autoSaveId="chat"
      storage={localStorage}
      className="w-full ml-[82px] rounded-[22px] rounded-tl-none gap-[3px]"
    >
      <Panel
        className="flex bg-(--white) justify-center relative w-full h-full rounded-[22px]"
        minSize={25}
        maxSize={50}
      >
        <ChatList />
      </Panel>
      <PanelResizeHandle />
      <Panel className="flex justify-center items-center rounded-[22px] bg-(--white)">
        {currentChatUser ? (
          <div className="w-full h-full flex flex-col">
            <header className="h-22 px-4 py-2 flex justify-between items-center header-mask">
              <div className="flex flex-col items-center">
                <label htmlFor="name" className="text-2xl font-semibold">
                  {currentChatUser?.displayName}
                </label>
                <p className="text-gray-500 flex items-center gap-1">
                  {onlineStatus ? (
                    <FaCircle size={12} className="text-green-500" />
                  ) : (
                    <FaCircle size={10} className="text-gray-500" />
                  )}
                  {onlineStatus ? "Online" : "Offline"}
                </p>
              </div>
              <ChatHeaderIcons />
            </header>
            <ScrollArea className="flex flex-col justify-end h-full overflow-hidden">
              <ChatWindow />
            </ScrollArea>
            <section className="flex items-center p-3">
              <MessageInput />
            </section>
          </div>
        ) : (
          <p>Start a conversation</p>
        )}
      </Panel>
      {(isChatInfoOpen || isFriendRequestsOpen) && (
        <>
          <PanelResizeHandle />
          <Panel defaultSize={25} maxSize={40} minSize={15}>
            {isChatInfoOpen ? <ChatInfoPanel /> : <FriendRequestsPanel />}
          </Panel>
        </>
      )}
    </PanelGroup>
  );
}

export default ChatPage;
