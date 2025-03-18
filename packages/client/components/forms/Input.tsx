import { UseFormRegister, FieldError } from "react-hook-form";

type InputProps = {
  label?: string;
  name: string;
  placeholder: string;
  className?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "date"
    | "time"
    | "checkbox"
    | "radio"
    | "file"
    | "hidden"
    | "search"
    | "color"
    | "range"
    | "datetime-local"
    | "month"
    | "week";
};

const Input = ({
  label,
  name,
  placeholder,
  className,
  register,
  error,
  type = "text",
}: InputProps) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={className}
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </>
  );
};

export default Input;
