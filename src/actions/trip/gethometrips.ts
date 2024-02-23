"use server";

import { ApiResponseType } from "@/models/responnse";
import { errorToString } from "@/utils/methods";
import prisma from "../../../prisma/database";
import { ShowHome, trips } from "@prisma/client";
import { time } from "console";

type getHomeTripsPayload = {};

export const getHomeTrips = async (
  args: getHomeTripsPayload
): Promise<ApiResponseType<trips[] | null>> => {
  try {
    const trips: trips[] = await prisma.trips.findMany({
      where: { showhome: ShowHome.YES },
      include: { agency: true, trips_images: true },
    });
    console.log(trips);
    if (!trips) {
      return {
        status: false,
        data: null,
        message: "Something want wrong unable to get contact.",
        apiurl: "getHomeTrips",
      };
    }
    return {
      status: true,
      data: trips,
      message: "From get successfully",
      apiurl: "getHomeTrips",
    };
  } catch (e) {
    const response: ApiResponseType<null> = {
      status: false,
      data: null,
      message: errorToString(e),
      apiurl: "getHomeTrips",
    };
    return response;
  }
};
