"use server";
import CreateTripsCard from "@/components/dashboard/createtripscard";
import TripsSection from "@/components/dashboard/trips";
import { Fa6SolidMountainSun } from "@/components/icons";
import prisma from "../../../../prisma/database";
import { getServerSession } from "next-auth";
import { user } from "@prisma/client";
import UserTripsSection from "@/components/dashboard/trips/usertripsection";
import { profileCompleted } from "@/actions/user/profilecompleted";
import AgencyInfo from "@/components/dashboard/agency/agencyinfo";
import CompleteAgencyCard from "@/components/dashboard/completeagency";

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

  const userProfile = await profileCompleted({
    userid: userdata?.id as number,
  });

  return (
    <>
      <div className="w-full relative p-6">
        {userdata?.role == "AGENCY" ? (
          userProfile.data?.agency ? (
            <CreateTripsCard />
          ) : (
            <div className="w-4/6 mx-auto grid place-items-center h-screen ">
              <CompleteAgencyCard />
            </div>
          )
        ) : (
          <></>
        )}
        {userdata?.role == "AGENCY" ? (
          userProfile.data?.agency ? (
            <>
              <TripsSection trips={trips} />
            </>
          ) : (
            <></>
          )
        ) : (
          <UserTripsSection trips={trips}></UserTripsSection>
        )}
      </div>
    </>
  );
};

export default Trips;
