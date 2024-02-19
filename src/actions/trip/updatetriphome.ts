"use server";
import { ApiResponseType } from "@/models/responnse";
import { errorToString } from "@/utils/methods";
import prisma from "../../../prisma/database";
import { ShowHome, trips } from "@prisma/client";

type UpdateTripHomePayload = {
  id: number;
  status: ShowHome;
};

export const tripsHomeUpdate = async (
  args: UpdateTripHomePayload
): Promise<ApiResponseType<trips | null>> => {
  try {
    const trips: trips = await prisma.trips.update({
      where: { id: args.id },
      data: {
        showhome: args.status,
      },
    });
    if (!trips) {
      return {
        status: false,
        data: null,
        message: "Something want wrong unable to update.",
        apiurl: "tripsHomeUpdate",
      };
    }

    return {
      status: true,
      data: trips,
      message: "Update completed successfully",
      apiurl: "tripsHomeUpdate",
    };
  } catch (e) {
    const response: ApiResponseType<null> = {
      status: false,
      data: null,
      message: errorToString(e),
      apiurl: "tripsHomeUpdate",
    };
    return response;
  }
};
