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
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Image alt="error" src={props.agency.logo!} className="w-60 h-60 object-cover object-center" />
                    <Image alt="error" src={props.agency.banner!} className="w-[36rem] h-60  object-cover object-center" />
                </div>
                <h1 className="text-lg font-medium mt-4">Name: {props.agency.name}</h1>
                <h1 className="text-lg font-medium">email: {props.agency.email}</h1>
                <h1 className="text-lg font-medium">contact: {props.agency.contact}</h1>
                <h1 className="text-lg font-medium">website: {props.agency.website}</h1>
                <h1 className="text-lg font-medium">description:: {props.agency.description}</h1>
                <h1 className="text-lg font-medium">Create Time: {new Date(props.agency.createdAt.toString()).toDateString()}</h1>
            </div>
        </>
    );
}

export default AgencyInfo;