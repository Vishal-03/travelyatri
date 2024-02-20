import Image from "next/image";
import Link from "next/link";

const CompleteCard = () => {
  return (
    <>
      <div className="p-6 rounded-md  bg-gradient-to-l from-blue-200 to-blue-400 flex">
        <div className="grow flex flex-col">
          <h1 className="text-white text-lg sm:text-3xl font-semibold">
            Your Profile is not completed
            <br /> complete your profile in order to proceed.
          </h1>
          <div className="grow"></div>
          <Link
            href={"/dashboard/profile/updateprofile"}
            className="w-40 bg-white text-blue-500 px-4 py-1"
          >
            Complete Profile
          </Link>
        </div>
        <div className="grid place-items-center">
          <Image
            alt="cuffeeup"
            src="/images/coffeecup.png"
            width={180}
            height={180}
          />
        </div>
      </div>
    </>
  );
};

export default CompleteCard;
