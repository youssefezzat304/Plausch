import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserInputType, userSchema } from "@shared/schemas/user.schema";
import { useMutation } from "@tanstack/react-query";
import { users } from "@/api/users";
import { IUser } from "@shared/types";
import { useUserStore } from "@/stores/user.store";
import { AxiosError } from "axios";
import { ClientError } from "@/utils/errors";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";

export const useProfileForm = () => {
  const setUser = useUserStore((state) => state.setUser);
  const currentUser = useUserStore((state) => state.user);
  const userId = currentUser?._id;

  const initialValues = useMemo(
    () => ({
      displayName: currentUser?.displayName || "",
      email: currentUser?.email || "",
      phoneNumber: currentUser?.phoneNumber || "",
      birthDate: currentUser?.birthDate || "",
      bio: currentUser?.bio || "Hey there I am using chat app...",
      address: {
        country: currentUser?.address?.country || "",
        city: currentUser?.address?.city || "",
        postalCode: currentUser?.address?.postalCode || "",
      },
    }),
    [currentUser],
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
    watch,
    setValue,
    reset,
  } = useForm<UserInputType>({
    resolver: zodResolver(userSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData: UserInputType) => {
      const response = await users.patch<{ user: IUser }>(
        `/${userId}`,
        updatedData,
      );
      return response;
    },
    onSuccess: (response) => {
      if (response.data.user) {
        console.log("response.data.user >>>>>", response.data.user);
        setUser(response.data.user);
        toast.success("Profile has been updated.");
      }
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

      updateProfileMutation.mutate(data);
    } catch (error) {
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
