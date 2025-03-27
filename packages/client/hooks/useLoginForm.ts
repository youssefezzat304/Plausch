import { useUserStore } from "@/stores/user.store";
import { ClientError } from "@/utils/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginInputType, loginSchema } from "@shared/schemas/auth.schema";
import { IUser } from "@shared/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getSession, signIn } from "next-auth/react";
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
  const currentUser = useUserStore((state) => state.user);

  const loginMutation = useMutation({
    mutationFn: async (loginData: loginInputType) => {
      const result = await signIn("credentials", {
        ...loginData,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: async () => {
      const session = await getSession();
      if (!session || !session.user) {
        throw new Error("Failed to retrieve session data.");
      }

      const user = session.user as IUser;

      setUser(user);
      router.push("/chat");
    },
    onError: (error: AxiosError<ClientError>) => {
      console.log(error);
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
