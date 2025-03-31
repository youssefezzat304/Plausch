import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserInputType, userSchema } from "@shared/schemas/user.schema";
import { useMutation } from "@tanstack/react-query";
import { users } from "@/api/users";
import { IUser } from "@shared/types/user.types";
import { useUserStore } from "@/stores/user.store";
import { AxiosError } from "axios";
import { ClientError } from "@/utils/errors";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useProfileForm = () => {
  const router = useRouter();
  const currentUser = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const userId = currentUser?._id;

  const initialValues = {
    displayName: currentUser?.displayName || "",
    email: currentUser?.email || "",
    phoneNumber: currentUser?.phoneNumber || undefined,
    birthDate: currentUser?.birthDate || undefined,
    bio: currentUser?.bio || "Hey there I am using chat app...",
    address: {
      country: currentUser?.address?.country || undefined,
      city: currentUser?.address?.city || undefined,
      postalCode: currentUser?.address?.postalCode || undefined,
    },
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty },
    watch,
    setValue,
    reset,
  } = useForm<UserInputType>({
    resolver: zodResolver(userSchema),
    defaultValues: initialValues,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData: UserInputType) => {
      const response = await users.patch<IUser>(`/${userId}`, updatedData);
      return response;
    },
    onSuccess: (response) => {
      setUser(response.data);
      toast.success("Profile has been updated.");
    },
    onError: (error: AxiosError<ClientError>) => {
      if (error.response?.data.httpCode === 401) {
        setError("email", {
          message: error.message,
        });
      } else {
        toast.error(error.response?.data.message);
      }
    },
  });

  const onSubmit: SubmitHandler<UserInputType> = async (data) => {
    try {
      if (!isDirty) {
        toast.info("No changes detected to save.");
        return;
      }

      const validationResult = userSchema.safeParse(data);

      if (!validationResult.success) {
        validationResult.error.errors.forEach((err) => {
          const fieldName = err.path.join(".") as keyof UserInputType;
          setError(fieldName, {
            type: "manual",
            message: err.message,
          });
        });
        return;
      }

      updateProfileMutation.mutate(validationResult.data);
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("root", {
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting: isSubmitting || updateProfileMutation.isPending,
    onSubmit,
    watch,
    isDirty,
    reset,
    setValue,
  };
};
