"use server";
import { ApiResponseType } from "@/models/responnse";
import { errorToString } from "@/utils/methods";
import prisma from "../../../prisma/database";
import { trips } from "@prisma/client";

type getTripsByIdPayload = {
  id: number;
};

export const getTripsById = async (
  args: getTripsByIdPayload
): Promise<ApiResponseType<trips[] | null>> => {
  try {
    const trips: trips[] = await prisma.trips.findMany({
      where: { createdBy: args.id },
      include: { agency: true, trips_images: true },
    });
    if (!trips) {
      return {
        status: false,
        data: null,
        message: "Something want wrong unable to get trips.",
        apiurl: "getTripsById",
      };
    }

    return {
      status: true,
      data: trips,
      message: "Trips get successfully",
      apiurl: "getTripsById",
    };
  } catch (e) {
    const response: ApiResponseType<null> = {
      status: false,
      data: null,
      message: errorToString(e),
      apiurl: "getTripsById",
    };
    return response;
  }
};
