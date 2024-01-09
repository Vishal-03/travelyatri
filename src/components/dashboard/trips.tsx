import { useState } from "react";
import { Fa6SolidMagnifyingGlass } from "../icons";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

const TripsSection = () => {
    const [isrunning, setisrunning] = useState(true);
    return (
        <>
            <div className="flex gap-4 mt-4">
                <div className={`cursor-pointer  rounded-md shadow-md  text-lg font-semibold px-6 py-1 ${isrunning ? "text-white bg-gradient-to-bl from-orange-500 to-orange-300" : "text-orange-500 bg-white"}`} onClick={() => setisrunning(true)}>Runing</div>
                <div className={`cursor-pointer  rounded-md shadow-md  text-lg font-semibold px-6 py-1 ${!isrunning ? "text-white bg-gradient-to-bl from-orange-500 to-orange-300" : "text-orange-500 bg-white"}`} onClick={() => setisrunning(false)}>Expired</div>
                <input type="text" className="grow rounded-md placeholder:text-orange-500 px-4 focus:outline-none" placeholder="Start typing to search..." /> <button className="grid place-items-center rounded-md text-white w-10 bg-gradient-to-bl from-orange-500 to-orange-300">
                    <Fa6SolidMagnifyingGlass />
                </button>
            </div>

            <div className="grid grid-cols-4 gap-6 mt-6">
                {
                    [
                        "/test/img1.jpg",
                        "/test/img2.jpg",
                        "/test/img3.jpg",
                        "/test/img4.jpg",
                        "/test/img5.jpg",
                        "/test/img6.jpg",
                        "/test/img7.jpg",
                        "/test/img8.jpg",
                        "/test/img9.jpg",
                    ].map((item: string, index: number) => {
                        return (
                            <>
                                <div className="h-80 rounded-md relative" key={index}>

                                    <Image
                                        removeWrapper
                                        alt="Card background"
                                        className="z-0 w-full h-full object-cover relative rounded-md"
                                        src={item}
                                    />
                                    <div className="rounded-md absolute bottom-0 left-0 w-full pb-2 bg-gradient-to-b from-transparent to-slate-900">
                                        <h1 className="text-white text-lg text-center font-semibold">Title of the card</h1>
                                        <h1 className="text-white text-sm text-center font-semibold">Explore</h1>
                                    </div>
                                </div>
                            </>);
                    })
                }
            </div>
        </>
    );
}

export default TripsSection;