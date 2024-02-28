"use client";

import {
  MaterialSymbolsArrowBackIos,
  MaterialSymbolsArrowForwardIosRounded,
} from "../icons";
import TripCard from "../card/tripcard";
import { useEffect, useState } from "react";
import { trips } from "@prisma/client";
import { getTripsById } from "@/actions/trip/gettripbyid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { time } from "console";

interface AgencyDashboardProps {
  id: number;
}
const AgencyDashboard = (props: AgencyDashboardProps) => {
  const [isLoading, setIsLoding] = useState<boolean>(true);

  const [trips, setTrips] = useState<any[]>([]);

  const init = async () => {
    setIsLoding(true);
    const tripsres = await getTripsById({ id: props.id });
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

  if (trips.length == 0) {
    return <></>;
  }

  return (
    <div className="w-full">
      <div className="text-2xl font-semibold text-center text-black font-title">
        Your Created Trips
      </div>

      {trips.length == 1 ? (
        <>
          <div className="mt-4"></div>
          <TripCard
            title={trips[0].name!}
            agency={trips[0].agency.name!}
            price={trips[0].price!.toString()}
            type={trips[0].trip_type!}
            image={trips[0].image!}
            link={`/dashboard/trips/${trips[0].id}`}
          ></TripCard>
        </>
      ) : (
        <>
          <div className="hidden md:block lg:hidden  p-4">
            <Slider {...tsettings2} className="w-11/12 md:5/6 lg:4/6">
              {trips.map((item: any, index: number) => (
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
              {trips.map((item: any, index: number) => (
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
              className="w-11/12 md:5/6 lg:4/6 mx-auto md:hidden grid place-items-center"
            >
              {trips.map((item: any, index: number) => (
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
        </>
      )}

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trips.map((item: any, index: number) => {
          return (
            <TripCard
              key={index}
              title={item.name!}
              agency={item.agency!.name!}
              price={item.price!.toString()}
              type={item.trip_type!}
              image={item.image!}
              link={`/dashboard/trips/${item.id}`}
            ></TripCard>
          );
        })}
      </div> */}

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {[
          "/test/img5.jpg",
          "/test/img6.jpg",
          "/test/img7.jpg",
          "/test/img8.jpg",
        ].map((item: string, index: number) => {
          return (
            <TripCard
              key={index}
              title="Title of the card"
              agency="name of the agency"
              price="300"
              type="PUBLIC"
              image={item}
              link="/dashboard/trips/1"
            ></TripCard>
          );
        })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {[
          "/test/img9.jpg",
          "/test/img1.jpg",
          "/test/img2.jpg",
          "/test/img3.jpg",
        ].map((item: string, index: number) => {
          return (
            <TripCard
              key={index}
              title="Title of the card"
              agency="name of the agency"
              price="300"
              type="PUBLIC"
              image={item}
              link="/dashboard/trips/1"
            ></TripCard>
          );
        })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {[
          "/test/img1.jpg",
          "/test/img2.jpg",
          "/test/img3.jpg",
          "/test/img4.jpg",
        ].map((item: string, index: number) => {
          return (
            <TripCard
              key={index}
              title="Title of the card"
              agency="name of the agency"
              price="300"
              type="PUBLIC"
              image={item}
              link="/dashboard/trips/1"
            ></TripCard>
          );
        })}
      </div> */}
    </div>
  );
};

export default AgencyDashboard;
