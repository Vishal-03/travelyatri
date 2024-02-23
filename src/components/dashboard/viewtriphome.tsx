"use client";
import { Card, Image } from "@nextui-org/react";

import Slider from "react-slick";
import {
  MaterialSymbolsArrowBackIos,
  MaterialSymbolsArrowForwardIosRounded,
} from "../icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Link from "next/link";

interface TripProps {
  trip: any;
}
const ViewTripsHome = (props: TripProps) => {
  const start_date = new Date(props.trip?.start!);
  const start = `${start_date.getDate()}-${
    start_date.getMonth() + 1
  }-${start_date.getFullYear()}`;
  const end_date = new Date(props.trip?.end!);
  const end = `${end_date.getDate()}-${
    end_date.getMonth() + 1
  }-${end_date.getFullYear()}`;

  var tsettings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <MaterialSymbolsArrowBackIos className="text-black text-xl" />,
    nextArrow: (
      <MaterialSymbolsArrowForwardIosRounded className="text-black text-xl" />
    ),
    centerMode: true,
  };
  var tsettings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <MaterialSymbolsArrowBackIos className="text-black text-xl" />,
    nextArrow: (
      <MaterialSymbolsArrowForwardIosRounded className="text-black text-xl" />
    ),
    centerMode: true,
  };
  var tsettings3 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <MaterialSymbolsArrowBackIos className="text-black text-xl" />,
    nextArrow: (
      <MaterialSymbolsArrowForwardIosRounded className="text-black text-xl" />
    ),
  };

  return (
    <>
      <div className="p-6">
        {props.trip?.trips_images.length > 0 && (
          <div className="w-full bg-white shadow-xl rounded-xl p-4 mt-4 mb-4">
            <h1 className="text-2xl mb-4 font-semibold text-center">Gallery</h1>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-5xl mx-auto mt-4 relative"
            >
              <CarouselContent className="relative">
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 grid place-items-center">
                    <Image
                      removeWrapper
                      alt="error"
                      src={props.trip.image!}
                      className="w-60 h-60  rounded-lg object-cover object-center"
                    />
                  </div>
                </CarouselItem>

                {Array.from({ length: props.trip?.trips_images.length }).map(
                  (_, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1 grid place-items-center">
                        <Image
                          removeWrapper
                          alt="error"
                          src={props.trip?.trips_images[index].image}
                          className="w-60 h-60 rounded-lg object-cover object-center"
                        />
                      </div>
                    </CarouselItem>
                  )
                )}
              </CarouselContent>
              <div className="absolute right-0 top-0 -translate-x-10 -translate-y-8">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        )}
        <div className="w-full bg-white shadow-xl rounded-xl p-4 flex flex-col md:flex-row gap-4">
          <div className="grow flex flex-col">
            <h1 className="text-black font-semibold text-2xl">
              {props.trip?.name}
            </h1>
            <div className=" mt-2 mb-4">
              <p>{props.trip?.description}</p>
            </div>
            <div className="grow"></div>
            <div className="flex bg-blue-500 p-2 rounded-lg bg-opacity-20 gap-2 mt-4 md:m-0  ">
              <Image
                alt="error"
                src={props.trip.create.agency.logo}
                className="w-14 h-14 rounded-lg object-cover object-center"
              />
              <div>
                <p className="text-black text-xl font-semibold">
                  {props.trip.create.agency.name}
                </p>
                {/* <p className="text-black">{props.trip.create.agency.contact}</p> */}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white shadow-xl rounded-xl p-4 flex gap-4 mt-4 flex-wrap justify-between px-6">
          <div className="mx-4">
            <h1 className="text-center font-normal text-sm">Start Time</h1>
            <p className="text-center font-semibold text-lg">{start}</p>
          </div>
          <div className="mx-4">
            <h1 className="text-center font-normal text-sm">End Time</h1>
            <p className="text-center font-semibold text-lg">{end}</p>
          </div>
          <div className="mx-4">
            <h1 className="text-center font-normal text-sm">Price</h1>
            <p className="text-center font-semibold text-lg">
              {props.trip?.price}
            </p>
          </div>
          <div className="mx-4">
            <h1 className="text-center font-normal text-sm">Available Seat</h1>
            <p className="text-center font-semibold text-lg">
              {props.trip?.number_of_people}
            </p>
          </div>
          <div className="mx-4">
            <h1 className="text-center font-normal text-sm">Trip Category</h1>
            <p className="text-center font-semibold text-lg">
              {props.trip?.category}
            </p>
          </div>
          <div className="mx-4">
            <h1 className="text-center font-normal text-sm">Trip Type</h1>
            <p className="text-center font-semibold text-lg">
              {props.trip?.trip_type}
            </p>
          </div>
        </div>
        <div className="w-full bg-white shadow-xl rounded-xl p-4 mt-4">
          <p className="text-lg font-normal">{props.trip?.location}</p>
          <p className="text-gray-500">{props.trip?.location_description}</p>
        </div>
        <div className="grid place-items-center mt-6">
          <Link
            href={"/login"}
            className="bg-blue-500 rounded-sm w-60 text-center py-1 text-white"
          >
            Book The Trip
          </Link>
        </div>
      </div>
    </>
  );
};
export default ViewTripsHome;
