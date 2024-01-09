import Image from "next/image";
import Link from "next/link";

const CreateTripsCard = () => {
    return (
        <>
            <div className="p-6 rounded-md  bg-gradient-to-l from-orange-200 to-orange-400 flex">
                <div className="grow flex flex-col">
                    <h1 className="text-white text-3xl font-semibold">Create Trips to start your<br /> contribute to your world tour.</h1>
                    <div className="grow"></div>
                    <Link href={"/dashboard/createtrips"} className="w-40 bg-white text-orange-500 px-4 py-1">Create Trips</Link>
                </div>
                <div className="grid place-items-center">
                    <Image alt="cuffeeup" src="/images/coffeecup.png" width={180} height={180} />
                </div>
            </div>
        </>
    );
}

export default CreateTripsCard;