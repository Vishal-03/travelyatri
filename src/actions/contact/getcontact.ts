"use server";
import { ApiResponseType } from "@/models/responnse";
import { errorToString } from "@/utils/methods";
import prisma from "../../../prisma/database";
import { contact } from "@prisma/client";

type getContactPayload = {};

export const getContact = async (
  args: getContactPayload
): Promise<ApiResponseType<contact[] | null>> => {
  try {
    const contact: contact[] = await prisma.contact.findMany({});
    if (!contact) {
      return {
        status: false,
        data: null,
        message: "Something want wrong unable to get contact.",
        apiurl: "getContact",
      };
    }

    return {
      status: true,
      data: contact,
      message: "From get successfully",
      apiurl: "getContact",
    };
  } catch (e) {
    const response: ApiResponseType<null> = {
      status: false,
      data: null,
      message: errorToString(e),
      apiurl: "getContact",
    };
    return response;
  }
};
