import Image from "next/image";
import Link from "next/link";

const CompleteAgencyCard = () => {
  return (
    <>
      <div className="p-6 rounded-md  bg-gradient-to-l from-blue-200 to-blue-400 flex flex-col md:flex-row mt-6  order-2 md:order-1">
        <div className="grow flex flex-col">
          <h1 className="text-white text-sm sm:text-3xl font-semibold">
            You havne&apos;t created agency yet
            <br />
            Create your Agency in order to proceed.
          </h1>
          <div className="grow mt-4"></div>
          <Link
            href={"/createagency"}
            className="w-40 bg-white text-blue-500 px-4 py-1"
          >
            Create Agency
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
export default CompleteAgencyCard;
