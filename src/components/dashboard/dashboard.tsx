"use client"

import { useEffect } from "react";
import { Fa6SolidMountainSun, MaterialSymbolsDashboard } from "../icons";
import AgencyDashboard from "./agencydashboard";
import { useRouter } from "next/navigation";
import CompleteCard from "./completecard";

interface DashboardPageProps {
    user: any;
    isProfileCompleted: boolean;
}
const DashboardPage = (props: DashboardPageProps) => {

    const route = useRouter();
    useEffect(() => {
        if (props.user.role == "ADMIN") {
            route.replace("/dashboard/users")
        }
    }, []);


    return (
        <>
            <div className="w-full relative p-6">
                <div className="my-4 flex gap-4 items-center">
                    <MaterialSymbolsDashboard className="text-black text-3xl" />
                    <h1 className="text-black text-2xl font-medium">DASHBOARD</h1>
                </div>
                {props.isProfileCompleted ? <CompleteCard /> : null}
                <div className="flex mt-6 justify-between gap-6 flex-wrap">
                    <div className="flex-1 bg-gradient-to-bl from-rose-300 to-rose-500 rounded-md shadow-lg p-4 min-w-48">
                        <Fa6SolidMountainSun className="text-3xl text-white" />
                        <h1 className="text-white text-xl font-semibold mt-4">Running</h1>
                        <h1 className="text-white text-4xl font-semibold">5</h1>
                    </div>
                    <div className="flex-1 bg-gradient-to-bl from-orange-300 to-orange-500 rounded-md shadow-lg p-4 min-w-48">
                        <Fa6SolidMountainSun className="text-3xl text-white" />
                        <h1 className="text-white text-xl font-semibold mt-4">Created</h1>
                        <h1 className="text-white text-4xl font-semibold">5</h1>
                    </div>
                    <div className="flex-1 bg-gradient-to-bl from-emerald-300 to-emerald-500 rounded-md shadow-lg p-4 min-w-48">
                        <Fa6SolidMountainSun className="text-3xl text-white" />
                        <h1 className="text-white text-xl font-semibold mt-4">Completed</h1>
                        <h1 className="text-white text-4xl font-semibold">5</h1>
                    </div>
                    <div className="flex-1 bg-gradient-to-bl from-indigo-300 to-indigo-500 rounded-md shadow-lg p-4 min-w-48">
                        <Fa6SolidMountainSun className="text-3xl text-white" />
                        <h1 className="text-white text-xl font-semibold mt-4">Rejected</h1>
                        <h1 className="text-white text-4xl font-semibold">5</h1>
                    </div>
                </div>
            </div>


            <div className="p-6">
                {
                    props.user?.role == "USER" ?
                        <AgencyDashboard /> :
                        <AgencyDashboard />
                }

            </div>

        </>
    );
}

export default DashboardPage;