"use server";
import { ApiResponseType } from "@/models/responnse";
import { errorToString } from "@/utils/methods";
import prisma from "../../../prisma/database";
import { trips } from "@prisma/client";

type getTripsPayload = {};

export const getTrips = async (
  args: getTripsPayload
): Promise<ApiResponseType<trips[] | null>> => {
  try {
    const trips: trips[] = await prisma.trips.findMany({
      include: { agency: true, trips_images: true },
    });
    if (!trips) {
      return {
        status: false,
        data: null,
        message: "Something want wrong unable to get trips.",
        apiurl: "getTrips",
      };
    }

    return {
      status: true,
      data: trips,
      message: "Trips get successfully",
      apiurl: "getTrips",
    };
  } catch (e) {
    const response: ApiResponseType<null> = {
      status: false,
      data: null,
      message: errorToString(e),
      apiurl: "getTrips",
    };
    return response;
  }
};
