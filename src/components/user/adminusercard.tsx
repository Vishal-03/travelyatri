"use client"
import { UpdateStatus } from "@/actions/user/updateStatus";
import { ByIdForm, ByIdSchema } from "@/schemas/byid";
import { Image, user } from "@nextui-org/react";
import { Status } from "@prisma/client";
import { toast } from "react-toastify";
import { safeParse } from "valibot";

interface UserCardProps {
    id: number;
    name: string;
    email: string;
    avatar: string;
    status: Status;
}

const UserCard = (props: UserCardProps) => {
    const registerUser = async () => {
        const result = safeParse(ByIdSchema, {
            id: props.id
        });
        if (result.success) {
            const updatedUser = await UpdateStatus({ userid: result.output.id, status: props.status == "ADMINACTIVE" ? "ACTIVE" : "ADMINACTIVE" })
            if (updatedUser.status) {
                toast.success(updatedUser.message);
            } else {
                toast.error(updatedUser.message);
            }
        } else {
            let errorMessage = "";
            if (result.issues[0].input) {
                errorMessage = result.issues[0].message;
            } else {
                errorMessage = result.issues[0].path![0].key + " is required";
            }
            toast.error(errorMessage);
        }
    }


    return (
        <>
            <div className=" bg-white p-4 min-w-80 rounded-md">
                <h1 className="text-right text-sm">{props.status}</h1>
                <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 rounded-full bg-[#fff] shadow-lg">
                        <Image src={"/user.png"} alt="error" className="w-full h-full" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-black text-xl font-medium">{props.name == "" || props.name == null || props.name == undefined ? "-" : props.name}</h1>
                        <h1 className="text-black text-sm font-medium">{props.email}</h1>
                    </div>
                </div>
                <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-gradient-to-bl from-orange-500 to-orange-300 text-white rounded-md px-4 py-1">View</button>
                    <button className="flex-1 bg-gradient-to-bl from-red-500 to-red-300 text-white rounded-md px-4 py-1">Delete</button>
                    {
                        props.status == "ADMINACTIVE" ?
                            <button onClick={registerUser} className="flex-1 bg-gradient-to-bl from-yellow-500 to-yellow-300 text-white rounded-md px-4 py-1">Deactivate</button>
                            :
                            <button onClick={registerUser} className="flex-1 bg-gradient-to-bl from-green-500 to-green-300 text-white rounded-md px-4 py-1">Activate</button>
                    }

                </div>
            </div>
        </>
    );
}

export default UserCard;