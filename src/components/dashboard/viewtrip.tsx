"use client"
import { TripForm, TripSchema } from "@/schemas/createtrip";
import { Image } from "@nextui-org/react";
import { trips } from "@prisma/client";
import { useRouter } from "next/navigation";

interface TripProps {
    trip: trips;
}
const ViewTrips = (props: TripProps) => {
    const start_date = new Date(props.trip?.start!);
    const start = `${start_date.getDate()}-${start_date.getMonth() + 1}-${start_date.getFullYear()}`;
    const end_date = new Date(props.trip?.end!);
    const end = `${end_date.getDate()}-${end_date.getMonth() + 1}-${end_date.getFullYear()}`;
    return (
        <>
            <div className="p-6">
                <div className=" w-full bg-white shadow-xl rounded-3xl p-6">
                    <div className="flex flex-row gap-6">
                        <div>
                            <div className="flex flex-col ">
                                <div className="flex justify-between ">
                                    <h1 className="text-black font-bold text-2xl">{props.trip?.name}</h1>
                                </div>
                            </div>
                            <p className="text-black font-serif">BY Akash Mishra</p>
                            <div className="flex gap-1  w-full mt-2">
                                <Image alt="error" src={props.trip.image!} className="w-80 h-80 object-cover object-center" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-1/2">

                            <div className="flex flex-col gap-3">
                                <h1 className="text-lg font-bold">Description</h1>
                                <p>{props.trip?.description}</p>
                            </div>

                            <div className="flex  w-full flex-col justify-center gap-3  border-t-2 text-sm py-4">
                                <h1 className="text-lg font-bold">Location Info</h1>
                                <h1>Location: {props.trip?.location}</h1>
                                <p>Location Description: {props.trip?.location_description}</p>
                            </div>

                            <div className="flex  w-full flex-col justify-center gap-3 border-b-2 border-t-2 text-sm py-4">
                                <h1 className="text-lg font-bold">Timing Info</h1>
                                <h1>Start time: {start}</h1>
                                <h1>End time: {end}</h1>
                                <h1>Duration: {props.trip?.number_of_days}</h1>
                                <h1>Price: {props.trip?.price}</h1>
                                <h1>Type: {props.trip?.category}</h1>
                                <h1>Category: {props.trip?.trip_type}</h1>
                            </div>
                        </div>
                    </div>

                    {/* <h1 className="text-lg font-medium text-black mb-4 ">Trips Images</h1>
                    <div className="flex gap-5 w-full flex-wrap justify-evenly">
                        <div className="w-60 h-60 bg-rose-500"></div>
                        <div className="w-60 h-60 bg-rose-500"></div>
                        <div className="w-60 h-60 bg-rose-500"></div>
                        <div className="w-60 h-60 bg-rose-500"></div>
                        <div className="w-60 h-60 bg-rose-500"></div>
                        <div className="w-60 h-60 bg-rose-500"></div>
                        <div className="w-60 h-60 bg-rose-500"></div>
                        <div className="w-60 h-60 bg-rose-500"></div>
                        <div className="w-60 h-60 bg-rose-500"></div>
                    </div> */}
                </div>

            </div>
        </>
    );
}
export default ViewTrips;
