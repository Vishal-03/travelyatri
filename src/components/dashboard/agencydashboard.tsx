"use client"

import { Fa6SolidMountainSun } from "../icons";
import TripCard from "../card/tripcard";

const AgencyDashboard = () => {
    return (
        <>
            <div className="my-4 flex gap-4 items-center mt-10">
                <Fa6SolidMountainSun className="text-black text-3xl" />
                <h1 className="text-black text-2xl font-medium">New Trips</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {
                    [
                        "/test/img1.jpg",
                        "/test/img2.jpg",
                        "/test/img3.jpg",
                        "/test/img4.jpg",
                    ].map((item: string, index: number) => {
                        return (
                            <TripCard key={index} title="Title of the card" agency="name of the agency" price="300" type="PUBLIC" image={item} link="/dashboard/trips/1"></TripCard>
                        );
                    })
                }
            </div>
            <div className="my-4 flex gap-4 items-center mt-10">
                <Fa6SolidMountainSun className="text-black text-3xl" />
                <h1 className="text-black text-2xl font-medium">On Going Trips</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {
                    [
                        "/test/img5.jpg",
                        "/test/img6.jpg",
                        "/test/img7.jpg",
                        "/test/img8.jpg",
                    ].map((item: string, index: number) => {
                        return (
                            <TripCard key={index} title="Title of the card" agency="name of the agency" price="300" type="PUBLIC" image={item} link="/dashboard/trips/1"></TripCard>
                        );
                    })
                }
            </div>
            <div className="my-4 flex gap-4 items-center mt-10">
                <Fa6SolidMountainSun className="text-black text-3xl" />
                <h1 className="text-black text-2xl font-medium">Completed Trips</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {
                    [
                        "/test/img9.jpg",
                        "/test/img1.jpg",
                        "/test/img2.jpg",
                        "/test/img3.jpg",
                    ].map((item: string, index: number) => {
                        return (
                            <TripCard key={index} title="Title of the card" agency="name of the agency" price="300" type="PUBLIC" image={item} link="/dashboard/trips/1"></TripCard>
                        );
                    })
                }
            </div>
            <div className="my-4 flex gap-4 items-center mt-10">
                <Fa6SolidMountainSun className="text-black text-3xl" />
                <h1 className="text-black text-2xl font-medium">Completed Trips</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {
                    [
                        "/test/img1.jpg",
                        "/test/img2.jpg",
                        "/test/img3.jpg",
                        "/test/img4.jpg",
                    ].map((item: string, index: number) => {
                        return (
                            <TripCard key={index} title="Title of the card" agency="name of the agency" price="300" type="PUBLIC" image={item} link="/dashboard/trips/1"></TripCard>
                        );
                    })
                }
            </div>
        </>
    );
}

export default AgencyDashboard;