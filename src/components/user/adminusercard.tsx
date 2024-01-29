"use client"
import { ByIdForm, ByIdSchema } from "@/schemas/byid";
import { Image } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { safeParse } from "valibot";

interface UserCardProps {
    id: number;
    name: string;
    email: string;
    avatar: string;
    status: string;
}
const UserCard = (props: UserCardProps) => {
    console.log(props);

    const mutation = useMutation({
        mutationFn: (userid: ByIdForm) => {
            return axios.post('/api/user/adminstatusupdate', userid)
        },
        onError: (error, variables, context) => {
            toast.error(error.message);
        },
        onSuccess: async (data, variables, context) => {
            if (data.data.status) {
                toast.success(data.data.message);
            } else {
                toast.error(data.data.message);
            }
        },
    });

    async function registerUser() {

        const result = safeParse(ByIdSchema, {
            id: props.id
        });

        if (result.success) {
            mutation.mutate(result.output);
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
            <div className=" bg-white p-4 min-w-80">
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