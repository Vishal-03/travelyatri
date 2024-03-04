"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "../../../../prisma/database";
import { Image } from "@nextui-org/react";
import { longtext } from "@/utils/methods";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShowHome, trips } from "@prisma/client";
import { tripsHomeUpdate } from "@/actions/trip/updatetriphome";
import { useEffect, useState } from "react";
import { getTrips } from "@/actions/trip/gettrips";
import { toast } from "react-toastify";
const Trips = () => {
  const [trips, setTrips] = useState<trips[]>([]);

  const init = async () => {
    const tripsresponse = await getTrips({});
    if (tripsresponse.status) {
      setTrips(tripsresponse.data as trips[]);
    }
  };
  useEffect(() => {
    init();
  }, []);

  const updatestatus = async (id: number, status: ShowHome) => {
    const response = await tripsHomeUpdate({
      id: id,
      status: status === ShowHome.YES ? ShowHome.NO : ShowHome.YES,
    });
    if (response.status) {
      toast.success("Status updated successfully");
      await init();
    }
  };

  return (
    <>
      {trips.length === 0 ? (
        <div className="p-5">
          <div className="bg-white p-4 rounded-md border-l-4 border-red-500 w-full">
            <h1 className="text-center text-xl font-semibold">
              There is no trips available
            </h1>
          </div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Agency</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium flex w-72 gap-2 items-center">
                  <Image
                    src={item.image}
                    alt="trips image error"
                    className="object-cover shrink-0 object-center w-14 h-14 rounded-full"
                  />
                  <p> {longtext(item.name, 40)}</p>
                </TableCell>
                <TableCell className="min-w-80">
                  <p>{item.agency.name}</p>
                </TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell className="text-right flex gap-2 items-center justify-end">
                  <Link
                    href={`/dashboard/trips/${item.id}`}
                    className="text-white bg-[#1bc48b] px-4 rounded-md text-sm h-8 grid place-items-center"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => updatestatus(item.id, item.showhome)}
                    className={`text-white rounded-md text-sm grid place-items-center w-40 h-8 hover:bg-blue-400 ${
                      item.showhome == ShowHome.YES
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {item.showhome === "YES"
                      ? "Remove from home"
                      : "Add to home"}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default Trips;
