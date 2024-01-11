import { ApiResponseType } from "@/models/responnse";
import { ByIdSchema } from "@/schemas/byid";
import { errorToString } from "@/utils/methods";
import { user } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { safeParse } from "valibot";
import { database } from "../../../../prisma/database";
import url from "url";
import { cp } from "fs";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const result = safeParse(ByIdSchema, data);

        if (result.success) {
            const user: user | null = await database.user.findFirst({
                where: {
                    id: result.output.id,
                }
            });

            if (user) {
                const response: ApiResponseType<user> = { status: true, data: user, message: "User data get  successfully", apiurl: request.url, };
                return NextResponse.json(response);
            } else {
                const response: ApiResponseType<null> = { status: false, data: null, message: "Invalid email or password.Try Again", apiurl: request.url, };
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