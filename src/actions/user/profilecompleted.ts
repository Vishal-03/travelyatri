"use server"
import { ApiResponseType } from "@/models/responnse";
import prisma from "../../../prisma/database";
import { errorToString } from "@/utils/methods";
import { user } from "@prisma/client";

export interface userProfileComplete {
    user: boolean;
    agency: boolean;
}


type profileCompletedPayload = { userid: number };
export const profileCompleted = async (args: profileCompletedPayload): Promise<ApiResponseType<userProfileComplete | null>> => {
    try {

        let profileComplete: userProfileComplete = {
            user: false,
            agency: false,
        }

        const user: user | any = await prisma.user.findFirst({ where: { id: args.userid } });
        if (!user) return { status: false, data: null, message: "Invalid user id.Try Again", apiurl: "profileCompletedPayload" };

        if (user.name != null && user.email != null && user.contact != null && user.address != null) {
            profileComplete.user = true;
        }
        if (user.agencyId != null) {
            profileComplete.agency = true;
        }

        return { status: true, data: profileComplete, message: "User profile data get successfully", apiurl: "profileCompletedPayload" };
    } catch (e) {
        const response: ApiResponseType<null> = { status: false, data: null, message: errorToString(e), apiurl: "profileCompletedPayload", };
        return response;
    }
}