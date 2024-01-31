"use server"
import { ApiResponseType } from "@/models/responnse";
import prisma from "../../../prisma/database";
import { errorToString } from "@/utils/methods";
import { Status, user } from "@prisma/client";
import { revalidatePath } from "next/cache";

type updateStatusPayload = { userid: number, status: Status };

export const UpdateStatus = async (args: updateStatusPayload): Promise<ApiResponseType<user | null>> => {
    try {
        const user: user | null = await prisma.user.findFirst({ where: { id: args.userid } });
        if (!user) return { status: false, data: null, message: "Invalid user id.Try Again", apiurl: "UpdateStatus" };

        const updatedUser = await prisma.user.update({
            where: {
                id: args.userid,
            },
            data: {
                status: args.status,
            },
        });
        if (!updatedUser) return { status: false, data: null, message: "Invalid user id.Try Again", apiurl: "UpdateStatus" };

        revalidatePath("/dashboard/path");
        return { status: true, data: updatedUser, message: "User data get  successfully", apiurl: "getUser" };
    } catch (e) {
        const response: ApiResponseType<null> = { status: false, data: null, message: errorToString(e), apiurl: "UpdateStatus", };
        return response;
    }
}