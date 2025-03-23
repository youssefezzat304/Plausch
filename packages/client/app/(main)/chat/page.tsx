"use client";
import ChatList from "@/components/chat/ChatList";
import FriendRequestsPanel from "@/components/containers/FriendRequestsPanel";
import EmptyChats from "@/components/SVG/emptyChats";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import useTabsStore from "@/stores/tabs.store";

function ChatPage() {
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
      <Panel className="rounded-[22px] bg-(--white)">
        <EmptyChats />
      </Panel>
      {isFriendRequestsOpen && (
        <>
          <PanelResizeHandle />

          <Panel
            defaultSize={25}
            maxSize={40}
            minSize={15}
            className="rounded-[22px] bg-(--white)"
          >
            <FriendRequestsPanel />
          </Panel>
        </>
      )}
    </PanelGroup>
  );
}

export default ChatPage;
