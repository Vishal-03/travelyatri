import { ApiResponseType } from "@/models/responnse";
import { NextRequest, NextResponse } from "next/server";
import { errorToString } from "@/utils/methods";
import { safeParse } from "valibot";
import prisma from "../../../../../prisma/database";
import { createAgencySchema } from "@/schemas/createagency";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body = await request.json();

        const result = safeParse(createAgencySchema, body);

        if (result.success) {

            const userdata = await prisma.user.findFirst({ where: { id: result.output.userId } });
            if (userdata) {

                const newAgency = await prisma.agency.create({
                    data: {
                        name: result.output.name,
                        website: result.output.website,
                        email: result.output.email,
                        contact: result.output.contact,
                        description: result.output.address
                    }
                });
                if (newAgency) {
                    const updateduser = await prisma.user.update({
                        where: { id: userdata.id },
                        data: {
                            agencyId: newAgency.id
                        }
                    });
                    if (updateduser) {
                        const response: ApiResponseType<null> = { status: true, data: null, message: "New agency Created", apiurl: request.url, };
                        return NextResponse.json(response);
                    } else {
                        const response: ApiResponseType<null> = { status: false, data: null, message: "Unable to update user", apiurl: request.url, };
                        return NextResponse.json(response);
                    }
                } else {
                    const response: ApiResponseType<null> = { status: false, data: null, message: "Unable to create new agency", apiurl: request.url, };
                    return NextResponse.json(response);
                }
            } else {
                const response: ApiResponseType<null> = { status: false, data: null, message: "User not found", apiurl: request.url, };
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
        console.log(e);
        const response: ApiResponseType<null> = { status: false, data: null, message: errorToString(e), apiurl: request.url };
        return NextResponse.json(response);
    }
}