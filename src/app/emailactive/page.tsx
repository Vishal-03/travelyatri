"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

const EmailActive = () => {
  return (
    <>
      <div className="bg-[#eeeeee] min-h-screen p-6 grid place-items-center w-full">
        <div className="w-full bg-white rounded-lg shadow-lg p-10 mt-6 md:w-4/6">
          <p className="text-sm font-normal text-gray-500 text-center">
            Your email is not verified kindly verify your email Address before
            proceeding
          </p>
          <div className="flex gap-4 w-full justify-center mt-6">
            <Link
              href={"/"}
              className="text-white text-sm bg-rose-500 rounded-md py-1 w-32 text-center"
            >
              Home
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-white text-sm bg-indigo-500 rounded-md py-1 w-32 text-center"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailActive;
