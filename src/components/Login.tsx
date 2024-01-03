/* eslint-disable react/no-unescaped-entities */
"use client"
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { safeParse } from "valibot";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/schemas/login";
import Link from "next/link";

const Login = () => {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (regsiter: LoginForm) => {
            return axios.post('/api/user/login', regsiter)
        },
        onError: (error, variables, context) => {
            toast.error(error.message);
        },
        onSuccess: (data, variables, context) => {
            if (data.data.status) {
                toast.success(data.data.message);
                return router.replace("/dashboard");
            } else {
                toast.error(data.data.message);
            }
        },
    })



    interface LoginForm {
        email: string;
        password: string
    }
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: "",
        password: "",
    });

    async function loginUser() {

        const result = safeParse(LoginSchema, loginForm);

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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm({ ...loginForm, [name]: value });
    }



    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">

            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-center mb-4">Create a new account</h2>
                <p className="text-gray-600 text-center mb-6">Enter your details to login.</p>
                <div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
                        <div>
                            <input type="email" name="email" id="email" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="test@gmail.com" onChange={handleChange} value={loginForm.email} />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
                        <div>
                            <input type="password" name="password" id="password" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="********" onChange={handleChange} value={loginForm.password} />
                        </div>
                    </div>
                    <button onClick={loginUser} disabled={mutation.isPending} className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">{mutation.isPending ? "Loading..." : "Login"}</button>
                </div>
                <h1 className="text-center text-sm mt-6">Dont have an account? <Link href={"/register"} className="cursor-pointer text-blue-500">Register</Link> </h1>
            </div>
        </div>

    )
}

export default Login;