"use server";

import { trips } from "@prisma/client";

import prisma from "../../../../prisma/database";
import ViewTripsHome from "@/components/dashboard/viewtriphome";
const Trips = async ({ params }: { params: any }) => {
  const trips: trips | null = await prisma.trips.findFirst({
    where: {
      id: parseInt(params.id),
    },
    include: { trips_images: true, create: { include: { agency: true } } },
  });
  return (
    <>
      <ViewTripsHome trip={trips as trips} />
    </>
  );
};

export default Trips;
