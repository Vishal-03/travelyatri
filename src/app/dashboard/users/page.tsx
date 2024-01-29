"use server"
import { Fa6SolidMountainSun, Fa6SolidUser } from "@/components/icons";
import prisma from "../../../../prisma/database";
import UserCard from "@/components/user/adminusercard";
const Users = async () => {
    const users = await prisma.user.findMany();
    return (
        <>
            <div className="my-4 flex gap-4 items-center mt-10 px-10">
                <Fa6SolidUser className="text-black text-3xl" />
                <h1 className="text-black text-2xl font-medium">Users</h1>
            </div>

            <div className="flex gap-4 flex-wrap justify-evenly">
                {users.map((item: any, index: number) => {
                    return (
                        <UserCard key={index} id={item.id} name={item.name} email={item.email} avatar={item.avatar} status={item.status} ></UserCard>
                    );
                })}
            </div>
        </>
    );
}

export default Users;
