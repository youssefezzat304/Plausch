import { useForm } from "react-hook-form";

export interface ChatFormInputs {
  content: string;
}

interface UseChatFormProps {
  onSubmit: (values: ChatFormInputs) => Promise<void>;
}

export const useChatForm = ({ onSubmit }: UseChatFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<ChatFormInputs>();

  const handleSendMessage = handleSubmit(async (values) => {
    if (!values.content.trim()) return;
    await onSubmit(values);
    reset();
  });

  return { register, handleSendMessage, reset, watch, isSubmitting };
};
