import { ApiResponseType } from "@/models/responnse";
import { NextRequest, NextResponse } from "next/server";
import { user } from "@prisma/client";
import { errorToString } from "@/utils/methods";
import { safeParse } from "valibot";
import prisma from "../../../../../prisma/database";
import { compare, hash } from "bcrypt";
import { UserProfileUpdateSchema } from "@/schemas/userprofileupdate";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body = await request.json();

        const result = safeParse(UserProfileUpdateSchema, body);

        if (result.success) {
            const user: user | null = await prisma.user.findFirst({
                where: {
                    email: result.output.email
                }
            });
            if (user) {
                const newUser = await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        name: result.output.name,
                        contact: result.output.contact,
                        secondcontact: result.output.secondcontact,
                        address: result.output.address
                    }
                });

                if (newUser) {
                    const response: ApiResponseType<null> = { status: true, data: null, message: "Password Changed Successfully", apiurl: request.url, };
                    return NextResponse.json(response);
                } else {
                    const response: ApiResponseType<null> = { status: false, data: null, message: "Unable to change password", apiurl: request.url, };
                    return NextResponse.json(response);
                }




            } else {
                const response: ApiResponseType<null> = { status: false, data: null, message: "Unable to find the user", apiurl: request.url, };
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