"use client"

import { Image } from "@nextui-org/react";
import { Fa6SolidMountainSun } from "../icons";

const AgencyDashboard = () => {
    return (
        <>
            <div className="my-4 flex gap-4 items-center mt-10">
                <Fa6SolidMountainSun className="text-black text-3xl" />
                <h1 className="text-black text-2xl font-medium">New Trips</h1>
            </div>
            <div className="grid grid-cols-4 gap-6 mt-6">
                {
                    [
                        "/test/img1.jpg",
                        "/test/img2.jpg",
                        "/test/img3.jpg",
                        "/test/img4.jpg",
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
            <div className="my-4 flex gap-4 items-center mt-10">
                <Fa6SolidMountainSun className="text-black text-3xl" />
                <h1 className="text-black text-2xl font-medium">On Going Trips</h1>
            </div>
            <div className="grid grid-cols-4 gap-6 mt-6">
                {
                    [
                        "/test/img5.jpg",
                        "/test/img6.jpg",
                        "/test/img7.jpg",
                        "/test/img8.jpg",
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
            <div className="my-4 flex gap-4 items-center mt-10">
                <Fa6SolidMountainSun className="text-black text-3xl" />
                <h1 className="text-black text-2xl font-medium">Completed Trips</h1>
            </div>
            <div className="grid grid-cols-4 gap-6 mt-6">
                {
                    [
                        "/test/img9.jpg",
                        "/test/img1.jpg",
                        "/test/img2.jpg",
                        "/test/img3.jpg",
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
            <div className="my-4 flex gap-4 items-center mt-10">
                <Fa6SolidMountainSun className="text-black text-3xl" />
                <h1 className="text-black text-2xl font-medium">Completed Trips</h1>
            </div>
            <div className="grid grid-cols-4 gap-6 mt-6">
                {
                    [
                        "/test/img1.jpg",
                        "/test/img2.jpg",
                        "/test/img3.jpg",
                        "/test/img4.jpg",
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

export default AgencyDashboard;