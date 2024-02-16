"use server";
import CreateTripsCard from "@/components/dashboard/createtripscard";
import TripsSection from "@/components/dashboard/trips";
import { Fa6SolidMountainSun } from "@/components/icons";
import prisma from "../../../../prisma/database";
import { getServerSession } from "next-auth";
import { user } from "@prisma/client";
import UserTripsSection from "@/components/dashboard/trips/usertripsection";

const Trips = async () => {
  const session = await getServerSession();
  const userdata: user | null = await prisma.user.findFirst({
    where: {
      email: session?.user.email,
    },
  });

  const trips = await prisma.trips.findMany({
    where: {
      createdBy: userdata!.id,
    },
    include: {
      create: { include: { agency: true } },
    },
  });

  return (
    <>
      <div className="w-full relative p-6">
        {userdata?.role == "AGENCY" ? <CreateTripsCard /> : <></>}
        {userdata?.role == "AGENCY" ? (
          <TripsSection trips={trips} />
        ) : (
          <UserTripsSection trips={trips}></UserTripsSection>
        )}
      </div>
    </>
  );
};

export default Trips;
