import React from "react";

type InlineErrorProps = {
  message?: string;
};

const InlineError = ({ message }: InlineErrorProps) => {
  return (
    <p className="text-sm h-2 text-red-500 mt-1 min-h-[1rem]">
      {message || " "}
    </p>
  );
};

export default InlineError;
