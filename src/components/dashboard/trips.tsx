"use client"
import { useEffect, useState } from "react";
import { Fa6SolidMagnifyingGlass } from "../icons";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { trips } from "@prisma/client";
import Link from "next/link";
import TripCard from "../card/tripcard";
import { it } from "node:test";
import { create } from "domain";
import { isReadable } from "stream";

interface TripsSectionProps {
    trips: trips[];
}
const TripsSection = (props: TripsSectionProps) => {
    const [isrunning, setisrunning] = useState(true);
    const [tripstoshow, setShowTrip] = useState<trips[]>([])
    const init = (val: boolean) => {
        setisrunning(() => val)
        if (val) {
            setShowTrip(() => props.trips.filter((val: trips) => { return new Date(val.end) > new Date() }));
        } else {
            setShowTrip(() => props.trips.filter((val: trips) => { return new Date(val.end) < new Date() }));
        }
    }

    useEffect(() => {
        init(true);
    }, []);

    return (
        <>
            <div className="flex gap-4 mt-4">
                <div className={`cursor-pointer  rounded-md shadow-md  text-lg font-semibold px-6 py-1 ${isrunning ? "text-white bg-gradient-to-bl from-orange-500 to-orange-300" : "text-orange-500 bg-white"}`} onClick={() => { init(true) }}>Runing</div>
                <div className={`cursor-pointer  rounded-md shadow-md  text-lg font-semibold px-6 py-1 ${!isrunning ? "text-white bg-gradient-to-bl from-orange-500 to-orange-300" : "text-orange-500 bg-white"}`} onClick={() => { init(false) }}>Expired</div>
                <input type="text" className="grow rounded-md placeholder:text-orange-500 px-4 focus:outline-none" placeholder="Start typing to search..." /> <button className="grid place-items-center rounded-md text-white w-10 bg-gradient-to-bl from-orange-500 to-orange-300">
                    <Fa6SolidMagnifyingGlass />
                </button>
            </div>

            {tripstoshow == null || tripstoshow.length == 0 ? <>
                <h1 className="p-4 bg-white rounded-md mt-6 border-l-4 border-red-500 text-xl text-red-500">No trips found</h1>
            </> : <>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                    {
                        tripstoshow.map((item: trips, index: number) => {
                            return <TripCard image={item!.image ?? "/images/fea2.jpeg"} link={`/dashboard/trips/${item!.id}`} key={index} price={item!.price.toString()} title={item.name ?? ""} type={item.category} agency={"test"} />
                        })
                    }
                </div>
            </>}


        </>
    );
}

export default TripsSection;