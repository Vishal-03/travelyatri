import EditProfile from "@/components/dashboard/profile/editprofile";
import { user } from "@prisma/client";
import { getServerSession } from "next-auth";
import prisma from "../../../../../prisma/database";


const Profile = async () => {
    const session = await getServerSession();
    const userdata: user | null = await prisma.user.findFirst({
        where: {
            email: session?.user.email
        }
    });
    return (
        <>
            <EditProfile userdata={userdata} />
        </>
    );
}

export default Profile;
