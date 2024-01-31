"use server"
import { ApiResponseType } from "@/models/responnse";
import prisma from "../../../prisma/database";
import { errorToString } from "@/utils/methods";
import { Status, agency, user } from "@prisma/client";
import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";


const ensureDirectory = async (dir: string) => {
    await mkdir(dir, { recursive: true });
};

type createAgencyPayload = {
    logo: string
    banner: string
    name: string,
    website: string,
    email: string,
    contact: string,
    address: string,
    description: string,
};

export const createAgency = async (args: createAgencyPayload): Promise<ApiResponseType<agency | null>> => {
    try {


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
            }
        });

        if (!createdagencyuser) return { status: false, data: null, message: "Something want wrong unable to create agency.", apiurl: "createAgency" };
        return { status: true, data: createdagencyuser, message: "Agency created successfully", apiurl: "createAgency" };

    } catch (e) {
        const response: ApiResponseType<null> = { status: false, data: null, message: errorToString(e), apiurl: "createAgency", };
        return response;
    }
}

type updateagencyPayload = {
    id: number,
    name: string,
    arrayBuffer: string,
};

export const uploadagencyLogo = async (args: updateagencyPayload): Promise<ApiResponseType<string | null>> => {
    try {
        const buffer = Buffer.from(args.arrayBuffer, "base64");
        const file_dir = process.cwd() + `/upload/agency/${args.id}/avatar`;
        const file_path = `${file_dir}/${args.id}.${args.name.split(".").pop()}`
        await ensureDirectory(file_dir);
        await writeFile(file_path, buffer);
        return {
            status: true,
            data: `/upload/agency/${args.id}/avatar/${args.id}.${args.name.split(".").pop()}`,
            message: "Image uploaded",
            apiurl: "uploadagencyAvatar",
        };
    } catch (e) {
        return { status: false, data: null, message: errorToString(e), apiurl: "uploadagencyAvatar", };
    }
}