"use server"

import { NextRequest, NextResponse } from "next/server";
import { trips } from "@prisma/client";
import ViewTrips from "@/components/dashboard/viewtrip";
import prisma from "../../../../../prisma/database";

const Trips = async ({ params }: { params: any }) => {
    const trips: trips | null = await prisma.trips.findFirst({
        where: {
            id: parseInt(params.id)
        },
        include: { create: { include: { agency: true } } }
    });
    console.log(trips)
    return (
        <>
            <ViewTrips trip={trips} />
        </>
    );
}

export default Trips;