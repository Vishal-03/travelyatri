"use client";

import { Fa6SolidMountainSun } from "../icons";
import TripCard from "../card/tripcard";
import { useEffect, useState } from "react";
import { trips } from "@prisma/client";
import { getTrips } from "@/actions/trip/gettrips";

const AgencyDashboard = () => {
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

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
      </div>

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
    </>
  );
};

export default AgencyDashboard;
