"use client";
import Navbar from "@/components/home/Navbar";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Accordion, AccordionItem, Card, Image } from "@nextui-org/react";
import { use, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Fa6BrandsFacebook,
  Fa6BrandsInstagram,
  Fa6BrandsWhatsapp,
  IconamoonSearch,
  MaterialSymbolsArrowBackIos,
  MaterialSymbolsArrowForwardIosRounded,
  PajamasSearch,
} from "@/components/icons";
import { email, safeParse } from "valibot";
import { ContactSchema } from "@/schemas/contact";
import { toast } from "react-toastify";
import { createContact } from "@/actions/contact/addcontact";
import { trips } from "@prisma/client";
import { getTrips } from "@/actions/trip/gettrips";
import Slider from "react-slick";

interface Feature {
  title: string;
  description: string;
  image: string;
}
interface PriceCard {
  title: string;
  description: string;
  price: number;
  link: string;
  image: string;
}

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getHomeTrips } from "@/actions/trip/gethometrips";
export default function Home() {
  const route = useRouter();
  const [isLoading, setIsLoding] = useState<boolean>(true);

  const [trips, setTrips] = useState<trips[]>([]);

  const init = async () => {
    setIsLoding(true);
    const tripsres = await getHomeTrips({});
    if (tripsres.status) setTrips(tripsres.data!);

    setIsLoding(false);
  };
  useEffect(() => {
    init();
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
  const price: PriceCard[] = [
    {
      title: "Basic",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, voluptatibus.",
      price: 100,
      link: "/login",
      image: "/images/fea1.jpeg",
    },
    {
      title: "Basic",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, voluptatibus.",
      price: 100,
      link: "/login",
      image: "/images/fea1.jpeg",
    },
    {
      title: "Basic",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, voluptatibus.",
      price: 100,
      link: "/login",
      image: "/images/fea1.jpeg",
    },
    {
      title: "Basic",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, voluptatibus.",
      price: 100,
      link: "/login",
      image: "/images/fea1.jpeg",
    },
  ];

  const features: Feature[] = [
    {
      title: "Buy trips - Explore with ease, experience affordability.",
      description:
        "Discover a world of curated adventures at budget-friendly prices. Browse handpicked itineraries designed for every wanderer's heart. Book your dream vacation with just a few clicks, secure in the knowledge you're getting the best value. Leave the planning to us, focus on making memories that last a lifetime.",
      image: "/images/fea1.jpeg",
    },
    {
      title:
        "Create trips - Design your own journey, unleash your inner explorer",
      description:
        "Dream bigger, plan further. Craft a personalized itinerary tailored to your unique desires. Connect with trusted local agencies, access their expertise and insider knowledge. Build your trip brick by brick, choosing experiences that ignite your passions. Login, collaborate, and embark on an adventure that's truly yours.",
      image: "/images/fea2.jpeg",
    },
  ];

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const submit = async () => {
    const result = safeParse(ContactSchema, {
      name: nameRef.current!.value,
      email: emailRef.current!.value,
      contact: contactRef.current!.value,
      message: messageRef.current!.value,
    });

    if (result.success) {
      const createdcontact = await createContact({
        name: result.output.name,
        mobile: result.output.contact,
        email: result.output.email,
        message: result.output.message,
      });

      if (!createdcontact.status) return toast.error(createdcontact.message);
      toast.success(createdcontact.message);
      nameRef.current!.value = "";
      emailRef.current!.value = "";
      contactRef.current!.value = "";
      messageRef.current!.value = "";
    } else {
      let errorMessage = "";
      if (result.issues[0].input) {
        errorMessage = result.issues[0].message;
      } else {
        errorMessage = result.issues[0].path![0].key + " is required";
      }
      toast.error(errorMessage);
    }
  };

  if (isLoading)
    return (
      <div className="h-screen w-full grid place-items-center text-3xl text-gray-600 bg-gray-200">
        Loading...
      </div>
    );

  const getcardnumberfromscreensize = () => {
    if (window.innerWidth > 1024) {
      return 4;
    } else if (window.innerWidth > 600) {
      return 3;
    } else {
      return 1;
    }
  };

  var tsettings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <MaterialSymbolsArrowBackIos className="text-black text-xl" />,
    nextArrow: (
      <MaterialSymbolsArrowForwardIosRounded className="text-black text-xl" />
    ),
  };
  var tsettings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <MaterialSymbolsArrowBackIos className="text-black text-xl" />,
    nextArrow: (
      <MaterialSymbolsArrowForwardIosRounded className="text-black text-xl" />
    ),
  };
  var tsettings3 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <MaterialSymbolsArrowBackIos className="text-black text-xl" />,
    nextArrow: (
      <MaterialSymbolsArrowForwardIosRounded className="text-black text-xl" />
    ),
  };

  return (
    <>
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
                className="w-full h-96 md:h-screen relative"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                <Image
                  removeWrapper
                  src={value.image}
                  alt="error"
                  className="relative object-cover object-center h-screen w-full"
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
        <div className="w-full absolute top-0 left-0 mt-20 md:mt-40 p-4 sm:p-0">
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
      {trips.length > 1 ? (
        <div className="relative h-full py-20" id="trips">
          <div className="text-2xl font-semibold text-center text-black font-title mb-4">
            Travel Yatri
          </div>

          <div className="hidden md:block lg:hidden">
            <Slider {...tsettings2} className="w-11/12 md:5/6 lg:4/6 mx-auto ">
              {trips.slice(0, 4).map((data: trips, index: number) => (
                <PriceCard
                  key={index}
                  title={data.name!}
                  description={data.description!}
                  price={data.price}
                  link={data.id.toString()!}
                  image={data.image!}
                />
              ))}
            </Slider>
          </div>

          <div className="hidden lg:block">
            <Slider {...tsettings3} className="w-11/12 md:5/6 lg:4/6 mx-auto ">
              {trips.slice(0, 4).map((data: trips, index: number) => (
                <PriceCard
                  key={index}
                  title={data.name!}
                  description={data.description!}
                  price={data.price}
                  link={data.id.toString()!}
                  image={data.image!}
                />
              ))}
            </Slider>
          </div>

          <div className="md:hidden">
            <Slider
              {...tsettings1}
              className="w-11/12 md:5/6 lg:4/6 mx-auto md:hidden"
            >
              {trips.slice(0, 4).map((data: trips, index: number) => (
                <PriceCard
                  key={index}
                  title={data.name!}
                  description={data.description!}
                  price={data.price}
                  link={data.id.toString()!}
                  image={data.image!}
                />
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* <div
        className="flex min-h-screen w-full flex-col gap-6 bg-gray-100"
        id="about"
      >
        <div className="flex sm:flex-row flex-col grow">
          <div className="flex-1 sm:grid place-items-center order-2">
            <div className="p-10 sm:p-20">
              <div className="font-semibold text-4xl font-title">
                Let&apos;s Find a Home
              </div>
              <div className="font-semibold text-4xl font-title">
                That&apos;s Perfect for you
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <div className="text-gray-600 font-para">
                  Craving an Indian adventure but worried about the cost? Fear
                  not! We unlock India&apos;s magic on a budget. Trek the
                  Himalayas, sail Kerala backwaters, or explore hidden gems -
                  all while saving rupees! Homestays, street eats, and local
                  transport await. Join us, ditch the tourist traps, and
                  experience India&apos;s soul, affordably!
                </div>
                <div>
                  <Button
                    onClick={() => route.push("/login")}
                    className="bg-[#13c788]"
                  >
                    Lets Discuss Travling
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid place-items-center flex-1 order-1">
            <Image
              src="/images/homebg.png"
              alt="error"
              className="w-80 sm:w-full h-full"
            />
          </div>
        </div>
      </div> */}

      {/* new sec */}

      <div className="min-h-screen w-full flex-col items-center py-20">
        <h1 className="text-xl font-semibold text-center md:text-2xl font-title">
          What we do?
        </h1>
        <p className="text-center font-para">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, unde?
        </p>
        <div className="py-4 md:w-5/6 lg:w-4/6 mx-auto md:p-0 p-10 mt-6 font-para">
          {features.map((data: Feature, index: number) => (
            <FeatureCard
              key={index}
              img={data.image}
              title={data.title}
              description={data.description}
            />
          ))}
        </div>
      </div>

      <div className="py-10 px-6 mt-10">
        <h1 className="text-xl font-semibold text-center md:text-3xl font-title">
          Testimonial
        </h1>
        <p className="text-center">Some of our user best experiences</p>
        <div className="md:hidden">
          <Slider
            {...tsettings1}
            className="w-11/12 md:5/6 lg:4/6 mx-auto md:hidden"
          >
            <div className="w-72 p-4">
              <div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-6 rounded-lg">
                <Image
                  src="/user/david.jpg"
                  alt="error"
                  className="w-20 h-20 mb-4 object-cover object-center rounded-full"
                ></Image>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4 font-title">
                  David T., Budget Foodie
                </h2>
                <p className="leading-relaxed text-base font-para">
                  Wow, your street food tours in Mexico were incredible! Not
                  only delicious, but they introduced me to hidden gems and
                  local culture. All on a budget that fit my backpacker wallet!
                </p>
              </div>
            </div>
            <div className="p-4 w-72">
              <div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-6 rounded-lg">
                <Image
                  src="/user/emily.jpg"
                  alt="error"
                  className="w-20 h-20 mb-4 object-cover object-center rounded-full"
                ></Image>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4 font-title">
                  Emily & Alex W., Honeymooners
                </h2>
                <p className="leading-relaxed text-base font-para">
                  We found the most romantic Bali escape on your site, complete
                  with luxurious accommodation and unforgettable experiences. It
                  was truly paradise found, at a price that didn&apos;t break
                  the bank!
                </p>
              </div>
            </div>
            <div className="p-4 w-72">
              <div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-6 rounded-lg">
                <Image
                  src="/user/priya.jpg"
                  alt="error"
                  className="w-20 h-20 mb-4 object-cover object-center rounded-full"
                ></Image>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4 font-title">
                  Priya S., Budget Traveler
                </h2>
                <p className="leading-relaxed text-base font-para">
                  Found the perfect Kerala backwaters tour on your site!
                  Affordable, hassle-free, and filled with incredible
                  experiences. Thanks for showing me the hidden beauty of
                  Kerala!
                </p>
              </div>
            </div>
            <div className="p-4 w-72">
              <div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-6 rounded-lg">
                <Image
                  src="/user/rahul.jpg"
                  alt="error"
                  className="w-20 h-20 mb-4 object-cover object-center rounded-full"
                ></Image>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4 font-title">
                  Rahul & Preeti M., Family Travelers
                </h2>
                <p className="leading-relaxed text-base font-para">
                  Booked our dream Ladakh adventure through you. Everything was
                  smooth, and the price fit our budget perfectly. Memories made,
                  smiles guaranteed!art 8-bit waistcoat.
                </p>
              </div>
            </div>
          </Slider>
        </div>

        <div className="hidden md:block lg:hidden">
          <Slider {...tsettings2} className="w-11/12 md:5/6 lg:4/6 mx-auto ">
            <div className="w-72 p-4">
              <div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-6 rounded-lg">
                <Image
                  src="/user/david.jpg"
                  alt="error"
                  className="w-20 h-20 mb-4 object-cover object-center rounded-full"
                ></Image>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4 font-title">
                  David T., Budget Foodie
                </h2>
                <p className="leading-relaxed text-base font-para">
                  Wow, your street food tours in Mexico were incredible! Not
                  only delicious, but they introduced me to hidden gems and
                  local culture. All on a budget that fit my backpacker wallet!
                </p>
              </div>
            </div>
            <div className="p-4 w-72">
              <div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-6 rounded-lg">
                <Image
                  src="/user/emily.jpg"
                  alt="error"
                  className="w-20 h-20 mb-4 object-cover object-center rounded-full"
                ></Image>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4 font-title">
                  Emily & Alex W., Honeymooners
                </h2>
                <p className="leading-relaxed text-base font-para">
                  We found the most romantic Bali escape on your site, complete
                  with luxurious accommodation and unforgettable experiences. It
                  was truly paradise found, at a price that didn&apos;t break
                  the bank!
                </p>
              </div>
            </div>
            <div className="p-4 w-72">
              <div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-6 rounded-lg">
                <Image
                  src="/user/priya.jpg"
                  alt="error"
                  className="w-20 h-20 mb-4 object-cover object-center rounded-full"
                ></Image>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4 font-title">
                  Priya S., Budget Traveler
                </h2>
                <p className="leading-relaxed text-base font-para">
                  Found the perfect Kerala backwaters tour on your site!
                  Affordable, hassle-free, and filled with incredible
                  experiences. Thanks for showing me the hidden beauty of
                  Kerala!
                </p>
              </div>
            </div>
            <div className="p-4 w-72">
              <div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-6 rounded-lg">
                <Image
                  src="/user/rahul.jpg"
                  alt="error"
                  className="w-20 h-20 mb-4 object-cover object-center rounded-full"
                ></Image>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4 font-title">
                  Rahul & Preeti M., Family Travelers
                </h2>
                <p className="leading-relaxed text-base font-para">
                  Booked our dream Ladakh adventure through you. Everything was
                  smooth, and the price fit our budget perfectly. Memories made,
                  smiles guaranteed!art 8-bit waistcoat.
                </p>
              </div>
            </div>
          </Slider>
        </div>
        <div className="hidden lg:block">
          <Slider {...tsettings3} className="w-11/12 md:5/6 lg:4/6 mx-auto ">
            <div className="w-72 p-4">
              <div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-6 rounded-lg">
                <Image
                  src="/user/david.jpg"
                  alt="error"
                  className="w-20 h-20 mb-4 object-cover object-center rounded-full"
                ></Image>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4 font-title">
                  David T., Budget Foodie
                </h2>
                <p className="leading-relaxed text-base font-para">
                  Wow, your street food tours in Mexico were incredible! Not
                  only delicious, but they introduced me to hidden gems and
                  local culture. All on a budget that fit my backpacker wallet!
                </p>
              </div>
            </div>
            <div className="p-4 w-72">
              <div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-6 rounded-lg">
                <Image
                  src="/user/emily.jpg"
                  alt="error"
                  className="w-20 h-20 mb-4 object-cover object-center rounded-full"
                ></Image>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4 font-title">
                  Emily & Alex W., Honeymooners
                </h2>
                <p className="leading-relaxed text-base font-para">
                  We found the most romantic Bali escape on your site, complete
                  with luxurious accommodation and unforgettable experiences. It
                  was truly paradise found, at a price that didn&apos;t break
                  the bank!
                </p>
              </div>
            </div>
            <div className="p-4 w-72">
              <div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-6 rounded-lg">
                <Image
                  src="/user/priya.jpg"
                  alt="error"
                  className="w-20 h-20 mb-4 object-cover object-center rounded-full"
                ></Image>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4 font-title">
                  Priya S., Budget Traveler
                </h2>
                <p className="leading-relaxed text-base font-para">
                  Found the perfect Kerala backwaters tour on your site!
                  Affordable, hassle-free, and filled with incredible
                  experiences. Thanks for showing me the hidden beauty of
                  Kerala!
                </p>
              </div>
            </div>
            <div className="p-4 w-72">
              <div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-6 rounded-lg">
                <Image
                  src="/user/rahul.jpg"
                  alt="error"
                  className="w-20 h-20 mb-4 object-cover object-center rounded-full"
                ></Image>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4 font-title">
                  Rahul & Preeti M., Family Travelers
                </h2>
                <p className="leading-relaxed text-base font-para">
                  Booked our dream Ladakh adventure through you. Everything was
                  smooth, and the price fit our budget perfectly. Memories made,
                  smiles guaranteed!art 8-bit waistcoat.
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      {/* </div> */}

      {/* Contact us */}
      <div
        className="w-full px-6 flex justify-center items-center"
        id="contact"
      >
        <div className="hidden lg:flex p-2">
          <Image alt="Contact us" src="images/home_contact.svg" removeWrapper />
        </div>
        <div className="w-full md:w-3/4 justify-center items-center">
          <h1 className="text-3xl text-center font-title">Contact Us</h1>
          <div className="w-full mt-10 flex flex-col gap-6 font-para">
            <input
              ref={nameRef}
              type="name"
              placeholder="Enter Your Name"
              className="px-5 py-2 rounded-lg border-[#1bc48b] border-2 outline-none"
            />
            <input
              ref={emailRef}
              type="email"
              placeholder="example@travelyatri.com"
              className="px-5 py-2 rounded-lg border-[#1bc48b] border-2 outline-none"
            />
            <input
              ref={contactRef}
              type="tel"
              placeholder="Enter Your Phone Number"
              className="px-5 py-2 rounded-lg border-[#1bc48b] border-2 outline-none"
            />
            <textarea
              ref={messageRef}
              placeholder="Enter Your Message"
              className="px-5 py-2 rounded-lg border-[#1bc48b] border-2 outline-none resize-none h-20"
            />

            <Button className="bg-[#1bc48b]" onClick={submit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full py-20">
        <h1 className="text-xl font-semibold text-center md:text-3xl font-title">
          FAQ
        </h1>
        <p className="text-center">Frequently Asked Questions</p>

        <div className="px-6 md:p-0 md:w-4/6 mx-auto mt-6">
          <Accordion variant="bordered">
            <AccordionItem
              key="1"
              aria-label="FAQ1"
              title="1. Are your trips truly affordable?"
            >
              Yes! We understand the importance of budget travel in India. We
              offer a range of pre-planned itineraries at different price
              points, catering to various budgets. Additionally, our
              &quot;Create Trips&quot; section allows you to customize your
              journey within your specific budget constraints.
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="FAQ2"
              title="2. Is it safe to travel in India on a budget?"
            >
              India is generally a safe country for travelers, regardless of
              budget. However, like any place, common sense and basic
              precautions are essential. We provide safety tips and resources on
              our website, and work with reputable local partners who ensure
              your well-being throughout your trip.
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="FAQ3"
              title="3. Do I need to speak Hindi to travel in India?"
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi
              tempore aliquam mollitia amet similique voluptatem dolores hic a
              laboriosam eligendi incidunt at iusto nostrum fugiat itaque,
              quisquam impedit, sunt placeat reprehenderit! Sunt, culpa.
              Exercitationem pariatur consectetur necessitatibus beatae iure
              molestias.
            </AccordionItem>
            <AccordionItem
              key="4"
              aria-label="FAQ4"
              title="4. What kind of experiences can I expect on your trips?"
            >
              Our experiences range from cultural immersions and historical
              explorations to adventure activities and nature getaways. We cater
              to diverse interests and offer both curated and personalized
              options.
            </AccordionItem>
            <AccordionItem
              key="5"
              aria-label="FAQ5"
              title="5. Do you offer deals and discounts?"
            >
              Absolutely! We regularly offer seasonal promotions and partner
              discounts. Sign up for our newsletter or follow us on social media
              to stay updated on the latest deals.
            </AccordionItem>
            <AccordionItem
              key="6"
              aria-label="FAQ6"
              title="6. Can I travel solo using your services?"
            >
              Yes, we have several solo-friendly trip options and resources to
              ensure your safety and comfort while traveling independently.
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <span className="ml-3 text-xl font-title">Travel yatri</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4 font-para">
            {" "}
            2024-2025 &copy; Travel Yatri
          </p>
          <span className="inline-flex gap-4 sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a>
              <Fa6BrandsInstagram className="text-2xl text-gray-500 hover:text-rose-500 cursor-pointer" />
            </a>
            <a>
              <Fa6BrandsFacebook className="text-2xl text-gray-500 hover:text-blue-500 cursor-pointer" />
            </a>
            <a>
              <Fa6BrandsWhatsapp className="text-2xl text-gray-500 hover:text-green-500 cursor-pointer" />
            </a>
          </span>
        </div>
      </footer>
      <Navbar />
    </>
  );
}

interface FeatureCardProps {
  img: string;
  title: string;
  description: string;
}

const FeatureCard = (props: FeatureCardProps) => {
  return (
    <>
      <div className="bg-white flex gap-4 transition-all duration-200  ease-in-out p-4 rounded-md flex-col md:flex-row">
        <div className=" flex-shrink-0">
          <Image
            src={props.img}
            alt="error"
            className="inline-block  w-36 h-36 object-cover object-center rounded-md"
          />
        </div>
        <div>
          <div className="pt-3 text-lg font-semibold text-left">
            {props.title}
          </div>
          <p className=" text-justify text-sm mt-2">{props.description}</p>
        </div>
      </div>
    </>
  );
};

const PriceCard = (props: PriceCard) => {
  const router = useRouter();
  return (
    <Card className=" bg-gray-100 w-64 p-2 shadow-lg transition-all duration-200 ease-in-out  rounded-md mx-auto">
      <Image
        src={props.image}
        alt="error"
        className="w-64 h-48 object-cover object-center inline-block rounded-md"
      ></Image>
      <div>
        <p className="font-semibold mt-2 text-lg font-title">
          Best Trip Available
        </p>
        <h1 className="text-sm font-normal text-gray-600 font-para my-1">
          ₹ {props.price}
        </h1>

        <p className="font-normal text-sm font-para">
          For limited Time only join this lovely trip
        </p>
        <Button
          onClick={() => router.push(`/dashboard/trips/${props.link}`)}
          className="bg-[#1bc48b] w-full mt-4 hover:bg-transparent border-[#1bc48b] border-2 hover:text-[#1bc48b]"
        >
          See More
        </Button>
      </div>
    </Card>
  );
};

type mycusprops = {
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
  six: string;
  seven: string;
};

const mycus = (props: mycusprops) => {};
