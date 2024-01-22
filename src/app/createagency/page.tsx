"use server"
import { getServerSession } from "next-auth";
import CreateAgency from "@/components/dashboard/createagency";
import { user } from "@prisma/client";
import prisma from "../../../prisma/database";
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