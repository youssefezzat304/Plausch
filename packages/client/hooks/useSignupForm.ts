import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupInputType, signupSchema } from "@shared/schemas/auth.schema";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/api/auth";
import { ClientError } from "@/utils/errors";

export const useSignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<signupInputType>({
    resolver: zodResolver(signupSchema),
  });

  const signUpMutation = useMutation({
    mutationFn: (userData: signupInputType) =>
      auth.post("/signup", userData, { withCredentials: true }),
    onSuccess: () => {
      router.replace("/dashboard");
    },
    onError: (error: ClientError) => {
      if (error.title === "Email Already Used") {
        setError("email", {
          message: error.message,
        });
      } else {
        setError("root", {
          message: error.message,
        });
      }
    },
  });

  const clearAllErrors = () => {
    clearErrors();
  };

  const onSubmit: SubmitHandler<signupInputType> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        message: "The passwords do not match.",
      });
      return;
    }

    signUpMutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting: isSubmitting || signUpMutation.isPending, // Combine loading states
    onSubmit,
    clearAllErrors,
  };
};
