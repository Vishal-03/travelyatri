import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import prisma from "../../../../prisma/database";
import { getServerSession } from "next-auth";
import { user } from "@prisma/client";
import Link from "next/link";
import CompleteCard from "@/components/dashboard/completecard";
import { profileCompleted } from "@/actions/user/profilecompleted";

const Profile = async () => {
  const session = await getServerSession();
  const userdata: user | null = await prisma.user.findFirst({
    where: {
      email: session?.user.email,
    },
  });

  const userProfile = await profileCompleted({
    userid: userdata?.id as number,
  });

  return (
    <>
      <div className="relative w-full min-h-screen grid place-items-center">
        {userdata ? (
          userProfile.data?.user ? (
            <Card className="bg-white p-4 rounded-md w-80">
              <CardHeader className="pb-0 pt-2 flex-col items-start">
                <p className="text-tiny uppercase font-bold">
                  {userdata.name ?? "-"}
                </p>
                <small className="text-default-500">
                  {userdata.email ?? "-"}
                </small>
                <h4 className="font-bold text-large">
                  {userdata.contact ?? "-"}
                </h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                {userdata!.avatar != null ? (
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl h-72 w-80"
                    src={userdata.avatar ?? "/images/user.png"}
                  />
                ) : (
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl h-72 w-80"
                    src="/images/user.png"
                  />
                )}
              </CardBody>
              <CardFooter className="bg-[#eeeeff] p-4 rounded-md flex-col items-start mt-2">
                <h1 className="font-semibold">Adddress</h1>
                <p className="text-sm">{userdata.address ?? "-"}</p>
                <Link
                  href={"/dashboard/profile/updateprofile"}
                  className="flex-1 inline-block rounded-md bg-blue-500 text-white py-1 w-full mt-4 font-semibold text-center"
                >
                  Edit Profile
                </Link>
                {userdata!.password != null ? (
                  <>
                    <Link
                      href={"/dashboard/profile/changepassword"}
                      className="flex-1 inline-block rounded-md bg-green-500  text-white py-1 w-full mt-4 font-semibold text-center"
                    >
                      Change Password
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </CardFooter>
            </Card>
          ) : (
            <div className="w-4/6 mx-auto grid place-items-center h-full ">
              <CompleteCard />
            </div>
          )
        ) : (
          <div className="bg-white p-4 rounded-md w-80 border-l-4 border-red-500">
            <h1 className="text-center text-xl font-semibold">
              User with this id doesn&apos;t exist
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
