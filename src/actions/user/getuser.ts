"use server"
import { ApiResponseType } from "@/models/responnse";
import prisma from "../../../prisma/database";
import { errorToString } from "@/utils/methods";
import { user } from "@prisma/client";

type getUserPayload = { userid: number };
export const getUser = async (args: getUserPayload): Promise<ApiResponseType<user | null>> => {
    try {
        const user = await prisma.user.findFirst({ where: { id: args.userid } });
        if (!user) return { status: false, data: null, message: "Invalid user id.Try Again", apiurl: "getUser" };
        return { status: true, data: user, message: "User data get  successfully", apiurl: "getUser" };
    } catch (e) {
        const response: ApiResponseType<null> = { status: false, data: null, message: errorToString(e), apiurl: "getUser", };
        return response;
    }
}