"use client"

import CreateTripsCard from "@/components/dashboard/createtripscard";
import TripsSection from "@/components/dashboard/trips";
import { Fa6SolidMountainSun } from "@/components/icons";

const Trips = () => {
    return (
        <>
            <div className="w-full relative p-6">
                <div className="my-4 flex gap-4 items-center">
                    <Fa6SolidMountainSun className="text-black text-3xl" />
                    <h1 className="text-black text-2xl font-medium">Trips</h1>
                </div>
                <CreateTripsCard />
                <TripsSection />
            </div>
        </>
    );
}

export default Trips;