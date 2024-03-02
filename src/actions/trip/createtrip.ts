"use server";
import { ApiResponseType } from "@/models/responnse";
import { errorToString } from "@/utils/methods";
import {
  TripCategory,
  TripType,
  trips,
  trips_images,
  user,
} from "@prisma/client";
import prisma from "../../../prisma/database";
import { mkdir, writeFile } from "fs/promises";

const ensureDirectory = async (dir: string) => {
  await mkdir(dir, { recursive: true });
};

type createTripsPayload = {
  name: string;
  start: Date;
  end: Date;
  image: string;
  price: number;
  category: TripCategory;
  trip_type: TripType;
  description: string;
  number_of_people: number;
  createdBy: number;
  location: string[];
  dayinfo: string[];
  inclusion: string[];
  exclusion: string[];
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
        start: args.start,
        end: args.end,
        image: args.image,
        price: args.price,
        category: args.category,
        trip_type: args.trip_type,
        description: args.description,
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

    await prisma.trip_location.createMany({
      data: args.location.map((name: string) => ({
        location: name,
        tripId: trip.id,
      })),
    });

    await prisma.day_info.createMany({
      data: args.dayinfo.map((info: string, index: number) => ({
        description: info,
        day: `Day ${index + 1}`,
        tripId: trip.id,
      })),
    });

    await prisma.exclusion.createMany({
      data: args.exclusion.map((info: string) => ({
        name: info,
        tripId: trip.id,
      })),
    });

    await prisma.inclusion.createMany({
      data: args.inclusion.map((info: string) => ({
        name: info,
        tripId: trip.id,
      })),
    });

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

export const uploadtripImage = async (
  args: updatetriplogoPayload
): Promise<ApiResponseType<string | null>> => {
  try {
    const file_name = `${new Date().getTime()}_image.${args.name
      .split(".")
      .pop()}`;
    const buffer = Buffer.from(args.arrayBuffer, "base64");
    const file_dir = process.cwd() + `/upload/trips/image`;
    const file_path = `${file_dir}/${file_name}`;
    await ensureDirectory(file_dir);
    await writeFile(file_path, buffer);
    return {
      status: true,
      data: `/upload/trips/image/${file_name}`,
      message: "Image uploaded",
      apiurl: "uploadtripImage",
    };
  } catch (e) {
    return {
      status: false,
      data: null,
      message: errorToString(e),
      apiurl: "uploadtripImage",
    };
  }
};

type uploadTripsPayload = {
  path: string;
  id: number;
};

export const uploadimageTrip = async (
  args: uploadTripsPayload
): Promise<ApiResponseType<trips_images | null>> => {
  try {
    const tripfound = await prisma.trips.findUnique({
      where: { id: args.id },
      include: { agency: true },
    });
    if (!tripfound)
      return {
        status: false,
        data: null,
        message: "Trips User not found",
        apiurl: "uploadimageTrip",
      };

    const tripimage: trips_images = await prisma.trips_images.create({
      data: {
        tripId: args.id,
        image: args.path,
      },
    });

    if (!tripimage)
      return {
        status: false,
        data: null,
        message: "Something want wrong unable to upload trip image.",
        apiurl: "uploadimageTrip",
      };

    return {
      status: true,
      data: tripimage,
      message: "Trip image added successfully",
      apiurl: "uploadimageTrip",
    };
  } catch (e) {
    const response: ApiResponseType<null> = {
      status: false,
      data: null,
      message: errorToString(e),
      apiurl: "uploadimageTrip",
    };
    return response;
  }
};
