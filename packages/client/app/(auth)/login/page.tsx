"use client";
import LoginSVG from "@/components/SVG/LoginSVG";
import { useRouter } from "next/navigation";

function login() {
  const router = useRouter();
  return (
    <>
      <div className="pt-9 w-1/2 rounded-xl m-9">
        <LoginSVG />
      </div>
      <div className="w-1/2">
        <form className="w-[28rem] h-[36rem] flex flex-col justify-center pr-9 gap-5">
          <h1>
            Hello,<br></br> Welcome Back
          </h1>
          <label>
            <input
              className="w-full h-12 rounded-[26px] border-none pl-4 pr-2.5 bg-[var(--input-color)] placeholder:text-[rgb(134,134,134)]"
              type="email"
              title="Email"
              placeholder="Enter your E-mail."
            />
          </label>
          <label>
            <input
              className="w-full h-12 rounded-[26px] border-none pl-4 pr-2.5 bg-[var(--input-color)] placeholder:text-[rgb(134,134,134)]"
              type="password"
              title="Password"
              placeholder="Enter your Password."
            />
          </label>
          <input
            className="w-full h-12 rounded-[26px] border-none pl-4 pr-2.5 cursor-pointer text-white bg-[var(--Dark-theme-Btn)] font-semibold text-lg"
            title="Log-In button"
            type="submit"
            name="login"
            value="Login"
          />
          <input
            className="w-full h-12 rounded-[26px] border-none pl-4 pr-2.5 cursor-pointer font-semibold text-lg bg-gray-300"
            title="Sign-up button"
            type="button"
            name="signUp"
            value="SignUp"
            onClick={() => router.push("/signup")}
          />
        </form>
      </div>
    </>
  );
}

export default login;
