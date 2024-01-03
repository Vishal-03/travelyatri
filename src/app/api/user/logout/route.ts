import { ApiResponseType } from "@/models/responnse";
import { NextRequest, NextResponse } from "next/server";
import { errorToString } from "@/utils/methods";
import { cookies } from 'next/headers'



export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        cookies().delete("user");
        const response: ApiResponseType = { status: true, data: {}, message: "User logout successfully", apiurl: request.url, };
        return NextResponse.json(response);

    } catch (e) {
        const response: ApiResponseType = { status: false, data: {}, message: errorToString(e), apiurl: request.url };
        return NextResponse.json(response);
    }


}