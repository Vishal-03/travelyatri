"use server";
import prisma from "../../../../prisma/database";
import UserCard from "@/components/user/adminusercard";
import Ttipslongcard from "@/components/user/longcard";
import { user } from "@nextui-org/react";
const Trips = async () => {
  const trips = await prisma.trips.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  return (
    <>
      {trips.length === 0 ? (
        <div className="bg-white p-4 rounded-md w-80 border-l-4 border-red-500">
          <h1 className="text-center text-xl font-semibold">
            There is no trips
          </h1>
        </div>
      ) : (
        <div className="flex flex-col gap-4 flex-wrap justify-between m-5">
          {trips.map((item: any, index: number) => {
            return (
              <Ttipslongcard
                key={index}
                id={item.id}
                name={item.name}
                image={item.image}
                status={item.showhome}
              ></Ttipslongcard>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Trips;
