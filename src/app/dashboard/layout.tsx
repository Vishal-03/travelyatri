import SideBar from "@/components/dashboard/sidebar";
import { cookies } from "next/headers";
import { user } from "@prisma/client";
import { getServerSession } from "next-auth";
import prisma from "../../../prisma/database";
import { Fa6BrandsWhatsapp } from "@/components/icons";

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
                <a target="_blank" href="https://wa.me/911111111111" className="fixed bottom-5 right-5 bg-white rounded-full p-2 shadow-md">
                    <Fa6BrandsWhatsapp className="text-3xl text-green-500" />
                </a>
            </main>
        </>
    );

}

export default Layout;