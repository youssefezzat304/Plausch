// import TextInput from "./TextInput";
// import InputActions from "./InputActions";
// import SendButton from "./SendButton";
// import { useChatActions } from "@/hooks/useChatActions";

import { useState } from "react";
import SendButton from "../buttons/SendButton";
import ButtonIcon from "../buttons/ButtonIcon";
import { LucidePaperclip } from "lucide-react";
import { LiaLaughBeamSolid } from "react-icons/lia";
import { IoMic } from "react-icons/io5";

const MessageInput = () => {
  // const { sendMessage } = useChatActions();
  const [message, setMessage] = useState("");
  // const { startRecording, stopRecording, isRecording } = useVoiceRecorder();

  return (
    <div className="relative w-full justify-center items-center">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="bg-purple-100 w-full py-3 pl-24 rounded-lg border-none"
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
        <SendButton />
      </div>
    </div>
  );
};

export default MessageInput;
