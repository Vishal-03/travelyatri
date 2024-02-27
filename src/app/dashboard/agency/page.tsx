"use server";

import { getServerSession } from "next-auth";
import prisma from "../../../../prisma/database";
import AgencyInfo from "@/components/dashboard/agency/agencyinfo";
import { profileCompleted } from "@/actions/user/profilecompleted";
import CompleteAgencyCard from "@/components/dashboard/completeagency";
const AgencyPage = async () => {
  const session = await getServerSession();
  const userdata: any = await prisma.user.findFirst({
    where: {
      email: session?.user.email,
    },
    include: { agency: true },
  });
  const userProfile = await profileCompleted({
    userid: userdata?.id as number,
  });

  return (
    <>
      {userProfile.data?.agency ? (
        <AgencyInfo agency={userdata!.agency} />
      ) : (
        <div className="w-4/6 mx-auto grid place-items-center h-screen ">
          <CompleteAgencyCard />
        </div>
      )}
    </>
  );
};
export default AgencyPage;
