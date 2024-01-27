import { ApiResponseType } from "@/models/responnse";
import { ByIdSchema } from "@/schemas/byid";
import { user } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { safeParse } from "valibot";
import prisma from "../../../../../prisma/database";
import { errorToString } from "@/utils/methods";
interface userProfileComplete {
    user: boolean;
    agency: boolean;

}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const result = safeParse(ByIdSchema, data);

        if (result.success) {
            const user: user | null = await prisma.user.findFirst({
                where: {
                    id: result.output.id,
                }
            });

            if (user) {

                let profileComplete: userProfileComplete = {
                    user: false,
                    agency: false,
                }
                if (user.name != null && user.email != null && user.contact != null && user.address != null) {
                    profileComplete.user = true;
                }

                if (user.agencyId != null) {
                    profileComplete.agency = true;
                }

                const response: ApiResponseType<userProfileComplete> = { status: true, data: profileComplete, message: "User Profile complete data.", apiurl: request.url, };
                return NextResponse.json(response);

            } else {
                const response: ApiResponseType<null> = { status: false, data: null, message: "Invalid user id. Try Again", apiurl: request.url, };
                return NextResponse.json(response);
            }
        } else {
            let errorMessage = "";
            if (result.issues[0].input) {
                errorMessage = result.issues[0].message;
            } else {
                errorMessage = result.issues[0].path![0].key + " is required";
            }
            const response: ApiResponseType<null> = { status: false, data: null, message: errorMessage, apiurl: request.url, };
            return NextResponse.json(response);
        }

    } catch (e) {
        const response: ApiResponseType<null> = { status: false, data: null, message: errorToString(e), apiurl: request.url };
        return NextResponse.json(response);
    }

}