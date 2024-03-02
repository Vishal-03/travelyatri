"use client";
import { Card, Image } from "@nextui-org/react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useState } from "react";

interface TripProps {
  trip: any;
}
const ViewTrips = (props: TripProps) => {
  const start_date = new Date(props.trip?.start!);
  const start = `${start_date.getDate()}-${
    start_date.getMonth() + 1
  }-${start_date.getFullYear()}`;
  const end_date = new Date(props.trip?.end!);
  const end = `${end_date.getDate()}-${
    end_date.getMonth() + 1
  }-${end_date.getFullYear()}`;

  const [isReadMoreOne, setIsReadMoreOne] = useState(true);
  const toggleReadMoreOne = () => {
    setIsReadMoreOne(!isReadMoreOne);
  };
  const [isReadMoreTwo, setIsReadMoreTwo] = useState(true);
  const toggleReadMoreTwo = () => {
    setIsReadMoreTwo(!isReadMoreTwo);
  };

  return (
    <>
      <div className="p-6">
        {props.trip?.trips_images.length > 0 && (
          <div className="w-full bg-white rounded-sm shadow-sm p-4">
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
        <div className="w-full bg-white rounded-sm shadow-sm p-4 mt-4">
          <div className="grow flex flex-col">
            <h1 className="text-black font-semibold text-2xl">
              {props.trip?.name}
            </h1>
            <div className=" mt-2 mb-4">
              {props.trip?.description.length > 100 ? (
                <p className="text-black">
                  {isReadMoreOne
                    ? props.trip?.description.slice(0, 100)
                    : props.trip?.description}
                  <span
                    onClick={toggleReadMoreOne}
                    className="text-blue-500 cursor-pointer"
                  >
                    {isReadMoreOne ? "...read more" : " show less"}
                  </span>
                </p>
              ) : (
                <p className="text-black">{props.trip?.description}</p>
              )}
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

        <div className="w-full bg-white rounded-sm shadow-sm p-4 mt-4 flex flex-wrap justify-around">
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
        <div className="w-full bg-white rounded-sm shadow-sm p-4 mt-4">
          <p className="text-lg font-normal">Locations</p>
          <div className="flex gap-4 flex-wrap">
            {props.trip.trip_location.map((val: any, index: number) => (
              <div
                key={index}
                className="py-2 text-black font-medium text-sm px-4 rounded-sm bg-gray-100"
              >
                {val.location}
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1">
              <p className="text-lg font-normal">Inclusion</p>
              <ul className="list-disc mx-6">
                {props.trip.inclusion.map((val: any, index: number) => (
                  <li className="text-sm" key={index}>
                    {index + 1}: {val.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <p className="text-lg font-normal">Exclusion</p>
              <ul className="list-disc mx-6">
                {props.trip.exclusion.map((val: any, index: number) => (
                  <li className="text-sm" key={index}>
                    {index + 1}: {val.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-lg font-normal mt-4">Day info</p>
          <ul className="list-disc mx-6">
            {props.trip.day_info.map((val: any, index: number) => (
              <li className="text-sm" key={index}>
                Day-{index + 1}: {val.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default ViewTrips;
