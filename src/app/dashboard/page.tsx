import prisma from "../../../prisma/database";
import { getServerSession } from "next-auth";
import { user } from "@prisma/client";
import DashboardPage from "@/components/dashboard/dashboard";

const Dashboard = async () => {
    const session = await getServerSession();
    const userdata: user | null = await prisma.user.findFirst({
        where: {
            email: session?.user.email
        }
    });
    const isCompleted = (): boolean => {
        if (userdata?.name != null && userdata?.contact != null && userdata?.email != null && userdata?.address != null && userdata?.avatar != null) {
            return true;
        }
        return false;
    }
    return (
        <>
            <DashboardPage user={userdata} isProfileCompleted={isCompleted()} />
        </>
    );
}

export default Dashboard;