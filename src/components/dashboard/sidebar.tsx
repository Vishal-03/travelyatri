"use client"
import { Fa6SolidCircleQuestion, Fa6SolidDoorOpen, Fa6SolidMagnifyingGlass, Fa6SolidMountainSun, Fa6SolidUser, MaterialSymbolsContactEmergency, MaterialSymbolsDashboard } from "@/components/icons";
import { Image } from "@nextui-org/react";
import { user } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
            <div className={`${props.isOpen ? "translate-x-0" : "-translate-x-60"} md:translate-x-0  w-60 h-screen fixed bg-gradient-to-t from-rose-400 to-rose-500 flex py-6 flex-col gap-2`}>
                {props.user.avatar != null ? <div className="grid place-items-center w-full"><Image alt="erro" src={props.user.avatar} className="h-16 w-16 rounded-full object-cover object-center mx-auto inline-block" /></div> : <div className="h-16 w-16 bg-blue-500 rounded-full grid place-items-center mx-auto mt-4">
                    <p className="text-white text-3xl font-semibold">{(props.user?.name == undefined || props.user.name == null || props.user.name == "") ? props.user?.email!.toString().substring(0, 1) : props.user.name.toString().substring(0, 1)}</p>
                </div>}


                <h1 className="text-center text-sm text-white font-medium">{props.user?.role}</h1>
                <h1 className="text-center text-lg text-white font-medium">{props.user?.email}</h1>
                <div className="h-4"></div>

                {props.user?.role == "ADMIN" && <Link href={"/dashboard/users"} className={`flex py-1 px-4 gap-4 items-center ${pathname == "/dashboard/users" ? "rounded-l-full text-rose-500 bg-white ml-4" : "rounded-md text-white mx-4"}`}><Fa6SolidUser /> <p>User</p></Link>}

                {["USER", "AGENCY"].includes(props.user?.role!) && <Link href={"/dashboard"} className={`flex py-1 px-4 gap-4 items-center ${pathname == "/dashboard" ? "rounded-l-full text-rose-500 bg-white ml-4" : "rounded-md text-white mx-4"}`}><MaterialSymbolsDashboard /> <p>Dashboard</p></Link>}

                {["USER", "AGENCY"].includes(props.user?.role!) && <Link href={"/dashboard/trips"} className={`flex py-1 px-4 gap-4 items-center ${pathname == "/dashboard/trips" ? "rounded-l-full text-rose-500 bg-white ml-4" : "rounded-md text-white mx-4"}`}><Fa6SolidMountainSun /> <p>Trips</p></Link>}

                {props.user?.role == "USER" && <Link href={"/dashboard/search"} className={`flex py-1 px-4 gap-4 items-center ${pathname == "/dashboard/search" ? "rounded-l-full text-rose-500 bg-white ml-4" : "rounded-md text-white mx-4"}`}><Fa6SolidMagnifyingGlass /> <p>Search</p></Link>}

                {props.user?.role == "AGENCY" && <Link href={"/dashboard/query"} className={`flex py-1 px-4 gap-4 items-center ${pathname == "/dashboard/query" ? "rounded-l-full text-rose-500 bg-white ml-4" : "rounded-md text-white mx-4"}`}><Fa6SolidCircleQuestion /> <p>Query</p></Link>}

                {/* divider */}
                <div className="grow"></div>

                {["USER", "AGENCY"].includes(props.user?.role!) && <Link href={"/dashboard/profile"} className={`flex py-1 px-4 gap-4 items-center ${pathname == "/dashboard/profile" ? "rounded-l-full text-rose-500 bg-white ml-4" : "rounded-md text-white mx-4"}`}><Fa6SolidUser /> <p>Profile</p></Link >}

                {["AGENCY"].includes(props.user?.role!) && <Link href={"/dashboard/agency"} className={`flex py-1 px-4 gap-4 items-center ${pathname == "/dashboard/agency" ? "rounded-l-full text-rose-500 bg-white ml-4" : "rounded-md text-white mx-4"}`}><MaterialSymbolsContactEmergency /> <p>Agency</p></Link >}

                <button onClick={() => signOut({ callbackUrl: "/login" })} className="mx-4 text-white flex hover:bg-rose-600 py-1 px-4 gap-4 rounded-md items-center"><Fa6SolidDoorOpen /> <p>Logout</p></button>
            </div>
        </>
    );
}
export default SideBar;