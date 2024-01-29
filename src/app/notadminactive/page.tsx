"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";

const NotAdminActive = () => {
    return (
        <>
            <div className="bg-[#eeeeee] min-h-screen p-6 grid place-items-center w-full">
                <div className="w-full bg-white rounded-lg shadow-lg p-10 mt-6 relative ">
                    <div className="w-full grid place-items-center relative my-3">
                        <p className="text-sm font-normal text-gray-500 text-left w-96">
                            Thank you for expressing interest in Travel yatri. Your Profile is under admin verification  Please wait sometime.
                        </p>
                    </div>
                    <div className="flex gap-4 w-full justify-center mt-6">
                        <Link href={"/"} className="text-white text-sm bg-rose-500 rounded-md py-1 w-32 text-center">Home</Link>
                        <button onClick={() => signOut({ callbackUrl: "/login" })} className="text-white text-sm bg-indigo-500 rounded-md py-1 w-32 text-center">Login</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotAdminActive;