"use server"
import { ApiResponseType } from "@/models/responnse";
import prisma from "../../../prisma/database";
import { errorToString } from "@/utils/methods";
import { Status, user } from "@prisma/client";
import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";


const ensureDirectory = async (dir: string) => {
    await mkdir(dir, { recursive: true });
};


type updateUserPayload = {
    id: number,
    avatar?: string
    name?: string,
    email?: string,
    contact?: string,
    secondcontact?: string,
    address?: string,
    agencyId?: number,
    status?: Status,
};

export const updateUser = async (args: updateUserPayload): Promise<ApiResponseType<user | null>> => {
    try {
        const user: user | null = await prisma.user.findFirst({ where: { id: args.id } });
        if (!user) return { status: false, data: null, message: "Invalid user id.Try Again", apiurl: "getUser" };

        // dont update null value
        let data_to_update: { [key: string]: unknown } = {};
        if (args.avatar) data_to_update["avatar"] = args.avatar;
        if (args.name) data_to_update["name"] = args.name;
        if (args.email) data_to_update["email"] = args.email;
        if (args.contact) data_to_update["contact"] = args.contact;
        if (args.secondcontact) data_to_update["secondcontact"] = args.secondcontact;
        if (args.address) data_to_update["address"] = args.address;
        if (args.agencyId) data_to_update["agencyId"] = args.agencyId;
        if (args.status) data_to_update["status"] = args.status;


        const updateuser: user | null = await prisma.user.update({
            where: { id: args.id },
            data: data_to_update
        });

        if (!updateuser) return { status: false, data: null, message: "User not updated", apiurl: "getUser" };
        revalidatePath("/dashboard/profile")
        return { status: true, data: updateuser, message: "User updated successfully", apiurl: "getUser" };

    } catch (e) {
        const response: ApiResponseType<null> = { status: false, data: null, message: errorToString(e), apiurl: "getUser", };
        return response;
    }
}

type updateuserPayload = {
    id: number,
    name: string,
    arrayBuffer: string,
};

export const uploaduserAvatar = async (args: updateuserPayload): Promise<ApiResponseType<string | null>> => {
    try {
        const buffer = Buffer.from(args.arrayBuffer, "base64");
        const file_dir = process.cwd() + `/upload/user/${args.id}/avatar`;
        const file_path = `${file_dir}/${args.id}.${args.name.split(".").pop()}`
        await ensureDirectory(file_dir);
        await writeFile(file_path, buffer);
        return {
            status: true,
            data: `/upload/user/${args.id}/avatar/${args.id}.${args.name.split(".").pop()}`,
            message: "Image uploaded",
            apiurl: "uploaduserAvatar",
        };
    } catch (e) {
        return { status: false, data: null, message: errorToString(e), apiurl: "uploaduserAvatar", };
    }
}