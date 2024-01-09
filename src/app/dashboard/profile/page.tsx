import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { database } from "../../../../prisma/database";
import { cookies } from "next/headers";

const Profile = async () => {
    const usercookies = cookies().get("user")?.value;
    const userdata = JSON.parse(usercookies!);
    const user = await database.user.findFirst({
        where: {
            id: userdata.id
        }
    });

    return (
        <>
            <div className="relative w-full h-full grid place-items-center">
                {user ?
                    <Card className="bg-white p-4 rounded-md w-80">
                        <CardHeader className="pb-0 pt-2 flex-col items-start">
                            <p className="text-tiny uppercase font-bold">{user.name ?? "-"}</p>
                            <small className="text-default-500">{user.email ?? "-"}</small>
                            <h4 className="font-bold text-large">{user.contact ?? "-"}</h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl h-72 w-80"
                                src="/images/user.png"
                            />
                        </CardBody>
                        <CardFooter className="bg-[#eeeeff] p-4 rounded-md flex-col items-start mt-2">
                            <h1 className="font-semibold">Adddress</h1>
                            <p className="text-sm">{user.address ?? "-"}</p>
                            <button className="flex-1 inline-block rounded-md bg-blue-500 text-white py-1 w-full mt-4 font-semibold">Edit Profile</button>
                            <button className="flex-1 inline-block rounded-md bg-red-500 text-white py-1 w-full mt-4 font-semibold">Change Password</button>
                        </CardFooter>
                    </Card>
                    :
                    <div className="bg-white p-4 rounded-md w-80 border-l-4 border-red-500">
                        <h1 className="text-center text-xl font-semibold">User with this id doesn&apos;t exist</h1>
                    </div>}

            </div>
        </>
    );
}

export default Profile;
