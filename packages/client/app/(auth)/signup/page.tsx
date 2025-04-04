"use client";
import FormWrapper from "@/components/forms/FormWrapper";
import Input from "@/components/forms/Input";
import SignUpIcon from "@/components/SVG/SignUpIcon";
import { useSignUpForm } from "@/hooks/useSignupForm";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function signup() {
  const router = useRouter();
  const { register, handleSubmit, errors, onSubmit, shouldShowError } =
    useSignUpForm();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex w-full"
    >
      <div className="pt-9 w-1/2 rounded-xl m-9">
        <SignUpIcon />
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
        <FormWrapper
          onSubmit={handleSubmit(onSubmit)}
          className="w-[28rem] h-[36rem] flex flex-col justify-center pr-9 gap-4"
        >
          <h1 className="font-semibold">
            Hello,
            <br /> Nice to meet you
          </h1>
          <Input
            name="displayName"
            type="text"
            placeholder="Display name."
            register={register}
            error={
              shouldShowError("displayName")
                ? errors.displayName?.message
                : undefined
            }
            className="authInput"
          />
          <Input
            name="email"
            type="text"
            placeholder="Enter your E-mail."
            register={register}
            error={shouldShowError("email") ? errors.email?.message : undefined}
            className="authInput"
          />
          <Input
            name="password"
            type="password"
            placeholder="Enter your Password."
            register={register}
            error={
              shouldShowError("password") ? errors.password?.message : undefined
            }
            className="authInput"
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            register={register}
            error={
              shouldShowError("confirmPassword")
                ? errors.confirmPassword?.message
                : undefined
            }
            className="authInput"
          />
          <input
            className="w-full h-12 rounded-[26px] border-none pl-4 pr-2.5 cursor-pointer text-white bg-[var(--Dark-theme-Btn)] font-semibold text-lg"
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
    </motion.div>
  );
}

export default signup;
