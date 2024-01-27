"use client"
import { UserProfileUpdateForm, UserProfileUpdateSchema } from "@/schemas/userprofileupdate";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { email, safeParse } from "valibot";

interface EditProfile {
    userdata: any;
}

const EditProfile = (props: EditProfile) => {
    const router = useRouter();

    const name = useRef<HTMLInputElement>(null);
    const contact = useRef<HTMLInputElement>(null);
    const secondcontact = useRef<HTMLInputElement>(null);
    const address = useRef<HTMLTextAreaElement>(null);

    const mutation = useMutation({
        mutationFn: (updateprofile: UserProfileUpdateForm) => {
            return axios.post('/api/user/updateprofile', updateprofile)
        },
        onError: (error, variables, context) => {
            toast.error(error.message);
        },
        onSuccess: async (data, variables, context) => {
            if (data.data.status) {
                toast.success(data.data.message);
                name.current!.value = "";
                contact.current!.value = "";
                secondcontact.current!.value = "";
                address.current!.value = "";
                return router.back();
            } else {
                toast.error(data.data.message);
            }
        },
    });

    async function updateprofile() {
        const result = safeParse(UserProfileUpdateSchema, {
            email: props.userdata!.email,
            name: name.current?.value,
            contact: contact.current?.value,
            secondcontact: secondcontact.current?.value,
            address: address.current?.value,
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

    useEffect(() => {
        name!.current!.value = props.userdata.name;
        contact!.current!.value = props.userdata.contact;
        secondcontact!.current!.value = props.userdata.secondcontact;
        address!.current!.value = props.userdata.address;
    }, []);


    return (
        <>
            <div className="p-6">
                <div className="bg-white  shadow-xl  rounded-xl py-6">
                    <div className="p-4 font-serif text-2xl font-semibold text-center">
                        Edit Profile
                    </div>
                    <div className="flex h-24 w-full   ">
                        <div className="flex flex-col grow">
                            <label className="p-2 px-4 text-gray-500">
                                Name
                            </label>
                            <input
                                type="search"
                                name=""
                                id=""
                                className="mx-4   rounded-md border-2  bg-gray-100 p-2  "
                                placeholder="Enter your name"
                                ref={name}
                            />
                        </div>

                        <div className="flex flex-col grow">
                            <label className="p-2 px-4 text-gray-500">
                                Email
                            </label>
                            <input
                                type="search"
                                name=""
                                id=""
                                disabled
                                className="mx-4 rounded-md border-2  bg-gray-100 p-2"
                                placeholder="Enter your email"
                                value={props.userdata!.email}
                            />
                        </div>

                    </div>

                    <div className="flex h-24 w-full ">
                        <div className="flex flex-col grow">
                            <label className="p-2 px-4 text-gray-500">
                                Contact
                            </label>
                            <input
                                type="search"
                                name=""
                                id=""
                                className="mx-4   rounded-md border-2  bg-gray-100 p-2"
                                placeholder="Enter your Contact"
                                ref={contact}
                            />
                        </div>
                        <div className="flex flex-col grow">
                            <label className="p-2 px-4 text-gray-500">
                                Secondary Contact
                            </label>
                            <input
                                type="search"
                                name=""
                                id=""
                                className="mx-4  rounded-md border-2  bg-gray-100 p-2"
                                placeholder="Enter your secondary Contact"
                                ref={secondcontact}
                            />
                        </div>
                    </div>
                    <div className="flex w-full flex-col grow">
                        <label className="px-4 text-gray-500">
                            Address
                        </label>
                        <textarea
                            name=""
                            id=""
                            className="mx-4 h-16  rounded-md border-2  bg-gray-100 p-2 resize-none"
                            placeholder="Enter your Address"
                            ref={address}
                        ></textarea>
                        <button onClick={updateprofile} className="mx-4 mt-4  rounded-md border-2 bg-rose-500  p-2 font-bold text-white transition-all duration-300 ease-in-out hover:bg-rose-600">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}


export default EditProfile;