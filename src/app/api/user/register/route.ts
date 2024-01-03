import { ApiResponseType } from "@/models/responnse";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, user } from "@prisma/client";
import { errorToString } from "@/utils/methods";
import { safeParse } from "valibot";
import { RegisterSchema } from "@/schemas/register";
import { cookies } from 'next/headers'
import md5 from "md5";

export async function POST(request: NextRequest): Promise<NextResponse> {

    try {
        const body = await request.json();

        const result = safeParse(RegisterSchema, body);

        if (result.success) {

            const prisma = new PrismaClient();

            const alreadyexist = await prisma.user.findUnique({ where: { email: result.output.email } });
            if (alreadyexist) {
                const response: ApiResponseType = { status: false, data: {}, message: "Email already exist. Try a difrent email.", apiurl: request.url, };
                return NextResponse.json(response);
            }
            const password = md5(result.output.password);

            const user: user = await prisma.user.create({
                data: {
                    email: result.output.email,
                    password: password,
                }
            });
            await prisma.$disconnect();
            if (user) {
                cookies().set({ name: "user", value: JSON.stringify({ id: user.id, role: user.role }) });
                const response: ApiResponseType = { status: true, data: user, message: "User register successfully", apiurl: request.url, };
                return NextResponse.json(response);
            } else {
                const response: ApiResponseType = { status: false, data: user, message: "Something want wrong. Unable to create user.", apiurl: request.url, };
                return NextResponse.json(response);
            }

        } else {
            let errorMessage = "";
            if (result.issues[0].input) {
                errorMessage = result.issues[0].message;
            } else {
                errorMessage = result.issues[0].path![0].key + " is required";
            }
            const response: ApiResponseType = { status: false, data: {}, message: errorMessage, apiurl: request.url, };
            return NextResponse.json(response);
        }
    } catch (e) {
        const response: ApiResponseType = { status: false, data: {}, message: errorToString(e), apiurl: request.url };
        return NextResponse.json(response);
    }


}