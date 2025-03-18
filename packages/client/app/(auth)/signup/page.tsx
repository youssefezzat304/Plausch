"use client";
import FormWrapper from "@/components/forms/FormWrapper";
import Input from "@/components/forms/Input";
import SignUpIcon from "@/components/SVG/SignUpIcon";
import { useSignUpForm } from "@/hooks/useSignupForm";
import { useRouter } from "next/navigation";

function signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    clearAllErrors,
  } = useSignUpForm();

  return (
    <>
      <div className="pt-9 w-1/2 rounded-xl m-9">
        <SignUpIcon />
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
        <FormWrapper
          className="w-[28rem] h-[36rem] flex flex-col justify-center pr-9 gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-semibold">
            Hello,<br></br> Nice to meet you
          </h1>
          <Input
            name="Display name"
            type="text"
            placeholder="Display name."
            register={register}
            className="authInput"
          />
          <Input
            register={register}
            type="email"
            name="email"
            placeholder="Enter your E-mail."
            className="authInput"
          />
          <Input
            register={register}
            type="password"
            name="Password"
            placeholder="Enter your Password."
            className="authInput"
          />
          <Input
            register={register}
            type="password"
            name="confirmPassword"
            placeholder="Confrim your password"
            className="authInput"
          />
          <input
            className="w-full h-12 rounded-[26px] border-none pl-4 pr-2.5 cursor-pointer font-semibold text-lg bg-gray-300"
            title="Confirm sign-up"
            type="submit"
            name="signUp"
            value="SignUp"
          />
          <input
            className="w-full h-12 rounded-[26px] border-none pl-4 pr-2.5 cursor-pointer font-semibold text-lg bg-gray-300"
            title="Go to login page"
            type="button"
            name="login"
            value="Login"
            onClick={() => router.push("/login")}
          />
        </FormWrapper>
      </div>
    </>
  );
}

export default signup;
