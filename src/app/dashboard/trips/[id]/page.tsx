"use server"

import { NextRequest, NextResponse } from "next/server";
import { database } from "../../../../../prisma/database";
import { trips } from "@prisma/client";
import ViewTrips from "@/components/dashboard/viewtrip";

const Trips = async ({ params }: { params: any }) => {
    const trips: trips | null = await database.trips.findFirst({
        where: {
            id: parseInt(params.id)
        }
    });
    return (
        <>
            <ViewTrips trip={trips} />
        </>
    );
}

export default Trips;