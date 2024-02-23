/* eslint-disable react/no-unescaped-entities */
"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { safeParse } from "valibot";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/schemas/login";
import Link from "next/link";
import { Image } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import {
  MaterialSymbolsVisibilityOffRounded,
  MaterialSymbolsVisibilityRounded,
} from "./icons";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status == "authenticated") {
      router.replace("/dashboard");
    }
  }, [session, router]);

  interface LoginForm {
    email: string;
    password: string;
  }
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const loginUser = async () => {
    const result = safeParse(LoginSchema, loginForm);

    if (result.success) {
      const credentials = await signIn("credentials", {
        email: result.output.email,
        password: result.output.password,
        redirect: false,
      });
      if (credentials?.error) {
        return toast.error("Invalid credentials");
      } else {
        router.replace("/dashboard");
      }
    } else {
      let errorMessage = "";
      if (result.issues[0].input) {
        errorMessage = result.issues[0].message;
      } else {
        errorMessage = result.issues[0].path![0].key + " is required";
      }
      toast.error(errorMessage);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen py-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Create a new account
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your details to login.
        </p>
        <div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email Address *
            </label>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="test@gmail.com"
                onChange={handleChange}
                value={loginForm.email}
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2 "
            >
              Password *
            </label>
            <div className="flex items-center border rounded-lg text-gray-700 pr-4">
              <input
                type={isShowPassword ? "text" : "password"}
                name="password"
                id="password"
                className="form-input w-full px-4 py-2 focus:outline-none  "
                required
                placeholder="********"
                onChange={handleChange}
                value={loginForm.password}
              />
              {isShowPassword ? (
                <MaterialSymbolsVisibilityOffRounded
                  className="text-xl cursor-pointer"
                  onClick={() => setIsShowPassword((val) => !val)}
                />
              ) : (
                <MaterialSymbolsVisibilityRounded
                  className="text-xl cursor-pointer"
                  onClick={() => setIsShowPassword((val) => !val)}
                />
              )}
            </div>
          </div>

          <button
            onClick={loginUser}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
          <div className="flex items-center gap-4 my-2">
            <div className="grow h-[1px] bg-black"> </div>
            <div>or</div>
            <div className="grow h-[1px] bg-black"></div>
          </div>
          {/* {(session && session.user) ?
                        <>
                            <h1>{session.user.name}</h1>
                            <button onClick={() => signOut()} className="bg-blue-500 border-2 border-blue-500 w-full rounded-sm  flex items-center gap-4"> <Image src="/images/search.png" alt="google" className="w-8 h-8 bg-white m}
                    -1 p-1 rounded-sm" /> <p className="bg-blue-500 grow h-full text-white">Sign out</p></button>
                        </>
                        :  */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="bg-blue-500 border-2 border-blue-500 w-full rounded-lg  flex items-center gap-4"
          >
            {" "}
            <Image
              src="/images/search.png"
              alt="google"
              className="w-8 h-8 bg-white p-1 rounded-lg"
            />{" "}
            <p className="bg-blue-500 grow h-full text-white">
              Login With Google
            </p>
          </button>
        </div>
        <h1 className="text-center text-sm mt-6 ">
          {" "}
          <p></p> Dont have an account?{" "}
          <Link href={"/register"} className="cursor-pointer text-blue-500">
            Register
          </Link>{" "}
        </h1>
        <div className="grid place-items-center">
          <Link
            href={"/"}
            className="text-sm cursor-pointer text-blue-500 mt-4 inline-block mx-auto"
          >
            Go Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
