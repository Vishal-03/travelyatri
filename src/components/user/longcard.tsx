"use client";
import { tripsHomeUpdate } from "@/actions/trip/updatetriphome";
import { Button, Image } from "@nextui-org/react";
import { ShowHome, trips } from "@prisma/client";
import Link from "next/link";

interface TtipslongcardProps {
  image: string;
  name: string;
  status: ShowHome;
  id: number;
}
const Ttipslongcard = (props: TtipslongcardProps) => {
  const updatestatus = async () => {
    const response = await tripsHomeUpdate({
      id: props.id,
      status: props.status === ShowHome.YES ? ShowHome.NO : ShowHome.YES,
    });
    if (response.status) {
      window.location.reload();
    }
  };
  return (
    <>
      <div className="bg-white rounded-md p-4 flex gap-2 items-center">
        <Image
          src={props.image}
          alt="trips image error"
          className="object-cover shrink-0 object-center w-20 h-20 rounded-sm"
        />
        <p>{props.name}</p>
        <div className="grow"></div>
        <Link
          href={`/dashboard/trips/${props.id}`}
          target="_blank"
          className="text-white bg-blue-500 py-1 px-2 rounded-md text-lg"
        >
          View Trips
        </Link>
        <Button
          onClick={updatestatus}
          className={`text-white py-1 px-2 rounded-md text-lg ${
            props.status == ShowHome.YES ? "bg-red-500" : "bg-blue-500"
          }`}
        >
          {props.status === "YES" ? "Remove from home" : "Add trip home"}
        </Button>
      </div>
    </>
  );
};

export default Ttipslongcard;
