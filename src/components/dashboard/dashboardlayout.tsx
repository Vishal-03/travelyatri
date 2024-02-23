"use client";
import { use, useEffect, useState } from "react";
import {
  Fa6BrandsWhatsapp,
  GridiconsMenu,
  IconamoonAppsBold,
  IconamoonCloseDuotone,
} from "../icons";
import SideBar from "./sidebar";
import { usePathname, useRouter } from "next/navigation";
import { user } from "@prisma/client";
import { Image } from "@nextui-org/react";

interface DashboardLaoyutProps {
  children: any;
  userdata: user;
}

const DashboardLaoyut = (props: DashboardLaoyutProps) => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const route = useRouter();
  useEffect(() => {
    if (props.userdata.status == "INACTIVE") {
      route.push("/emailactive");
    }
    if (
      props.userdata.role == "AGENCY" &&
      props.userdata.status != "ADMINACTIVE"
    ) {
      route.push("/notadminactive");
    }
  }, []);

  const getHeader = (): string => {
    if (path.toString().includes("/dashboard/trips")) {
      return "Trip";
    } else if (path.toString().includes("/dashboard/admintrips")) {
      return "Trips";
    } else if (path.toString().includes("/dashboard/adminagency")) {
      return "Agency";
    } else if (path.toString().includes("/dashboard/users/")) {
      return "User";
    } else if (path.toString().includes("/dashboard/agency/")) {
      return "Agency";
    } else if (path.toString().includes("/dashboard/alltrips")) {
      return "All Trips";
    } else {
      return path.toString().split("/").pop()?.toUpperCase() ?? "";
    }
  };

  return (
    <>
      <div
        className={`${
          isOpen ? "" : ""
        } md:pl-60 min-h-screen w-full bg-[#ecedf1]`}
      >
        <div className="bg-[#f0f1f5] w-full flex py-3 px-4 gap-4 items-center">
          <div
            className="md:hidden  cursor-pointer"
            onClick={() => setIsOpen((val) => !val)}
          >
            {isOpen ? <IconamoonCloseDuotone /> : <GridiconsMenu />}
          </div>
          <p className="text-lg font-semibold">{getHeader()}</p>
          <div className="grow"></div>
          {props.userdata.avatar != null ? (
            <Image
              alt="erro"
              src={props.userdata.avatar}
              className="h-8 w-8 rounded-full object-cover object-center mx-auto inline-block"
            />
          ) : (
            <div className="h-8 w-8 bg-blue-500 rounded-full grid place-items-center mx-auto">
              <p className="text-white text-lg font-semibold">
                {props.userdata?.name == undefined ||
                props.userdata.name == null ||
                props.userdata.name == ""
                  ? props.userdata?.email!.toString().substring(0, 1)
                  : props.userdata.name.toString().substring(0, 1)}
              </p>
            </div>
          )}
          <p className="text-lg font-semibold">
            {props.userdata?.name == undefined ||
            props.userdata.name == null ||
            props.userdata.name == ""
              ? props.userdata?.email.toString().split("@")[0]
              : props.userdata.name}
          </p>
        </div>
        {props.children}
      </div>
      <a
        target="_blank"
        href="https://wa.me/911111111111"
        className="fixed bottom-5 right-5 bg-white rounded-full p-2 shadow-md"
      >
        <Fa6BrandsWhatsapp className="text-3xl text-green-500" />
      </a>
      {isOpen ? (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
          ></div>
        </>
      ) : (
        <></>
      )}
      <SideBar
        id={props.userdata!.id}
        user={props.userdata}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};
export default DashboardLaoyut;
