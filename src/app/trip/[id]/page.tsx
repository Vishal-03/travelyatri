"use server";

import { trips } from "@prisma/client";

import prisma from "../../../../prisma/database";
import ViewTripsHome from "@/components/dashboard/viewtriphome";
const Trips = async ({ params }: { params: any }) => {
  const trips: trips | null = await prisma.trips.findFirst({
    where: {
      id: parseInt(params.id),
    },
    include: {
      day_info: true,
      trip_location: true,
      trips_images: true,
      inclusion: true,
      exclusion: true,
      create: { include: { agency: true } },
    },
  });
  return (
    <>
      <ViewTripsHome trip={trips as trips} />
    </>
  );
};

export default Trips;
