"use server";
import { ApiResponseType } from "@/models/responnse";
import { errorToString } from "@/utils/methods";
import prisma from "../../../prisma/database";
import { contact } from "@prisma/client";

type createContactPayload = {
  name: string;
  mobile: string;
  email: string;
  message: string;
};

export const createContact = async (
  args: createContactPayload
): Promise<ApiResponseType<contact | null>> => {
  try {
    const contact: contact = await prisma.contact.create({
      data: {
        name: args.name,
        contact: args.mobile,
        email: args.email,
        message: args.message,
      },
    });
    if (!contact) {
      return {
        status: false,
        data: null,
        message: "Something want wrong unable to create contact.",
        apiurl: "createContact",
      };
    }

    return {
      status: true,
      data: contact,
      message: "From submitted successfully",
      apiurl: "createContact",
    };
  } catch (e) {
    const response: ApiResponseType<null> = {
      status: false,
      data: null,
      message: errorToString(e),
      apiurl: "createContact",
    };
    return response;
  }
};
