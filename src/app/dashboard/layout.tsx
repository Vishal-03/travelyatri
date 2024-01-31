import SideBar from "@/components/dashboard/sidebar";
import { cookies } from "next/headers";
import { user } from "@prisma/client";
import { getServerSession } from "next-auth";
import prisma from "../../../prisma/database";
import DashboardLaoyut from "@/components/dashboard/dashboardlayout";

const Layout = async ({ children }: any) => {
    const session = await getServerSession();
    const userdata: user | null = await prisma.user.findFirst({
        where: {
            email: session?.user.email
        }
    });

    return (
        <>
            <main className="w-full flex">
                <DashboardLaoyut userdata={userdata as user}>{children}</DashboardLaoyut>
            </main>
        </>
    );

}

export default Layout;