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
import { ShowHome, agency } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAgency } from "@/actions/agency/getagency";
const AdminAgency = () => {
  const [agency, setAgency] = useState<agency[]>([]);

  const init = async () => {
    const agencyresponse = await getAgency({});
    if (agencyresponse.status) {
      setAgency(agencyresponse.data as agency[]);
    }
  };
  useEffect(() => {
    init();
  }, []);

  // const updatestatus = async (id: number, status: ShowHome) => {
  //   const response = await tripsHomeUpdate({
  //     id: id,
  //     status: status === ShowHome.YES ? ShowHome.NO : ShowHome.YES,
  //   });
  //   if (response.status) {
  //     toast.success("Status updated successfully");
  //     await init();
  //   }
  // };

  return (
    <>
      {agency.length === 0 ? (
        <div className="p-5">
          <div className="bg-white p-4 rounded-md border-l-4 border-red-500 w-full">
            <h1 className="text-center text-xl font-semibold">
              There is no User available
            </h1>
          </div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agency.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium flex w-72 gap-2 items-center">
                  <Image
                    src={item.logo}
                    alt="Agency image error"
                    className="object-cover shrink-0 object-center w-14 h-14 rounded-full"
                  />
                  <p> {longtext(item.name, 40)}</p>
                </TableCell>
                <TableCell className="min-w-80">
                  <p>{item.email}</p>
                </TableCell>
                <TableCell>{item.contact}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/agency/${item.id}`}
                    className="text-white bg-blue-500 px-4 rounded-md text-sm h-8 grid place-items-center"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default AdminAgency;
