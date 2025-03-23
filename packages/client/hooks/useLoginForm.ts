import { auth } from "@/api/auth";
import { useUserStore } from "@/stores/user.store";
import { User } from "@/types";
import { ClientError } from "@/utils/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginInputType, loginSchema } from "@shared/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export const useLoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields, isSubmitted },
    clearErrors,
    setFocus,
  } = useForm<loginInputType>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const setUser = useUserStore((state) => state.setUser);

  const loginMutation = useMutation({
    mutationFn: async (loginData: loginInputType) => {
      const response = await auth.post<User>("/login", loginData);
      localStorage.setItem("me", JSON.stringify(response.data));
      setUser(response.data);
      return response;
    },
    onSuccess: () => {
      router.replace("/chat");
    },
    onError: (error: AxiosError<ClientError>) => {
      toast.error(
        error.response?.data.message || "Login failed. Please try again.",
      );
      const firstErrorField = Object.keys(errors)[0] as keyof loginInputType;
      if (firstErrorField) {
        setFocus(firstErrorField);
      }
    },
  });

  const clearAllErrors = () => {
    clearErrors();
  };

  const onSubmit: SubmitHandler<loginInputType> = async (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    loginMutation.mutate(data);
  };

  const shouldShowError = (field: keyof loginInputType) => {
    return touchedFields[field] || isSubmitted;
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting: isSubmitting || loginMutation.isPending,
    onSubmit,
    clearAllErrors,
    touchedFields,
    shouldShowError,
  };
};
