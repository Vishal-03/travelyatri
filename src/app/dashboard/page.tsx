"use client"

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const Dashboard = () => {
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: () => {
            return axios.post('/api/user/logout');
        },
        onError: (error, variables, context) => {
            toast.error(error.message);
        },
        onSuccess: (data, variables, context) => {
            if (data.data.status) {
                toast.success(data.data.message);
                return router.replace("/login");
            } else {
                toast.error(data.data.message);
            }
        },
    })

    return (
        <>
            <main className="w-full flex bg-green-600">
                <div className="ml-72 bg-yellow-500 min-h-screen w-full">

                </div>
                <div className="w-72 h-screen fixed bg-rose-500">

                    <button onClick={() => mutation.mutate()}>Logout</button >
                </div>
            </main>
        </>
    );
}

export default Dashboard;