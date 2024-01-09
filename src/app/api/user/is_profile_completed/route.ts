import { ApiResponseType } from "@/models/responnse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const body = await request.json();

    console.log(body);
    const response: ApiResponseType<null> = { status: false, data: null, message: "just an error message", apiurl: request.url, };
    return NextResponse.json(response);
}