import { ApiResponseType } from "@/models/responnse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    const response: ApiResponseType = { status: true, data: { "one": "one", "two": "two" }, message: "Test api", apiurl: request.url, };
    return NextResponse.json(response);
}