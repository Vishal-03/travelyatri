import { ApiResponseType } from "@/models/responnse";
import { ByIdSchema } from "@/schemas/byid";
import { errorToString } from "@/utils/methods";
import { writeFile } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { safeParse } from "valibot";

export async function POST(request: NextRequest): Promise<NextResponse> {  
    try {
        
        const data = await request.formData();
        const result = safeParse(ByIdSchema, data.get("id"));

        if (result.success) {
            const file: File | null = data.get("file") as unknown as File;
            if (!file) {
                const response: ApiResponseType<null> = { status: false, data: null, message: "File is required", apiurl: request.url };
                return NextResponse.json(response);
            }

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const path = join(`/uploads/trips/images/${result.output.id}`, file.name);

            await writeFile(path, buffer, (err) => {
                if (err) {
                    const response: ApiResponseType<null> = { status: false, data: null, message: errorToString(err), apiurl: request.url };
                    return NextResponse.json(response);
                }
            });


            const response: ApiResponseType<null> = { status: false, data: null, message: "some data", apiurl: request.url };
            return NextResponse.json(response);
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