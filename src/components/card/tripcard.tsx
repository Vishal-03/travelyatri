import { Image } from "@nextui-org/react";
import Link from "next/link";

type TripCardProps = {
    title: string;
    agency: string;
    image: string;
    type: string;
    price: string;
    link: string;
}

const TripCard = (props: TripCardProps) => {
    return (
        <div className="bg-white rounded-md shadow-md p-4">
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 h-60 w-full object-cover relative rounded-md"
                src={props.image}
            />
            <div className="rounded-md w-full ">
                <h1 className="text-black text-lg mt-2 font-semibold">{props.title}</h1>
                <h1 className="text-black text-sm font-medium text-[]">{props.agency}</h1>
                <div className="flex bg-[#f2f2f2] rounded-md py-1 px-2 mt-2">
                    <h1 className="text-black text-sm text-center font-normal">{props.type}</h1>
                    <div className="grow"></div>
                    <p className="text-black text-sm text-center font-normal">₹{props.price}</p>
                </div>
            </div>
            <Link href={props.link} className="w-full inline-block text-center bg-blue-500 text-white py-1 mt-2 rounded-md">View</Link>
        </div>
    );
}

export default TripCard;