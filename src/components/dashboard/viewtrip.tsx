"use client"
import { TripForm, TripSchema } from "@/schemas/createtrip";
import { trips } from "@prisma/client";
import { useRouter } from "next/navigation";

interface TripProps {
    trip: trips | null;
}
const ViewTrips = (props: TripProps) => {
    const route = useRouter();
    const start_date = new Date(props.trip?.start!);
    const start = `${start_date.getDate()}-${start_date.getMonth() + 1}-${start_date.getFullYear()}`;
    const end_date = new Date(props.trip?.end!);
    const end = `${end_date.getDate()}-${end_date.getMonth() + 1}-${end_date.getFullYear()}`;
    return (
        <>
            <div className="w-5/6 bg-white rounded-md shadow-lg my-6 p-6 mx-auto">
                <h1 className="text-center text-black text-2xl font-semibold">Create Trip</h1>

                <div className="flex w-full items-center py-2 mt-6">
                    <div className="flex-1">
                        <h1 className="text-lg font-medium">Trip Name</h1>
                    </div>
                    <div className="flex-1">
                        <div className=" bg-[#eeeeee] px-4 py-1 rounded-md text-lg font-normal">{props.trip?.name}</div>
                    </div>
                </div>
                <div className="flex w-full py-2">
                    <div className="flex-1">
                        <h1 className="text-lg font-medium">Trip Description</h1>
                    </div>
                    <div className="flex-1">
                        <div className=" bg-[#eeeeee] px-4 py-1 rounded-md text-lg font-normal">{props.trip?.description}</div>

                    </div>
                </div>
                <div className="flex w-full items-center py-2">
                    <div className="flex-1">
                        <h1 className="text-lg font-medium">Trip Location</h1>
                    </div>
                    <div className="flex-1">
                        <div className=" bg-[#eeeeee] px-4 py-1 rounded-md text-lg font-normal">{props.trip?.location}</div>

                    </div>
                </div>
                <div className="flex w-full py-2">
                    <div className="flex-1">
                        <h1 className="text-lg font-medium">Trip Location Description</h1>
                    </div>
                    <div className="flex-1">
                        <div className=" bg-[#eeeeee] px-4 py-1 rounded-md text-lg font-normal">{props.trip?.location_description}</div>
                    </div>
                </div>
                <div className="flex w-full items-center py-2">
                    <div className="flex-1">
                        <h1 className="text-lg font-medium">Start Date</h1>
                    </div>
                    <div className="flex-1">
                        <div className=" bg-[#eeeeee] px-4 py-1 rounded-md text-lg font-normal">{start}</div>


                    </div>
                </div>
                <div className="flex w-full items-center py-2">
                    <div className="flex-1">
                        <h1 className="text-lg font-medium">End Date</h1>
                    </div>
                    <div className="flex-1">

                        <div className=" bg-[#eeeeee] px-4 py-1 rounded-md text-lg font-normal">{end}</div>

                    </div>
                </div>
                <div className="flex w-full items-center py-2">
                    <div className="flex-1">
                        <h1 className="text-lg font-medium">Number Of Days</h1>
                    </div>
                    <div className="flex-1">
                        <div className=" bg-[#eeeeee] px-4 py-1 rounded-md text-lg font-normal">{props.trip?.number_of_days}</div>

                    </div>
                </div>
                <div className="flex w-full items-center py-2">
                    <div className="flex-1">
                        <h1 className="text-lg font-medium">Price</h1>
                    </div>
                    <div className="flex-1">
                        <div className=" bg-[#eeeeee] px-4 py-1 rounded-md text-lg font-normal">{props.trip?.price}</div>

                    </div>
                </div>

                <div className="flex w-full items-center py-2">
                    <div className="flex-1">
                        <h1 className="text-lg font-medium">Number of Peoples</h1>
                    </div>
                    <div className="flex-1">
                        <div className=" bg-[#eeeeee] px-4 py-1 rounded-md text-lg font-normal">{props.trip?.number_of_people}</div>

                    </div>
                </div>
                <div className="flex w-full items-center py-2">
                    <div className="flex-1">
                        <h1 className="text-lg font-medium">Select Trip Type</h1>
                    </div>
                    <div className="flex-1">
                        <div className=" bg-[#eeeeee] px-4 py-1 rounded-md text-lg font-normal">{props.trip?.trip_type}</div>

                    </div>
                </div>
                <div className="flex w-full items-center py-2">
                    <div className="flex-1">
                        <h1 className="text-lg font-medium">Select Trip Category</h1>
                    </div>
                    <div className="flex-1">
                        <div className=" bg-[#eeeeee] px-4 py-1 rounded-md text-lg font-normal">{props.trip?.category}</div>
                    </div>
                </div>
                <button onClick={() => route.replace("/dashboard")} className="bg-rose-500 py-1 px-4 rounded-md text-white text-lg mt-6 font-semibold">CLOSE</button>
            </div>
        </>
    );
}
export default ViewTrips;
