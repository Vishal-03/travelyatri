import { ApiResponseType } from "@/models/responnse";
import { NextRequest, NextResponse } from "next/server";
import { TripCategory, TripType, trips } from "@prisma/client";
import { errorToString } from "@/utils/methods";
import { safeParse } from "valibot";
import { TripSchema } from "@/schemas/createtrip";
import { database } from "../../../../../prisma/database";

export async function POST(request: NextRequest): Promise<NextResponse> {

    try {
        const body = await request.json();

        const result = safeParse(TripSchema, body);
        if (result.success) {
            const start_date = new Date(result.output.start_date).toISOString();
            const end_date = new Date(result.output.end_date).toISOString();
            const trips: trips = await database.trips.create({
                data: {
                    name: result.output.name,
                    description: result.output.description,
                    location: result.output.location,
                    location_description: result.output.location_description,
                    start: start_date,
                    end: end_date,
                    number_of_people: result.output.number_of_people,
                    number_of_days: result.output.number_of_days,
                    price: result.output.price,
                    trip_type: result.output.trip_type as unknown as TripType,
                    category: result.output.category as unknown as TripCategory,
                    createdBy: result.output.createdBy,
                    status: "ACTIVE"
                },
            });
            if (trips) {
                const response: ApiResponseType<trips> = { status: true, data: trips, message: "New trip created successfully", apiurl: request.url, };
                return NextResponse.json(response);
            } else {
                const response: ApiResponseType<null> = { status: false, data: null, message: "Something want wrong. Unable to create trip.", apiurl: request.url, };
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