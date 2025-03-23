import { ComponentProps } from "react";
import ButtonIcon from "./ButtonIcon";
import { IoSendSharp } from "react-icons/io5";

type SendButtonProps = ComponentProps<"button"> & {
  iconClass?: string | undefined;
};

const SendButton = ({ iconClass, ...props }: SendButtonProps) => {
  return (
    <ButtonIcon
      {...props}
      tooltip="Send"
      icon={<IoSendSharp type="submit" size={25} />}
    />
  );
};

export default SendButton;
