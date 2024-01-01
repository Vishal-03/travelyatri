import { ApiResponseType } from "@/models/responnse";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, user } from "@prisma/client";
import { errorToString, hashPassword } from "@/utils/methods";
import { safeParse } from "valibot";
import { RegisterSchema } from "@/schemas/register";
import { cookies } from 'next/headers'

export async function POST(request: NextRequest): Promise<NextResponse> {

    try {
        const body = await request.json();

        const result = safeParse(RegisterSchema, body);

        if (result.success) {

            const prisma = new PrismaClient();

            const alreadyexist = await prisma.user.findUnique({ where: { username: result.output.username } });
            if (alreadyexist) {
                const response: ApiResponseType = { status: false, data: {}, message: "Username already exist. Try a difrent username.", apiurl: request.url, };
                return NextResponse.json(response);
            }
            const password = await hashPassword(result.output.password);

            const user: user = await prisma.user.create({
                data: {
                    email: result.output.email,
                    password: password,
                    username: result.output.username,
                }
            });

            cookies().set({ name: "user", value: JSON.stringify({ username: user.username, id: user.id, role: user.role }) });


            const response: ApiResponseType = { status: true, data: user, message: "User register successfully", apiurl: request.url, };
            return NextResponse.json(response);

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