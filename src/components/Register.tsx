/* eslint-disable react/no-unescaped-entities */
"use client"
import { RegisterForm, RegisterSchema } from "@/schemas/register";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { safeParse } from "valibot";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Image } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { MaterialSymbolsVisibilityOffRounded, MaterialSymbolsVisibilityRounded } from "./icons";


interface RegisterProps {
    isUser: boolean;
}
const Register = (props: RegisterProps) => {

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowRePassword, setIsShowRePassword] = useState<boolean>(false);

    const router = useRouter();
    useEffect(() => {
        if (props.isUser) {
            router.replace("/dashboard")
        }
    }, []);



    const mutation = useMutation({
        mutationFn: (regsiter: RegisterForm) => {
            return axios.post('/api/user/register', regsiter)
        },
        onError: (error, variables, context) => {
            toast.error(error.message);
        },
        onSuccess: async (data, variables, context) => {
            if (data.data.status) {
                const credentials = await signIn("credentials", { email: data.data.data.email, password: registerForm.password, redirect: false });
                if (credentials?.error) {
                    return toast.error("Invalid credentials");
                } else {
                    console.log(data.data);
                    if (data.data.data.role == "AGENCY") {
                        router.replace("/createagency");
                    } else {
                        router.replace("/dashboard");
                    }
                }
            } else {
                toast.error(data.data.message);
            }
        },
    })

    interface registerForm {
        email: string;
        password: string
        repassword: string
    }

    const [registerForm, setRegisterForm] = useState<registerForm>({
        email: "",
        password: "",
        repassword: "",
    });

    const [userType, setuserType] = useState<boolean>(false)

    async function registerUser() {

        const result = safeParse(RegisterSchema, {
            ...registerForm,
            role: userType ? "AGENCY" : "USER"
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterForm({ ...registerForm, [name]: value });
    }

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">

            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-center mb-4">Create a new account</h2>
                <p className="text-gray-600 text-center mb-6">Enter your details to register.</p>
                <div className="p-1 rounded-md flex gap-2 bg-[#eeeeee] my-6">
                    <p className={`text-black text-sm py-1 px-6 grow text-center rounded-md cursor-pointer ${!userType ? "bg-white" : "bg[#eeeeee]"}`} onClick={() => setuserType(false)}>Traveler</p>
                    <p className={`text-black text-sm py-1 px-6 grow text-center rounded-md cursor-pointer ${userType ? "bg-white" : "bg[#eeeeee]"}`} onClick={() => setuserType(true)}>Agency</p>
                </div>
                <div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
                        <div>
                            <input type="email" name="email" id="email" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="test@gmail.com" onChange={handleChange} value={registerForm.email} />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
                        <div className="flex items-center border rounded-lg text-gray-700 pr-4">
                            <input type={isShowPassword ? "text" : "password"} name="password" id="password" className="form-input w-full px-4 py-2 focus:outline-none  " required placeholder="********" onChange={handleChange} value={registerForm.password} />
                            {isShowPassword ? <MaterialSymbolsVisibilityOffRounded className="text-xl cursor-pointer" onClick={() => setIsShowPassword((val) => !val)} /> : <MaterialSymbolsVisibilityRounded className="text-xl cursor-pointer" onClick={() => setIsShowPassword((val) => !val)} />}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700 text-sm font-semibold mb-2">Re-passwored *</label>
                        <div className="flex items-center border rounded-lg text-gray-700 pr-4">
                            <input type={isShowRePassword ? "text" : "password"} name="repassword" id="repassword" className="form-input w-full px-4 py-2 focus:outline-none  " required placeholder="********" onChange={handleChange} value={registerForm.repassword} />
                            {isShowRePassword ? <MaterialSymbolsVisibilityOffRounded className="text-xl cursor-pointer" onClick={() => setIsShowRePassword((val) => !val)} /> : <MaterialSymbolsVisibilityRounded className="text-xl cursor-pointer" onClick={() => setIsShowRePassword((val) => !val)} />}
                        </div>
                    </div>

                    <button onClick={registerUser} disabled={mutation.isPending} className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">{mutation.isPending ? "Loading..." : "Register"}</button>
                    {!userType ? <>
                        <div className="flex items-center gap-4 my-2">
                            <div className="grow h-[1px] bg-black"> </div>
                            <div>or</div>
                            <div className="grow h-[1px] bg-black"></div>
                        </div>
                        <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="bg-blue-500 border-2 border-blue-500 w-full rounded-lg  flex items-center gap-4"> <Image src="/images/search.png" alt="google" className="w-8 h-8 bg-white p-1 rounded-lg" /> <p className="bg-blue-500 grow h-full text-white">Login With Google</p></button>
                    </> : <></>}

                    <p className="text-gray-600 text-xs text-center mt-4">
                        By clicking Register, you agree to accept Apex Financial's
                        <Link href="/term_and_condition" className="text-blue-500 hover:underline">Terms and Conditions</Link>.
                    </p>
                </div>
                <h1 className="text-center text-sm mt-6">Already have an account? <Link href={"/login"} className="cursor-pointer text-blue-500">Login</Link> </h1>
            </div>
        </div>

    )
}

export default Register;