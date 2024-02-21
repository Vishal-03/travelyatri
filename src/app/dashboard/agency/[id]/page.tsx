"use server";

import prisma from "../../../../../prisma/database";
import { agency } from "@prisma/client";
import AgencyInfo from "@/components/dashboard/agency/agencyinfo";

const Trips = async ({ params }: { params: any }) => {
  const agency: agency | null = await prisma.agency.findFirst({
    where: {
      id: parseInt(params.id),
    },
    include: { user: true },
  });
  return (
    <>
      <AgencyInfo agency={agency as agency} />
    </>
  );
};

export default Trips;
