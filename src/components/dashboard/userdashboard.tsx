"use client";

import { Fa6SolidMountainSun } from "../icons";
import TripCard from "../card/tripcard";
import { useEffect, useState } from "react";
import { trips } from "@prisma/client";
import { getTrips } from "@/actions/trip/gettrips";
import { getTripsById } from "@/actions/trip/gettripbyid";

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
    </>
  );
};

export default UserDashboard;
