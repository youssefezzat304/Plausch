"use client";

import ButtonIcon from "../buttons/ButtonIcon";
import { LucidePaperclip } from "lucide-react";
import { LiaLaughBeamSolid } from "react-icons/lia";
import { IoMic, IoSendSharp } from "react-icons/io5";
import ToolTip from "../ui/ToolTip";
import { useChatForm } from "@/hooks/useChatForm";
import { useSendMessage } from "@/hooks/useSendMessage";
import useChatStore from "@/stores/chat.store";
import { useEffect } from "react";

const MessageInput = () => {
  const currentChat = useChatStore((state) => state.currentChat);

  const { sendMessage } = useSendMessage();
  const { handleSendMessage, register, watch, isSubmitting, reset } =
    useChatForm({
      onSubmit: async (values) => {
        await sendMessage(values.content);
      },
    });

  const content = watch("content");
  const sendIconClasses = content?.trim()
    ? "text-(--primary-hard)"
    : "text-(--text-gray)";

  useEffect(() => {
    reset();
  }, [currentChat]);

  return (
    <form
      onSubmit={handleSendMessage}
      className="relative w-full justify-center items-center"
    >
      <input
        type="text"
        placeholder="Type a message..."
        className="bg-purple-100 w-full py-3 px-24 rounded-lg border-none"
        {...register("content")}
        autoComplete="off"
      />

      <div className="absolute flex top-1">
        <ButtonIcon tooltip="Attachment" icon={<LucidePaperclip />} />
        <ButtonIcon
          tooltip="Emoji picker"
          icon={<LiaLaughBeamSolid size={25} />}
        />
      </div>

      <div className="absolute flex top-1 right-1">
        <ButtonIcon tooltip="Voice note" icon={<IoMic size={25} />} />
        <ToolTip tooltip="Send" side="top" theme="dark">
          <button
            className="flex flex-col items-center gap-2 p-2 text-(--text-gray) hover:text-(--primary-hard) transition-colors cursor-pointer"
            type="submit"
            disabled={isSubmitting}
            aria-label="Send"
          >
            <IoSendSharp size={25} className={sendIconClasses} />
          </button>
        </ToolTip>
      </div>
    </form>
  );
};

export default MessageInput;
