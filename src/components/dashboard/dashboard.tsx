"use client";

import { useEffect, useState } from "react";
import { IconamoonSearch } from "../icons";
import AgencyDashboard from "./agencydashboard";
import { useRouter } from "next/navigation";
import CompleteCard from "./completecard";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Image } from "@nextui-org/react";
import { Button } from "../ui/button";
import Autoplay from "embla-carousel-autoplay";
import UserDashboard from "./userdashboard";
interface Feature {
  title: string;
  description: string;
  image: string;
}

interface DashboardPageProps {
  user: any;
  isProfileCompleted: boolean;
}
const DashboardPage = (props: DashboardPageProps) => {
  const route = useRouter();
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (props.user.role == "ADMIN") {
      route.replace("/dashboard/users");
    }
  }, []);

  const slider: Feature[] = [
    {
      title: "Nature's Duality",
      description:
        "Tranquil valley nestled below a dazzling, sunlight-kissed glacier peak.",
      image: "/img/img1.jpg",
    },
    {
      title: "Village Under Giant's Gaze",
      description:
        "Colorful houses nestled in a green valley, watched over by a towering mountain.",
      image: "/img/img2.jpg",
    },
    {
      title: "Green Majesty",
      description:
        "Sunlit river winds through verdant mountains, crowned by clouds.",
      image: "/img/img3.jpg",
    },
    {
      title: "Stone & Stream",
      description:
        "Majestic Indian temple beside a gentle river, with mountains as its backdrop.",
      image: "/img/img4.png",
    },
  ];

  return (
    <>
      <div className="w-full relative p-6">
        <div className="grid place-items-center relative" id="home">
          <Carousel
            setApi={setApi}
            className="w-full relative"
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent>
              {slider.map((value: Feature, index) => (
                <CarouselItem
                  key={index}
                  className="w-full h-96 relative rounded-lg"
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                  <Image
                    removeWrapper
                    src={value.image}
                    alt="error"
                    className="relative object-cover object-center h-screen w-full rounded-md"
                  ></Image>

                  <div className="w-full h-40 absolute bottom-0 left-0 bg-gradient-to-b from-transparent to-slate-700 flex flex-col pb-10">
                    <div className="grow"></div>
                    <h1 className="text-center text-2xl text-white font-title">
                      {value.title}
                    </h1>
                    <p className="text-center text-sm w-4/6 mx-auto text-white mb-4 font-para">
                      {value.description}
                    </p>
                  </div>
                  <CarouselNext className="absolute top-[50%] right-6" />
                  <CarouselPrevious className="absolute top-[50%] left-6" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="w-full absolute top-0 left-0 mt-10 p-4 sm:p-0">
            <div className="rounded-full mx-auto w-full sm:w-4/6 md:w-5/12 flex p-1 bg-white">
              <input
                className="p-0 w-full bg-transparent outline-none px-4"
                placeholder="E.g. Hotels, Travels"
              />
              <Button className="flex gap-2 bg-[#22c18b] rounded-full hover:bg-[#22c18b]">
                <IconamoonSearch className="text-white text-xl" />
                <p>Search</p>
              </Button>
            </div>
          </div>
        </div>
        {props.isProfileCompleted ? null : <CompleteCard />}
      </div>

      <div className="p-6">
        {props.user?.role == "USER" ? (
          <UserDashboard />
        ) : (
          <AgencyDashboard id={props.user.id} />
        )}
      </div>
    </>
  );
};

export default DashboardPage;
