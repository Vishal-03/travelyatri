"use server"

import { user } from "@prisma/client";
import { getServerSession } from "next-auth";
import prisma from "../../../../prisma/database";
import AgencyInfo from "@/components/dashboard/agency/agencyinfo";
const AgencyPage = async () => {
    const session = await getServerSession();
    const userdata: any = await prisma.user.findFirst({
        where: {
            email: session?.user.email
        },
        include: { agency: true }
    });
    console.log(userdata);
    return (
        <>
            <AgencyInfo agency={userdata!.agency} />
        </>
    );
}
export default AgencyPage;