import { ApiResponseType } from "@/models/responnse";
import { NextRequest, NextResponse } from "next/server";
import { errorToString } from "@/utils/methods";
import { cookies } from 'next/headers'



export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        cookies().delete("user");
        const response: ApiResponseType<null> = { status: true, data: null, message: "User logout successfully", apiurl: request.url, };
        return NextResponse.json(response);

    } catch (e) {
        const response: ApiResponseType<null> = { status: false, data: null, message: errorToString(e), apiurl: request.url };
        return NextResponse.json(response);
    }


}