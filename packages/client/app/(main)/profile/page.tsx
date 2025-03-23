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

const Profile = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
    watch,
    isDirty,
  } = useProfileForm();
  const currentUser = useUserStore((state) => state.user);
  const displayName = watch("displayName");

  return (
    <FormWrapper
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
          icon={<LuUpload className="h-5 w-5" />}
        />
        <ProfileButton label="Reset" icon={<FaUndo className="h-5 w-5" />} />
        <ProfileButton
          label="Remove Photo"
          theme="negative"
          icon={<MdDelete className="h-5 w-5" />}
        />
        <ProfileButton
          label="Save Changes"
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

            <div>
              <Input
                label="Birth Date"
                name="birthDate"
                placeholder="Birth Date"
                className="w-full rounded-lg border p-2"
                error={errors.birthDate?.message}
                register={register}
              />
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
    </FormWrapper>
  );
};

export default Profile;
