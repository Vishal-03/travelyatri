"use client"

import { Image } from "@nextui-org/react";
import { agency } from "@prisma/client";

interface AgencyInfoProps {
    agency: agency;
}
const AgencyInfo = (props: AgencyInfoProps) => {
    return (
        <>
            <div className="bg-white rounded-md m-6 p-6">
                <h1 className="text-3xl font-semibold text-center">Agency Details</h1>
                <div className="w-full bg-red-500 mt-4">
                    <Image alt="error" src={props.agency.banner!} removeWrapper className="h-60 w-full inline-block rounded-lg object-cover object-center" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center  items-center -translate-y-36">
                    <Image alt="error" src={props.agency.logo!} className="w-60 h-60 object-cover object-center rounded-full" />
                </div>
                <div className="-translate-y-32 flex flex-col items-center justify-center">
                    <h1 className="text-lg font-medium">Name: {props.agency.name}</h1>
                    <h1 className="text-lg font-medium">Email: {props.agency.email}</h1>
                    <h1 className="text-lg font-medium">Contact: {props.agency.contact}</h1>
                    <h1 className="text-lg font-medium">Website: {props.agency.website}</h1>
                    <h1 className="text-lg font-medium">Description:: {props.agency.description}</h1>
                    <h1 className="text-lg font-medium">Create Time: {new Date(props.agency.createdAt.toString()).toDateString()}</h1>
                </div>
            </div>
        </>
    );
}

export default AgencyInfo;