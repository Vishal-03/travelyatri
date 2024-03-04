"use client";

import TripCard from "../card/tripcard";
import { useEffect, useState } from "react";
import { trips } from "@prisma/client";
import { getTrips } from "@/actions/trip/gettrips";
import Slider from "react-slick";
import {
  MaterialSymbolsArrowBackIos,
  MaterialSymbolsArrowForwardIosRounded,
} from "../icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { getHomeTrips } from "@/actions/trip/gethometrips";
import { Card, Image } from "@nextui-org/react";

interface UserDashboardProps {}
const UserDashboard = (props: UserDashboardProps) => {
  const [isLoading, setIsLoding] = useState<boolean>(true);

  const [trips, setTrips] = useState<any[]>([]);
  const [alltrips, setAllTrips] = useState<trips[]>([]);

  const init = async () => {
    setIsLoding(true);
    const tripsres = await getHomeTrips({});
    if (tripsres.status) setTrips(tripsres.data!);
    const alltripsresponse = await getTrips({});
    if (alltripsresponse.status) setAllTrips(alltripsresponse.data!);

    setIsLoding(false);
  };
  useEffect(() => {
    init();
  }, []);

  var tsettings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <MaterialSymbolsArrowBackIos className="text-black text-xl" />,
    nextArrow: (
      <MaterialSymbolsArrowForwardIosRounded className="text-black text-xl" />
    ),
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

  if (isLoading)
    return (
      <div className="h-screen w-full grid place-items-center text-3xl text-gray-600 bg-gray-200">
        Loading...
      </div>
    );

  if (trips.length == 0) {
    return <></>;
  }

  return (
    <div className="w-full">
      <div className="relative h-full py-10" id="trips">
        <div className="text-2xl font-semibold text-center text-black font-title mb-4">
          Travel Yatri Trips
        </div>

        {trips.length > 2 ? (
          <>
            <div className="hidden md:block lg:hidden  p-4">
              <Slider {...tsettings2} className="w-11/12 md:5/6 lg:4/6">
                {trips.slice(0, 4).map((item: any, index: number) => (
                  <TripCard
                    key={index}
                    title={item.name!}
                    agency={item.agency!.name!}
                    price={item.price!.toString()}
                    type={item.trip_type!}
                    image={item.image!}
                    link={`/dashboard/trips/${item.id}`}
                  ></TripCard>
                ))}
              </Slider>
            </div>

            <div className="hidden lg:block  p-4">
              <Slider
                {...tsettings3}
                className="w-11/12 md:5/6 lg:4/6 mx-auto "
              >
                {trips.slice(0, 4).map((data: trips, index: number) => (
                  <PriceCard
                    key={index}
                    title={data.name!}
                    description={data.description!}
                    price={data.price}
                    link={data.id.toString()!}
                    image={data.image!}
                  />
                ))}
              </Slider>
            </div>

            <div className="md:hidden p-4">
              <Slider
                {...tsettings1}
                className="w-11/12 md:5/6 lg:4/6 mx-auto md:hidden"
              >
                {trips.slice(0, 4).map((data: trips, index: number) => (
                  <PriceCard
                    key={index}
                    title={data.name!}
                    description={data.description!}
                    price={data.price}
                    link={data.id.toString()!}
                    image={data.image!}
                  />
                ))}
              </Slider>
            </div>
          </>
        ) : (
          <>
            <div className="mt-4"></div>
            <div className="flex gap-4 justify-start">
              <TripCard
                title={trips[0].name!}
                agency={trips[0].agency.name!}
                price={trips[0].price!.toString()}
                type={trips[0].trip_type!}
                image={trips[0].image!}
                link={`/dashboard/trips/${trips[0].id}`}
              ></TripCard>
              {trips.length == 2 ? (
                <TripCard
                  title={trips[1].name!}
                  agency={trips[1].agency.name!}
                  price={trips[1].price!.toString()}
                  type={trips[1].trip_type!}
                  image={trips[1].image!}
                  link={`/dashboard/trips/${trips[1].id}`}
                ></TripCard>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>

      {alltrips.length >= 1 ? (
        <div className="relative h-full py-10" id="trips">
          <div className="text-2xl font-semibold text-center text-black font-title mb-4">
            All Trips
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {alltrips.slice(0, 4).map((data: trips, index: number) => (
              <PriceCard
                key={index}
                title={data.name!}
                description={data.description!}
                price={data.price}
                link={data.id.toString()!}
                image={data.image!}
              />
            ))}
          </div>

          <div className="grid place-items-center mt-6">
            <Link
              href={"/dashboard/alltrips"}
              className="bg-[#1bc48b] rounded-md py-2 px-4 text-white text-center font-semibold"
            >
              See All Trips
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserDashboard;

interface PriceCardProps {
  title: string;
  description: string;
  price: number;
  link: string;
  image: string;
}
const PriceCard = (props: PriceCardProps) => {
  return (
    <Card className=" bg-gray-100 w-56 p-2 shadow-lg transition-all duration-200 ease-in-out  rounded-md mx-auto">
      <Image
        src={props.image}
        alt="error"
        className="w-56 h-40 object-cover object-center inline-block rounded-md"
      ></Image>
      <div>
        <p className="font-semibold mt-2 text-lg font-title truncate">
          {props.title}
        </p>
        <h1 className="text-sm font-normal text-gray-600 font-para my-1">
          ₹ {props.price}
        </h1>

        <p className="font-normal text-sm font-para truncate">
          {props.description}
        </p>
        <Link
          href={`/trips/${props.link}`}
          className="bg-[#1bc48b] w-full mt-2 inline-block hover:bg-transparent border-[#1bc48b] border-2 hover:text-[#1bc48b] text-white rounded-sm py-1 text-center"
        >
          See More
        </Link>
      </div>
    </Card>
  );
};
