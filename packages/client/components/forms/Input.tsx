import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  placeholder: string;
  className?: string;
  register: UseFormRegister<any>;
  error?: string | undefined;
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
  ...props
}: InputProps) => {
  return (
    <>
      <div className="flex flex-col">
        {label && (
          <label htmlFor={name} className="text-sm text-gray-500">
            {label}
          </label>
        )}
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={className}
          {...props}
        />
        <p className="text-sm h-1 text-red-500 my-0.5">{error || " "}</p>
      </div>
    </>
  );
};

export default Input;
