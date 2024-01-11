"use client"
import { Fa6SolidCircleQuestion, Fa6SolidDoorOpen, Fa6SolidMagnifyingGlass, Fa6SolidMountainSun, Fa6SolidUser, MaterialSymbolsDashboard } from "@/components/icons";
import { user } from "@prisma/client";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
interface SideBarProps {
    id: number;
    user: user | null;
}
const SideBar = (props: SideBarProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: () => {
            return axios.post('/api/user/logout');
        },
        onError: (error, variables, context) => {
            toast.error(error.message);
        },
        onSuccess: (data, variables, context) => {
            if (data.data.status) {
                toast.success(data.data.message);
                return router.replace("/login");
            } else {
                toast.error(data.data.message);
            }
        },
    });


    return (

        <>
            <div className="w-60 h-screen fixed bg-rose-500 flex py-6 flex-col gap-2">
                <div className="h-16 w-16 bg-blue-500 rounded-full grid place-items-center mx-auto mt-4">
                    <p className="text-white text-3xl font-semibold">{props.user?.name ?? props.user?.email!.toString().substring(0, 1)}</p>
                </div>
                <h1 className="text-center text-sm text-white font-medium">{props.user?.role}</h1>
                <h1 className="text-center text-lg text-white font-medium">{props.user?.email}</h1>
                <div className="h-4"></div>
                <Link href={"/dashboard"} className={`flex py-1 px-4 gap-4 items-center ${pathname == "/dashboard" ? "rounded-l-full text-rose-500 bg-white ml-4" : "rounded-md text-white mx-4"}`}><MaterialSymbolsDashboard /> <p>Dashboard</p></Link>

                <Link href={"/dashboard/trips"} className={`flex py-1 px-4 gap-4 items-center ${pathname == "/dashboard/trips" ? "rounded-l-full text-rose-500 bg-white ml-4" : "rounded-md text-white mx-4"}`}><Fa6SolidMountainSun /> <p>Trips</p></Link>
                {props.user?.role == "USER" && <Link href={"/dashboard/search"} className={`flex py-1 px-4 gap-4 items-center ${pathname == "/dashboard/search" ? "rounded-l-full text-rose-500 bg-white ml-4" : "rounded-md text-white mx-4"}`}><Fa6SolidMagnifyingGlass /> <p>Search</p></Link>}
                {props.user?.role == "AGENCY" && <Link href={"/dashboard/query"} className={`flex py-1 px-4 gap-4 items-center ${pathname == "/dashboard/query" ? "rounded-l-full text-rose-500 bg-white ml-4" : "rounded-md text-white mx-4"}`}><Fa6SolidCircleQuestion /> <p>Query</p></Link>}
                <div className="grow"></div>
                <Link href={"/dashboard/profile"} className={`flex py-1 px-4 gap-4 items-center ${pathname == "/dashboard/profile" ? "rounded-l-full text-rose-500 bg-white ml-4" : "rounded-md text-white mx-4"}`}><Fa6SolidUser /> <p>Profile</p></Link >
                <button onClick={() => mutation.mutate()} className="mx-4 text-white flex hover:bg-rose-600 py-1 px-4 gap-4 rounded-md items-center"><Fa6SolidDoorOpen /> <p>Logout</p></button >
            </div>
        </>
    );
}
export default SideBar;