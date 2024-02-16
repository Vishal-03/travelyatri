"use server";
import { ApiResponseType } from "@/models/responnse";
import { errorToString } from "@/utils/methods";
import { TripCategory, TripType, trips, user } from "@prisma/client";
import prisma from "../../../prisma/database";
import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";

const ensureDirectory = async (dir: string) => {
  await mkdir(dir, { recursive: true });
};

type createTripsPayload = {
  name: string;
  start: string;
  end: string;
  image: string;
  price: number;
  category: TripCategory;
  trip_type: TripType;
  description: string;
  location: string;
  location_description: string;
  number_of_people: number;
  createdBy: number;
};

export const createTrip = async (
  args: createTripsPayload
): Promise<ApiResponseType<trips | null>> => {
  try {
    const userfound = await prisma.user.findUnique({
      where: { id: args.createdBy },
      include: { agency: true },
    });
    if (!userfound)
      return {
        status: false,
        data: null,
        message: "User not found",
        apiurl: "createTrip",
      };

    const trip: trips = await prisma.trips.create({
      data: {
        name: args.name,
        start: new Date(args.start),
        end: new Date(args.end),
        image: args.image,
        price: args.price,
        category: args.category,
        trip_type: args.trip_type,
        description: args.description,
        location: args.location,
        location_description: args.location_description,
        number_of_people: args.number_of_people,
        createdBy: userfound.id,
        agencyId: userfound!.agency!.id,
        status: "ACTIVE",
      },
    });

    if (!trip)
      return {
        status: false,
        data: null,
        message: "Something want wrong unable to create trip.",
        apiurl: "createTrip",
      };
    revalidatePath("/dashboard/trips");
    return {
      status: true,
      data: trip,
      message: "Trip created successfully",
      apiurl: "createTrip",
    };
  } catch (e) {
    const response: ApiResponseType<null> = {
      status: false,
      data: null,
      message: errorToString(e),
      apiurl: "createTrip",
    };
    return response;
  }
};

type updatetriplogoPayload = {
  name: string;
  arrayBuffer: string;
};

export const uploadtripLogo = async (
  args: updatetriplogoPayload
): Promise<ApiResponseType<string | null>> => {
  try {
    const file_name = `${new Date().getTime()}_logo.${args.name
      .split(".")
      .pop()}`;
    const buffer = Buffer.from(args.arrayBuffer, "base64");
    const file_dir = process.cwd() + `/upload/trips/logo`;
    const file_path = `${file_dir}/${file_name}`;
    await ensureDirectory(file_dir);
    await writeFile(file_path, buffer);
    return {
      status: true,
      data: `/upload/trips/logo/${file_name}`,
      message: "Image uploaded",
      apiurl: "uploadtripLogo",
    };
  } catch (e) {
    return {
      status: false,
      data: null,
      message: errorToString(e),
      apiurl: "uploadtripLogo",
    };
  }
};
