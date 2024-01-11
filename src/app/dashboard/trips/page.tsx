import CreateTripsCard from "@/components/dashboard/createtripscard";
import TripsSection from "@/components/dashboard/trips";
import { Fa6SolidMountainSun } from "@/components/icons";
import { database } from "../../../../prisma/database";
import { cookies } from "next/headers";

const Trips = async () => {

    const usercookies = cookies().get("user")?.value;
    const userid = JSON.parse(usercookies!);
    const trips = await database.trips.findMany({
        where: { createdBy: userid.id }
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