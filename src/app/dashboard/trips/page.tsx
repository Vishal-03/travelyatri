import CreateTripsCard from "@/components/dashboard/createtripscard";
import TripsSection from "@/components/dashboard/trips";
import { Fa6SolidMountainSun } from "@/components/icons";
import { cookies } from "next/headers";
import prisma from "../../../../prisma/database";
import { getServerSession } from "next-auth";
import { trips, user } from "@prisma/client";

const Trips = async () => {
    const session = await getServerSession();
    const userdata: user | null = await prisma.user.findFirst({
        where: {
            email: session?.user.email
        }
    });

    const trips = await prisma.trips.findMany({
        where: {
            createdBy: userdata!.id
        }
    });


    return (
        <>
            <div className="w-full relative p-6">
                <div className="my-4 flex gap-4 items-center">
                    <Fa6SolidMountainSun className="text-black text-3xl" />
                    <h1 className="text-black text-2xl font-medium">Trips</h1>
                </div>
                <CreateTripsCard />
                <TripsSection trips={trips} />
            </div>
        </>
    );
}

export default Trips;