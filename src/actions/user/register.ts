"use server"
import { ApiResponseType } from "@/models/responnse";
import prisma from "../../../prisma/database";
import { errorToString } from "@/utils/methods";
import { hash } from "bcrypt";

type RegisterPayload = { email: string, password: string };
export const registerUser = async (args: RegisterPayload): Promise<ApiResponseType<null>> => {
    try {

        const alreadyexist = await prisma.user.findFirst({ where: { email: args.email } });

        if (alreadyexist) return { status: false, data: null, message: "Email Already exist.Try Different email  ", apiurl: "registerUser" };
        const password = await hash(args.password, 10);

        const user = await prisma.user.create({
            data: {
                email: args.email,
                password: password,
                role: "USER"
            }
        });

        if (!user) return { status: false, data: null, message: "Unable to create user", apiurl: "registerUser" };
        return { status: true, data: null, message: "User register successfully", apiurl: "registerUser" };

    } catch (e) {
        const response: ApiResponseType<null> = { status: false, data: null, message: errorToString(e), apiurl: "registerUser", };
        return response;
    }
}


