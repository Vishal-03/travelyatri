"use client"
import { useEffect, useState } from "react";
import { Fa6BrandsWhatsapp, IconamoonAppsBold, IconamoonCloseDuotone } from "../icons";
import SideBar from "./sidebar";
import { useRouter } from "next/navigation";
import { user } from "@prisma/client";

interface DashboardLaoyutProps {
    children: any;
    userdata: user;
}

const DashboardLaoyut = (props: DashboardLaoyutProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const route = useRouter();
    useEffect(() => {
        if (props.userdata.status == "INACTIVE") {
            route.push("/emailactive");;
        }
        if (props.userdata.role == "AGENCY" && props.userdata.status != "ADMINACTIVE") {
            route.push("/notadminactive");;
        }
    }, []);

    return (
        <>
            <div className={`${isOpen ? "" : ""} md:ml-60 min-h-screen w-full bg-[#ecedf1]`}>
                {props.children}
            </div>
            <a target="_blank" href="https://wa.me/911111111111" className="fixed bottom-5 right-5 bg-white rounded-full p-2 shadow-md">
                <Fa6BrandsWhatsapp className="text-3xl text-green-500" />
            </a>
            {isOpen ?
                <>
                    <div onClick={() => setIsOpen(false)} className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
                </> : <></>}
            <SideBar id={props.userdata!.id} user={props.userdata} isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="md:hidden fixed left-2 top-2 bg-white rounded-full p-2 shadow-md cursor-pointer" onClick={() => setIsOpen((val) => !val)}>
                {isOpen ? <IconamoonCloseDuotone /> :
                    <IconamoonAppsBold />}
            </div>
        </>
    );
}
export default DashboardLaoyut;