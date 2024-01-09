import SideBar from "@/components/dashboard/sidebar";
import { cookies } from "next/headers";


const Layout = ({ children }: any) => {
    const usercookies = cookies().get("user")?.value;
    const user = JSON.parse(usercookies!);
    return (
        <>
            <main className="w-full flex">
                <div className="ml-60 min-h-screen w-full bg-[#eeeeee]">
                    {children}
                </div>
                <SideBar id={user.id} role={user.role} />

            </main>
        </>
    );
}
export default Layout;