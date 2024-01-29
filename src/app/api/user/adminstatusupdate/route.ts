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
                const updated_user = await prisma.user.update({
                    where: { id: user.id },
                    data: { status: user.status == "ADMINACTIVE" ? "ACTIVE" : "ADMINACTIVE" }
                });

                if (updated_user) {
                    const response: ApiResponseType<user> = { status: true, data: updated_user, message: "User status updated successfully.", apiurl: request.url, };
                    return NextResponse.json(response);
                } else {
                    const response: ApiResponseType<null> = { status: false, data: null, message: "Unable to update user something want wrong.", apiurl: request.url, };
                    return NextResponse.json(response);
                }

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