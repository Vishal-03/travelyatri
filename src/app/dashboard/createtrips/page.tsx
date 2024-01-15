"use server"

import CreateTrips from "@/components/dashboard/createtrip";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import prisma from "../../../../prisma/database";
import { user } from "@prisma/client";

const CreateTripsPage = async () => {
    const session = await getServerSession();
    const userdata: user | null = await prisma.user.findFirst({
        where: {
            email: session?.user.email
        }
    });
    return (
        <CreateTrips id={userdata!.id} />
    );
}
export default CreateTripsPage;