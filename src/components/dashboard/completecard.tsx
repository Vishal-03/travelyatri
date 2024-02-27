import Image from "next/image";
import Link from "next/link";

const CompleteCard = () => {
  return (
    <>
      <div className="p-4 rounded-md  bg-gradient-to-l from-blue-200 to-blue-400 flex flex-col md:flex-row mt-6">
        <div className="grow flex flex-col order-2 md:order-1">
          <h1 className="text-white text-sm sm:text-3xl font-semibold">
            Your Profile is not completed
            <br /> complete your profile in order to proceed.
          </h1>
          <div className="grow mt-4"></div>
          <Link
            href={"/dashboard/profile/updateprofile"}
            className="w-40 bg-white text-blue-500 px-4 py-1"
          >
            Complete Profile
          </Link>
        </div>
        <div className="grid place-items-center order-1 md:order-1">
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
