import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupInputType, signupSchema } from "@shared/schemas/auth.schema";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/api/auth";
import { ClientError } from "@/utils/errors";
import { AxiosError } from "axios";
import { User } from "@/types";
import { useUserStore } from "@/stores/user.store";
import { toast } from "sonner";

export const useSignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, touchedFields, isSubmitting, isSubmitted },
  } = useForm<signupInputType>({
    resolver: zodResolver(signupSchema),
    criteriaMode: "firstError",
    mode: "onTouched",
  });
  const setUser = useUserStore((state) => state.setUser);

  const signUpMutation = useMutation({
    mutationFn: async (userData: signupInputType) => {
      const response = await auth.post<User>("/register", userData);
      localStorage.setItem("me", JSON.stringify(response.data));
      setUser(response.data);
      return response;
    },
    onSuccess: () => {
      router.replace("/chat");
    },
    onError: (error: AxiosError<ClientError>) => {
      if (error.response?.data.httpCode === 401) {
        setError("email", {
          message: error.message,
        });
        setFocus("email");
      } else {
        const errorMessage =
          error.response?.data.message || "Signup failed. Please try again.";
        toast.error(errorMessage);
        setError("root", {
          message: errorMessage,
        });

        const firstErrorField = Object.keys(errors)[0] as keyof signupInputType;
        if (firstErrorField) {
          setFocus(firstErrorField);
        }
      }
    },
  });

  const onSubmit: SubmitHandler<signupInputType> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        message: "The passwords do not match.",
      });
      setFocus("confirmPassword");
      return;
    }

    signUpMutation.mutate(data);
  };

  const shouldShowError = (field: keyof signupInputType) => {
    return touchedFields[field] || isSubmitted;
  };

  return {
    register,
    handleSubmit,
    touchedFields,
    errors,
    isSubmitting: isSubmitting || signUpMutation.isPending,
    onSubmit,
    shouldShowError,
  };
};
