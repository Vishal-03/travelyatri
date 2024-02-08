"use server"
import { ApiResponseType } from "@/models/responnse";
import prisma from "../../../prisma/database";
import { errorToString } from "@/utils/methods";
import { compare, hash } from "bcrypt";

type changePasswordPayload = { email: string, currentpassword: string, newpassword: string };
export const changePassword = async (args: changePasswordPayload): Promise<ApiResponseType<null>> => {
    try {
        const user = await prisma.user.findFirst({ where: { email: args.email } });
        if (!user) return { status: false, data: null, message: "Invalid user email.Try Again", apiurl: "changePassword" };

        const isMatch = await compare(args.currentpassword, user.password!);
        if (!isMatch) return { status: false, data: null, message: "Current Password is wrong", apiurl: "changePassword" };

        const newPassword = await hash(args.newpassword, 10);

        const newUser = await prisma.user.update({
            where: { id: user.id },
            data: { password: newPassword }
        });

        if (!newUser) return { status: false, data: null, message: "Unable to change password", apiurl: "changePassword" };
        return { status: true, data: null, message: "Password Changed Successfully", apiurl: "changePassword" };


    } catch (e) {
        const response: ApiResponseType<null> = { status: false, data: null, message: errorToString(e), apiurl: "changePassword", };
        return response;
    }
}
