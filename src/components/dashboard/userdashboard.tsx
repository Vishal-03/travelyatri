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

interface UserDashboardProps {}
const UserDashboard = (props: UserDashboardProps) => {
  const [isLoading, setIsLoding] = useState<boolean>(true);

  const [trips, setTrips] = useState<trips[]>([]);

  const init = async () => {
    setIsLoding(true);
    const tripsres = await getTrips({});
    if (tripsres.status) setTrips(tripsres.data!);

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

  return (
    <div className="w-full">
      <div className="text-2xl font-semibold text-center text-black font-title">
        Travel Yatri Trips
      </div>
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
        <Slider {...tsettings3} className="w-11/12 md:5/6 lg:4/6 mx-auto ">
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
      <div className="md:hidden p-4">
        <Slider
          {...tsettings1}
          className="w-11/12 md:5/6 lg:4/6 mx-auto md:hidden"
        >
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
    </div>
  );
};

export default UserDashboard;
