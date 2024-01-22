"use client"
import { CreateAgencyForm, createAgencySchema } from "@/schemas/createagency";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "react-toastify";
import { safeParse } from "valibot";
interface CreateAgencyProps {
    user: any;
}

const CreateAgency = (props: CreateAgencyProps) => {
    const router = useRouter();

    const name = useRef<HTMLInputElement>(null);
    const website = useRef<HTMLInputElement>(null);
    const contact = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const address = useRef<HTMLTextAreaElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);

    const mutation = useMutation({
        mutationFn: (createAgency: CreateAgencyForm) => {
            return axios.post('/api/agency/createagency', createAgency)
        },
        onError: (error, variables, context) => {
            toast.error(error.message);
        },
        onSuccess: async (data, variables, context) => {
            if (data.data.status) {
                toast.success(data.data.message);
                name.current!.value = "";
                website.current!.value = "";
                contact.current!.value = "";
                email.current!.value = "";
                address.current!.value = "";
                description.current!.value = "";
                return router.back();
            } else {
                toast.error(data.data.message);
            }
        },
    });

    async function createAgency() {
        const result = safeParse(createAgencySchema, {
            userId: props.user.id,
            name: name.current?.value,
            website: website.current?.value,
            contact: contact.current?.value,
            email: email.current?.value,
            address: address.current?.value,
            description: description.current?.value,
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
            <div className="flex min-h-screen w-full flex-col gap-10 p-10 bg-[#eeeeee]">
                <h1 className="  text-4xl ">Agency information</h1>
                <div className="flex  flex-col gap-5  rounded-lg shadow-lg p-5 bg-white">
                    <h1 className="text-3xl font-semibold">Agency details</h1>
                    <p className="pt-2  text-gray-500">Basic Information</p>

                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Agency name"
                            className="w-full rounded-lg border-2 p-4 focus:outline-none"
                            required
                            ref={name}
                        />

                        <input
                            type="text"
                            placeholder="Agency website"
                            className="w-full rounded-lg border-2  p-4 focus:outline-none"
                            ref={website}
                        />
                        <input
                            type="text"
                            placeholder="Agency support contact number"
                            className="w-full rounded-lg border-2  p-4 focus:outline-none"
                            ref={contact}
                        />
                        <input
                            type="text"
                            placeholder="Agency support email address"
                            className="w-full rounded-lg border-2  p-4 focus:outline-none"
                            ref={email}
                        />
                        <textarea
                            placeholder="Agency complete address"
                            className="w-full rounded-lg border-2 h-24 resize-none p-4 focus:outline-none"
                            ref={address}
                        ></textarea>
                        <textarea
                            placeholder="Agency description"
                            className="w-full rounded-lg border-2 h-24 resize-none p-4 focus:outline-none"
                            ref={description}
                        ></textarea>
                    </div>
                    <button onClick={createAgency} className="rounded-md border-2 bg-rose-500  p-2 font-bold text-white transition-all duration-300 ease-in-out hover:bg-rose-600">
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}

export default CreateAgency;