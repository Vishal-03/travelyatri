"use client";
import { getTrips } from "@/actions/trip/gettrips";
import TripCard from "@/components/card/tripcard";
import Navbar from "@/components/home/Navbar";
import { trips } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AllTrips = () => {
  const route = useRouter();
  const [isLoading, setIsLoding] = useState<boolean>(true);

  const [trips, setTrips] = useState<trips[]>([]);
  const init = async () => {
    setIsLoding(true);

    const alltripsresponse = await getTrips({});
    if (alltripsresponse.status) setTrips(alltripsresponse.data!);

    setIsLoding(false);
  };
  useEffect(() => {
    init();
  }, []);
  if (isLoading)
    return (
      <div className="h-screen w-full grid place-items-center text-3xl text-gray-600 bg-gray-200">
        Loading...
      </div>
    );
  return (
    <>
      <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
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
      </div>
      <Navbar />
    </>
  );
};

export default AllTrips;
