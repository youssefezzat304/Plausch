"use client";
import ChatHeaderIcons from "../chat/ChatHeaderIcons";
import MessageInput from "./MessageInput";
import ChatWindow from "../chat/ChatWindow";
import { ScrollArea } from "../ui/shadcn/scroll-area";

const MainConsole = () => {
  return (
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
  );
};

export default MainConsole;
