"use client";
import { MdDelete, MdOutlineDataSaverOn } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import FormWrapper from "@/components/forms/FormWrapper";
import ProfileButton from "@/components/buttons/ProfileButton";
import Input from "@/components/forms/Input";
import { useProfileForm } from "@/hooks/useProfileForm";
import { useUserStore } from "@/stores/user.store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Button } from "@/components/ui/shadcn/button";
import { Calendar } from "@/components/ui/shadcn/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

const Profile = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
    watch,
    setValue,
    isDirty,
    reset,
  } = useProfileForm();

  const currentUser = useUserStore((state) => state.user);

  const birthDate = watch("birthDate");

  return (
    <form
      className="flex w-full h-full ml-[82px] gap-[4px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex h-full w-1/4 flex-col items-center gap-4 rounded-[22px] bg-white shadow-lg">
        <Avatar className="cursor-pointer mt-8 h-56 w-56 rounded-lg bg-gray-200 hover:opacity-90">
          <AvatarImage
            src={currentUser?.profilePicture}
            alt={currentUser?.displayName}
            className="rounded-lg"
            aria-label={currentUser?.displayName}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex items-center gap-2">
          <input
            {...register("displayName")}
            className="cursor-pointer bg-transparent text-center text-xl font-bold focus:outline-none"
            placeholder="Display name"
          />
        </div>

        <ProfileButton
          label="Upload Photo"
          type="button"
          icon={<LuUpload className="h-5 w-5" />}
        />
        <ProfileButton
          label="Reset"
          onClick={() => reset()}
          type="button"
          icon={<FaUndo className="h-5 w-5" />}
        />
        <ProfileButton
          label="Remove Photo"
          type="button"
          theme="negative"
          icon={<MdDelete className="h-5 w-5" />}
        />
        <ProfileButton
          label={isSubmitting ? "Saving..." : "Save Changes"}
          theme="positive"
          type="submit"
          icon={<MdOutlineDataSaverOn className="h-5 w-5" />}
          disabled={!isDirty || isSubmitting}
        />
      </div>

      <div className="flex h-full w-3/4 flex-col gap-6 rounded-[22px] bg-white p-6 shadow-lg">
        {/* Personal Information Section */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="Email Address"
                name="email"
                placeholder="Email Address"
                className="w-full rounded-lg border p-2"
                error={errors.email?.message}
                register={register}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="birthDate" className="text-sm text-gray-500">
                Birth Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !birthDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthDate ? (
                      dayjs(birthDate).format("DD/MM/YYYY")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={birthDate ? new Date(birthDate) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        setValue("birthDate", date.toISOString());
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Input
                label="Phone Number"
                name="phoneNumber"
                placeholder="Phone Number"
                className="w-full rounded-lg border p-2"
                error={errors.phoneNumber?.message}
                register={register}
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold">Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="Country"
                name="address.country"
                placeholder="Country"
                className="w-full rounded-lg border p-2"
                error={errors.address?.country?.message}
                register={register}
              />
            </div>

            <div>
              <Input
                label="City/State"
                name="address.city"
                placeholder="City/State"
                className="w-full rounded-lg border p-2"
                error={errors.address?.city?.message}
                register={register}
              />
            </div>

            <div>
              <Input
                label="Postal Code"
                name="address.postalCode"
                placeholder="Postal Code"
                className="w-full rounded-lg border p-2"
                error={errors.address?.postalCode?.message}
                register={register}
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold">Bio</h2>
          <Input
            name="bio"
            placeholder="Bio"
            className="w-full rounded-lg border p-2"
            error={errors.bio?.message}
            register={register}
          />
        </div>
      </div>
    </form>
  );
};

export default Profile;
