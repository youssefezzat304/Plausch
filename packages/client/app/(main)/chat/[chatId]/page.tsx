"use client";
import ChatHeaderIcons from "@/components/chat/ChatHeaderIcons";
import ChatInfoPanel from "@/components/chat/ChatInfoPanel";
import ChatList from "@/components/chat/ChatList";
import ChatWindow from "@/components/chat/ChatWindow";
import FriendRequestsPanel from "@/components/containers/FriendRequestsPanel";
import MessageInput from "@/components/containers/MessageInput";
import useTabsStore from "@/stores/tabs.store";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function ChatDetailPage({
  params,
}: {
  params: { chatId: string };
}) {
  const isChatInfoOpen = useTabsStore((state) => state.isChatInfoOpen);
  const isFriendRequestsOpen = useTabsStore(
    (state) => state.isFriendRequestsOpen,
  );

  return (
    <PanelGroup
      direction="horizontal"
      autoSave="chat"
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
      <Panel
        className="flex bg-(--white) justify-center w-full h-full rounded-[22px]"
        minSize={30}
      >
        <div className="w-full h-full flex flex-col">
          <header className="h-[14%] p-2 flex justify-between items-center">
            <div className="flex flex-col items-center">
              <label htmlFor="name" className="text-2xl font-semibold">
                Chat User
              </label>
              <p className="text-gray-500">Online</p>
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
