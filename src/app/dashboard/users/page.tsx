"use server";
import { Fa6SolidUser } from "@/components/icons";
import prisma from "../../../../prisma/database";
import UserCard from "@/components/user/adminusercard";
import { user } from "@nextui-org/react";
const Users = async () => {
  // remover the id 1 and 2 from the list
  const users = await prisma.user.findMany({
    where: {
      NOT: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
    },
  });

  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-lg m-5">
        <h1 className="text-lg font-semibold">Status Information</h1>
        <p className="text-sm">
          INACTIVE: User account created but not verfired email
        </p>
        <p className="text-sm">
          ACTIVE: User email is verified but not verfied by admin
        </p>
        <p className="text-sm">ADMINACTIVE: User is verified</p>
      </div>

      {users.length === 0 ? (
        <div className="bg-white p-4 rounded-md w-80 border-l-4 border-red-500">
          <h1 className="text-center text-xl font-semibold">
            There is no user registred here
          </h1>
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap justify-between m-5">
          {users.map((item: any, index: number) => {
            return (
              <UserCard
                key={index}
                id={item.id}
                name={item.name}
                email={item.email}
                avatar={item.avatar}
                status={item.status}
              ></UserCard>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Users;
