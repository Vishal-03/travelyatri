import SideBar from "@/components/dashboard/sidebar";
import { cookies } from "next/headers";
import { user } from "@prisma/client";
import { getServerSession } from "next-auth";
import prisma from "../../../prisma/database";

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
                <div className="ml-60 min-h-screen w-full bg-[#eeeeee]">
                    {children}
                </div>
                <SideBar id={userdata!.id} user={userdata} />
            </main>
        </>
    );

}

export default Layout;