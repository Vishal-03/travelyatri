"use client"
import { useState } from "react";
import { Fa6BrandsWhatsapp, IconamoonAppsBold, IconamoonCloseDuotone } from "../icons";
import SideBar from "./sidebar";
import { isoDate } from "valibot";

interface DashboardLaoyutProps {
    children: any;
    userdata: any;

}

const DashboardLaoyut = (props: DashboardLaoyutProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <div className={`${isOpen ? "" : ""} md:ml-60 min-h-screen w-full bg-[#eeeeee]`}>
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