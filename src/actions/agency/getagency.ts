"use server";
import { ApiResponseType } from "@/models/responnse";
import { errorToString } from "@/utils/methods";
import prisma from "../../../prisma/database";
import { agency } from "@prisma/client";

type getAgencyPayload = {};

export const getAgency = async (
  args: getAgencyPayload
): Promise<ApiResponseType<agency[] | null>> => {
  try {
    const agencys: agency[] = await prisma.agency.findMany({
      include: { trips: true, user: true },
    });
    if (!agencys) {
      return {
        status: false,
        data: null,
        message: "Something want wrong unable to get contact.",
        apiurl: "getAgency",
      };
    }

    return {
      status: true,
      data: agencys,
      message: "Agency get successfully",
      apiurl: "getAgency",
    };
  } catch (e) {
    const response: ApiResponseType<null> = {
      status: false,
      data: null,
      message: errorToString(e),
      apiurl: "getAgency",
    };
    return response;
  }
};
