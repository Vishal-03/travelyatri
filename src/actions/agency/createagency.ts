"use server";
import { ApiResponseType } from "@/models/responnse";
import prisma from "../../../prisma/database";
import { errorToString } from "@/utils/methods";
import { agency } from "@prisma/client";
import { mkdir, writeFile } from "fs/promises";

const ensureDirectory = async (dir: string) => {
  await mkdir(dir, { recursive: true });
};

type createAgencyPayload = {
  id: number;
  logo: string;
  banner: string;
  name: string;
  website: string;
  email: string;
  contact: string;
  address: string;
  description: string;
  aadhar: string;
  aadharurl: string;
  pan: string;
  panurl: string;
};

export const createAgency = async (
  args: createAgencyPayload
): Promise<ApiResponseType<agency | null>> => {
  try {
    const user = await prisma.user.findFirst({ where: { id: args.id } });
    if (!user)
      return {
        status: false,
        data: null,
        message: "Invalid user id.Try Again",
        apiurl: "createAgency",
      };

    const agencyuser = await prisma.agency.findFirst({
      where: { email: args.email },
    });
    if (agencyuser)
      return {
        status: false,
        data: null,
        message: "Email already exist.Try Again",
        apiurl: "createAgency",
      };

    const createdagencyuser: agency | null = await prisma.agency.create({
      data: {
        name: args.name,
        email: args.email,
        contact: args.contact,
        logo: args.logo,
        banner: args.banner,
        website: args.website,
        address: args.address,
        description: args.description,
        aadhar: args.aadhar,
        aadharurl: args.aadharurl,
        pan: args.pan,
        panurl: args.panurl,
      },
    });

    if (!createdagencyuser)
      return {
        status: false,
        data: null,
        message: "Something want wrong unable to create agency.",
        apiurl: "createAgency",
      };

    const updateduser = await prisma.user.update({
      where: { id: user.id },
      data: {
        agencyId: createdagencyuser.id,
      },
    });

    if (!updateduser)
      return {
        status: false,
        data: null,
        message: "Something want wrong unable to update user.",
        apiurl: "createAgency",
      };
    return {
      status: true,
      data: createdagencyuser,
      message: "Agency created successfully",
      apiurl: "createAgency",
    };
  } catch (e) {
    const response: ApiResponseType<null> = {
      status: false,
      data: null,
      message: errorToString(e),
      apiurl: "createAgency",
    };
    return response;
  }
};

type updateagencyPayload = {
  name: string;
  arrayBuffer: string;
};

export const uploadagencyLogo = async (
  args: updateagencyPayload
): Promise<ApiResponseType<string | null>> => {
  try {
    const file_name = `${new Date().getTime()}_logo.${args.name
      .split(".")
      .pop()}`;
    const buffer = Buffer.from(args.arrayBuffer, "base64");
    const file_dir = process.cwd() + `/upload/agency/logo`;
    const file_path = `${file_dir}/${file_name}`;
    await ensureDirectory(file_dir);
    await writeFile(file_path, buffer);
    return {
      status: true,
      data: `/upload/agency/logo/${file_name}`,
      message: "Image uploaded",
      apiurl: "uploadagencyLogo",
    };
  } catch (e) {
    return {
      status: false,
      data: null,
      message: errorToString(e),
      apiurl: "uploadagencyLogo",
    };
  }
};

export const uploadagencyBanner = async (
  args: updateagencyPayload
): Promise<ApiResponseType<string | null>> => {
  try {
    const file_name = `${new Date().getTime()}_banner.${args.name
      .split(".")
      .pop()}`;
    const buffer = Buffer.from(args.arrayBuffer, "base64");
    const file_dir = process.cwd() + `/upload/agency/banner`;
    const file_path = `${file_dir}/${file_name}`;
    await ensureDirectory(file_dir);
    await writeFile(file_path, buffer);
    return {
      status: true,
      data: `/upload/agency/banner/${file_name}`,
      message: "Image uploaded",
      apiurl: "uploadagencyBanner",
    };
  } catch (e) {
    return {
      status: false,
      data: null,
      message: errorToString(e),
      apiurl: "uploadagencyBanner",
    };
  }
};

export const uploadaadhar = async (
  args: updateagencyPayload
): Promise<ApiResponseType<string | null>> => {
  try {
    const file_name = `${new Date().getTime()}_aadhar.${args.name
      .split(".")
      .pop()}`;
    const buffer = Buffer.from(args.arrayBuffer, "base64");
    const file_dir = process.cwd() + `/upload/agency/aadhar`;
    const file_path = `${file_dir}/${file_name}`;
    await ensureDirectory(file_dir);
    await writeFile(file_path, buffer);
    return {
      status: true,
      data: `/upload/agency/aadhar/${file_name}`,
      message: "Image uploaded",
      apiurl: "uploadaadhar",
    };
  } catch (e) {
    return {
      status: false,
      data: null,
      message: errorToString(e),
      apiurl: "uploadaadhar",
    };
  }
};

export const uploadpan = async (
  args: updateagencyPayload
): Promise<ApiResponseType<string | null>> => {
  try {
    const file_name = `${new Date().getTime()}_pan.${args.name
      .split(".")
      .pop()}`;
    const buffer = Buffer.from(args.arrayBuffer, "base64");
    const file_dir = process.cwd() + `/upload/agency/pan`;
    const file_path = `${file_dir}/${file_name}`;
    await ensureDirectory(file_dir);
    await writeFile(file_path, buffer);
    return {
      status: true,
      data: `/upload/agency/pan/${file_name}`,
      message: "Image uploaded",
      apiurl: "uploadpan",
    };
  } catch (e) {
    return {
      status: false,
      data: null,
      message: errorToString(e),
      apiurl: "uploadpan",
    };
  }
};
