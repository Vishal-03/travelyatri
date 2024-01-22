"use server"
import { getServerSession } from "next-auth";
import prisma from "../../../../prisma/database";
import CreateAgency from "@/components/dashboard/createagency";
import { user } from "@prisma/client";
const CreateAgencyPage = async () => {
    const session = await getServerSession();
    const userdata: user | null = await prisma.user.findFirst({
        where: {
            email: session?.user.email
        }
    });

    return (
        <>
            <CreateAgency user={userdata} />
        </>
    );
}
export default CreateAgencyPage;