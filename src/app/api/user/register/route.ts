import { ApiResponseType } from "@/models/responnse";
import { NextRequest, NextResponse } from "next/server";
import { Role, user } from "@prisma/client";
import { errorToString } from "@/utils/methods";
import { safeParse } from "valibot";
import { RegisterSchema } from "@/schemas/register";
import { cookies } from 'next/headers'
import md5 from "md5";
import { database } from "../../../../../prisma/database";

export async function POST(request: NextRequest): Promise<NextResponse> {

    try {
        const body = await request.json();

        const result = safeParse(RegisterSchema, body);

        if (result.success) {


            const alreadyexist = await database.user.findUnique({ where: { email: result.output.email } });
            if (alreadyexist) {
                const response: ApiResponseType<null> = { status: false, data: null, message: "Email already exist. Try a difrent email.", apiurl: request.url, };
                return NextResponse.json(response);
            }
            const password = md5(result.output.password);

            const user: user = await database.user.create({
                data: {
                    email: result.output.email,
                    password: password,
                    role: result.output.role as unknown as Role
                }
            });
            if (user) {
                cookies().set({ name: "user", value: JSON.stringify({ id: user.id, role: user.role }) });
                const response: ApiResponseType<user> = { status: true, data: user, message: "User register successfully", apiurl: request.url, };
                return NextResponse.json(response);
            } else {
                const response: ApiResponseType<null> = { status: false, data: null, message: "Something want wrong. Unable to create user.", apiurl: request.url, };
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