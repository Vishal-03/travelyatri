import Image from "next/image";
import Link from "next/link";

const CompleteAgencyCard = () => {
    return (
        <>
            <div className="p-6 rounded-md  bg-gradient-to-l from-blue-200 to-blue-400 flex">
                <div className="grow flex flex-col">
                    <h1 className="text-white text-3xl font-semibold">You havne&apos;t created agency yet<br />Create your Agency in order to proceed.</h1>
                    <div className="grow"></div>
                    <Link href={"/createagency"} className="w-40 bg-white text-blue-500 px-4 py-1">Create Agency</Link>
                </div>
                <div className="grid place-items-center">
                    <Image alt="cuffeeup" src="/images/coffeecup.png" width={180} height={180} />
                </div>
            </div>
        </>
    );
}
