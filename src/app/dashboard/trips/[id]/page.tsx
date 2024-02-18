"use server";

import { trips } from "@prisma/client";
import ViewTrips from "@/components/dashboard/viewtrip";
import prisma from "../../../../../prisma/database";

const Trips = async ({ params }: { params: any }) => {
  const trips: trips | null = await prisma.trips.findFirst({
    where: {
      id: parseInt(params.id),
    },
    include: { trips_images: true, create: { include: { agency: true } } },
  });
  return (
    <>
      <ViewTrips trip={trips as trips} />
    </>
  );
};

export default Trips;
