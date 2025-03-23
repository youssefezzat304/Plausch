import { ComponentProps, JSX } from "react";

type ProfileButtonType = ComponentProps<"button"> & {
  icon: JSX.Element;
  label: string;
  theme?: "neutral" | "positive" | "negative";
};

const ProfileButton = ({
  icon,
  label,
  theme = "neutral",
  ...props
}: ProfileButtonType) => {
  const themeStyles = {
    neutral: "bg-(--primary-hard) hover:bg-(--primary-dark) text-white",
    positive:
      "bg-(--done-md) hover:bg-(--done-soft) text-white disabled:hover:bg-(--done-md)",
    negative: "bg-(--remove-Btn) hover:bg-(--error-strong) text-white",
  };

  const baseStyle =
    "flex cursor-pointer gap-3 w-64 items-center justify-center rounded-full px-4 py-2 text-lg font-bold shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      type={props.type}
      className={`${baseStyle} ${themeStyles[theme]} ${props.className}`}
      {...props}
    >
      {icon}
      {label}
    </button>
  );
};

export default ProfileButton;
