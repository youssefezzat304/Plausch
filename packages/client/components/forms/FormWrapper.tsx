import { ReactNode } from "react";

type FormWrapperProps = {
  children: ReactNode;
  className?: string;
  onSubmit: () => void;
};

const FormWrapper = ({ children, className, onSubmit }: FormWrapperProps) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
};

export default FormWrapper;
