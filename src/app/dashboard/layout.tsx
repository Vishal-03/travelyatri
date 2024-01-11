import SideBar from "@/components/dashboard/sidebar";
import { cookies } from "next/headers";
import { database } from "../../../prisma/database";
import { user } from "@prisma/client";


const Layout = async ({ children }: any) => {
    const usercookies = cookies().get("user")?.value;
    const userid = JSON.parse(usercookies!);
    const userdata: user | null = await database.user.findFirst({
        where: {
            id: userid.id
        }
    });

    return (
        <>
            <main className="w-full flex">
                <div className="ml-60 min-h-screen w-full bg-[#eeeeee]">
                    {children}
                </div>
                <SideBar id={userid.id} user={userdata} />
            </main>
        </>
    );

}

export default Layout;