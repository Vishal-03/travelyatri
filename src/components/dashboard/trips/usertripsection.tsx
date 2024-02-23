"use client";
import { Fa6SolidMagnifyingGlass } from "@/components/icons";
import { Card } from "@/components/ui/card";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

interface UserTripsSectionProps {
  trips: any;
}
const UserTripsSection = (props: UserTripsSectionProps) => {
  const [isrunning, setisrunning] = useState(true);
  return (
    <>
      <div className="flex gap-4 mt-4 flex-wrap">
        <div
          className={`cursor-pointer  rounded-md shadow-md  text-lg font-semibold px-6 py-1 ${
            isrunning
              ? "text-white bg-gradient-to-bl from-orange-500 to-orange-300"
              : "text-orange-500 bg-white"
          }`}
          onClick={() => setisrunning(true)}
        >
          Runing
        </div>
        <div
          className={`cursor-pointer  rounded-md shadow-md  text-lg font-semibold px-6 py-1 ${
            !isrunning
              ? "text-white bg-gradient-to-bl from-orange-500 to-orange-300"
              : "text-orange-500 bg-white"
          }`}
          onClick={() => setisrunning(false)}
        >
          Expired
        </div>
        <div className="flex items-center grow gap-4">
          <input
            type="text"
            className="grow rounded-md placeholder:text-orange-500 px-4 focus:outline-none py-2"
            placeholder="Start typing to search..."
          />{" "}
          <button className="grid place-items-center rounded-md text-white w-10 bg-gradient-to-bl from-orange-500 to-orange-300">
            <Fa6SolidMagnifyingGlass className="h-9" />
          </button>
        </div>
      </div>

      {props.trips == null || props.trips.length == 0 ? (
        <>
          <h1 className="p-4 bg-white rounded-md mt-6 border-l-4 border-red-500 text-xl text-red-500">
            You haven&apos;t registred in any trips yet
          </h1>
        </>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6 mt-6">
            {props.trips.map((item: any, index: number) => {
              return (
                <PriceCard
                  key={index}
                  title={item.name!}
                  description={item.description!}
                  price={item.price}
                  link={item.id.toString()!}
                  image={item.image!}
                />
                // <Link href={`/dashboard/trips/${item!.id}`} key={index}>
                //   <div className="h-80 rounded-md relative">
                //     <Image
                //       removeWrapper
                //       alt="Card background"
                //       className="z-0 w-full h-full object-cover relative rounded-md"
                //       src={item!.image}
                //     />
                //     <div className="rounded-md absolute bottom-0 left-0 w-full pb-2 bg-gradient-to-b from-transparent to-slate-900">
                //       <h1 className="text-white text-lg text-center font-semibold">
                //         {item!.name}
                //       </h1>
                //       <h1 className="text-white text-sm text-center font-semibold">
                //         {item!.description}
                //       </h1>
                //     </div>
                //   </div>
                // </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default UserTripsSection;

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
