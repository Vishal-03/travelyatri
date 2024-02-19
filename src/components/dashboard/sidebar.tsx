"use client";
import {
  Fa6SolidCircleQuestion,
  Fa6SolidDoorOpen,
  Fa6SolidMagnifyingGlass,
  Fa6SolidMountainSun,
  Fa6SolidUser,
  IcBaselineContactPage,
  MaterialSymbolsContactEmergency,
  MaterialSymbolsDashboard,
} from "@/components/icons";
import { Image } from "@nextui-org/react";
import { user } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
interface SideBarProps {
  id: number;
  user: user;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}
const SideBar = (props: SideBarProps) => {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`${
          props.isOpen ? "translate-x-0" : "-translate-x-60"
        } md:translate-x-0 transition-all duration-500 w-60 h-screen fixed bg-gradient-to-t from-[#0f2e5a] to-[#0f2e5a] flex py-6 flex-col gap-2`}
      >
        <div className="flex gap-2 justify-center w-full">
          <Image
            src="/favicon.png"
            alt="Travel Yatri"
            className="w-10 h-10 shrink-0 hidden md:block"
          />
          <h2 className="text-white font-semibold text-2xl cursor-pointer">
            <Link href={"/"}>Travel Yatri</Link>
          </h2>
        </div>
        <div className="h-4"></div>
        {props.user?.role == "ADMIN" && (
          <Link
            href={"/dashboard/users"}
            className={`flex py-2 px-4 gap-4 items-center ${
              pathname == "/dashboard/users"
                ? "text-green-500 bg-white bg-opacity-10 border-l-4 border-green-500"
                : "text-white mx-4"
            }`}
          >
            <Fa6SolidUser /> <p>User</p>
          </Link>
        )}
        {props.user?.role == "ADMIN" && (
          <Link
            href={"/dashboard/contact"}
            className={`flex py-2 px-4 gap-4 items-center ${
              pathname == "/dashboard/contact"
                ? "text-green-500 bg-white bg-opacity-10 border-l-4 border-green-500"
                : "text-white mx-4"
            }`}
          >
            <IcBaselineContactPage /> <p>contact</p>
          </Link>
        )}
        {props.user?.role == "ADMIN" && (
          <Link
            href={"/dashboard/admintrips"}
            className={`flex py-2 px-4 gap-4 items-center ${
              pathname == "/dashboard/admintrips"
                ? "text-green-500 bg-white bg-opacity-10 border-l-4 border-green-500"
                : "text-white mx-4"
            }`}
          >
            <IcBaselineContactPage /> <p>Trips</p>
          </Link>
        )}

        {["USER", "AGENCY"].includes(props.user?.role!) && (
          <Link
            href={"/dashboard"}
            className={`flex py-2 px-4 gap-4 items-center ${
              pathname == "/dashboard"
                ? "text-green-500 bg-white bg-opacity-10 border-l-4 border-green-500"
                : "text-white mx-4"
            }`}
          >
            <MaterialSymbolsDashboard /> <p>Dashboard</p>
          </Link>
        )}

        {["USER", "AGENCY"].includes(props.user?.role!) && (
          <Link
            href={"/dashboard/trips"}
            className={`flex py-2 px-4 gap-4 items-center ${
              pathname == "/dashboard/trips"
                ? "text-green-500 bg-white bg-opacity-10 border-l-4 border-green-500"
                : "text-white mx-4"
            }`}
          >
            <Fa6SolidMountainSun /> <p>Trips</p>
          </Link>
        )}

        {props.user?.role == "USER" && (
          <Link
            href={"/dashboard/search"}
            className={`flex py-2 px-4 gap-4 items-center ${
              pathname == "/dashboard/search"
                ? "text-green-500 bg-white bg-opacity-10 border-l-4 border-green-500"
                : "text-white mx-4"
            }`}
          >
            <Fa6SolidMagnifyingGlass /> <p>Search</p>
          </Link>
        )}

        {/* {props.user?.role == "AGENCY" && (
          <Link
            href={"/dashboard/query"}
            className={`flex py-2 px-4 gap-4 items-center ${
              pathname == "/dashboard/query"
                ? "text-green-500 bg-white bg-opacity-10 border-l-4 border-green-500"
                : "text-white mx-4"
            }`}
          >
            <Fa6SolidCircleQuestion /> <p>Query</p>
          </Link>
        )} */}

        {/* divider */}
        <div className="grow"></div>

        {["USER", "AGENCY"].includes(props.user?.role!) && (
          <Link
            href={"/dashboard/profile"}
            className={`flex py-2 px-4 gap-4 items-center ${
              pathname == "/dashboard/profile"
                ? "text-green-500 bg-white bg-opacity-10 border-l-4 border-green-500"
                : "text-white mx-4"
            }`}
          >
            <Fa6SolidUser /> <p>Profile</p>
          </Link>
        )}

        {["AGENCY"].includes(props.user?.role!) && (
          <Link
            href={"/dashboard/agency"}
            className={`flex py-2 px-4 gap-4 items-center ${
              pathname == "/dashboard/agency"
                ? "text-green-500 bg-white bg-opacity-10 border-l-4 border-green-500"
                : "text-white mx-4"
            }`}
          >
            <MaterialSymbolsContactEmergency /> <p>Agency</p>
          </Link>
        )}

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mx-4 text-white flex hover:bg-rose-600 py-1 px-4 gap-4 rounded-md items-center"
        >
          <Fa6SolidDoorOpen /> <p>Logout</p>
        </button>
      </div>
    </>
  );
};
export default SideBar;
