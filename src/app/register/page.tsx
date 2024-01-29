/* eslint-disable react/no-unescaped-entities */
import Register from "@/components/Register";
import { getServerSession } from "next-auth";


const RegisterPage = async () => {
    const session = await getServerSession();
    const isUser = session != null;
    return (
        <Register isUser={isUser} />
    );
}

export default RegisterPage;