"use client";
import FormWrapper from "@/components/forms/FormWrapper";
import Input from "@/components/forms/Input";
import LoginSVG from "@/components/SVG/LoginSVG";
import { Progress } from "@/components/ui/shadcn/progress";
import { useLoginForm } from "@/hooks/useLoginForm";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    shouldShowError,
  } = useLoginForm();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex w-full"
    >
      <div className="pt-9 w-1/2 rounded-xl m-9">
        <LoginSVG />
      </div>

      <div className="w-1/2">
        <FormWrapper
          onSubmit={handleSubmit(onSubmit)}
          className="w-[28rem] h-[36rem] flex flex-col justify-center pr-9 gap-4"
        >
          <h1 className="font-bold text-2xl">
            Hello,
            <br /> Welcome Back
          </h1>
          <Input
            type="text"
            name="email"
            placeholder="Enter your E-mail."
            error={shouldShowError("email") ? errors.email?.message : undefined}
            register={register}
            className="authInput"
            autoComplete="off"
          />
          <Input
            type="password"
            name="password"
            placeholder="Enter your Password."
            error={
              shouldShowError("password") ? errors.password?.message : undefined
            }
            register={register}
            className="authInput"
            autoComplete="off"
          />

          {isSubmitting ? (
            <Progress value={65} />
          ) : (
            <input
              className="w-full h-12 rounded-[26px] border-none pl-4 pr-2.5 cursor-pointer text-white bg-[var(--Dark-theme-Btn)] font-semibold text-lg active:scale-95"
              title="Log-In button"
              type="submit"
              name="login"
              value="Login"
            />
          )}

          <input
            className="w-full h-12 rounded-[26px] border-none pl-4 pr-2.5 cursor-pointer font-semibold text-lg bg-gray-300 active:scale-95"
            title="Sign-up button"
            type="button"
            name="signUp"
            value="SignUp"
            onClick={() => router.push("/signup")}
          />
        </FormWrapper>
      </div>
    </motion.div>
  );
}

export default login;
