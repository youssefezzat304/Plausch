"use client";
import FormWrapper from "@/components/forms/FormWrapper";
import Input from "@/components/forms/Input";
import LoginSVG from "@/components/SVG/LoginSVG";
import { Progress } from "@/components/ui/shadcn/progress";
import { useLoginForm } from "@/hooks/useLoginForm";
import { useRouter } from "next/navigation";

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
    <>
      <div className="pt-9 w-1/2 rounded-xl m-9">
        <LoginSVG />
      </div>
      <div className="w-1/2">
        <FormWrapper
          onSubmit={handleSubmit(onSubmit)}
          className="w-[28rem] h-[36rem] flex flex-col justify-center pr-9 gap-4"
        >
          <h1>
            Hello,<br></br> Welcome Back
          </h1>
          <Input
            type="text"
            name="email"
            placeholder="Enter your E-mail."
            error={shouldShowError("email") ? errors.email?.message : undefined}
            register={register}
            className="authInput"
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
          />

          {isSubmitting ? (
            <Progress value={65} />
          ) : (
            <input
              className="w-full h-12 rounded-[26px] border-none pl-4 pr-2.5 cursor-pointer text-white bg-[var(--Dark-theme-Btn)] font-semibold text-lg"
              title="Log-In button"
              type="submit"
              name="login"
              value="Login"
            />
          )}

          <input
            className="w-full h-12 rounded-[26px] border-none pl-4 pr-2.5 cursor-pointer font-semibold text-lg bg-gray-300"
            title="Sign-up button"
            type="button"
            name="signUp"
            value="SignUp"
            onClick={() => router.push("/signup")}
          />
        </FormWrapper>
      </div>
    </>
  );
}

export default login;
