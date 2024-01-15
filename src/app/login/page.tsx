/* eslint-disable react/no-unescaped-entities */

import Login from "@/components/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = async () => {


  
    return (
        <Login />
    );
}

export default LoginPage;