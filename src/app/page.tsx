"use client"
import { getUser } from '@/actions/user/getuser'
import Navbar from '@/components/home/Navbar'
import { backgroundColor } from '@/utils/colors'
import { Image } from '@nextui-org/react'
import Link from 'next/link'
import { title } from 'process'
import { useEffect } from 'react'


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
export default function Home() {

  const init = async () => {
    const user = await getUser({ userid: 1 });
    console.log(user);
  }
  useEffect(() => {
    init();
  }, []);

  const price: PriceCard[] = [
    {
      title: "Basic",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, voluptatibus.",
      price: 100,
      link: "/login",
      image: "/images/fea1.jpeg"
    },
    {
      title: "Basic",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, voluptatibus.",
      price: 100,
      link: "/login",
      image: "/images/fea1.jpeg"
    },
    {
      title: "Basic",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, voluptatibus.",
      price: 100,
      link: "/login",
      image: "/images/fea1.jpeg"
    },
    {
      title: "Basic",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, voluptatibus.",
      price: 100,
      link: "/login",
      image: "/images/fea1.jpeg"
    }
  ];

  const features: Feature[] = [
    {
      title: "Communication",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure pariatur ex voluptatem consequuntur harum, numquam facere et",
      image: "/images/fea1.jpeg"
    },
    {
      title: "Communication",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure pariatur ex voluptatem consequuntur harum, numquam facere et",
      image: "/images/fea2.jpeg"
    },
    {
      title: "Communication",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure pariatur ex voluptatem consequuntur harum, numquam facere et",
      image: "/images/fea4.jpeg"
    },
    {
      title: "Communication",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure pariatur ex voluptatem consequuntur harum, numquam facere et",
      image: "/images/fea5.jpeg"
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen w-full flex-col gap-6 bg-gray-100">
        <div className="flex sm:flex-row flex-col grow">
          <div className="flex-1 sm:grid place-items-center order-2">
            <div className='p-10 sm:p-20'>
              <div className="font-semibold text-4xl">Let&apos;s Find a Home</div>
              <div className="font-semibold text-4xl">That&apos;s Perfect for you</div>
              <div className="flex flex-col gap-4 mt-4">
                <div className="text-balck">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti illo quos laudantium quidem alias minima inventore recusandae ratione voluptatibus. Quasi!</div>
                <div>

                  <Link href={"/login"} className="mt-6 px-6 py-1 rounded-md text-balck font-semibold shadow-md bg-white">Lets Discuss Travling</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="grid place-items-center flex-1 order-1">
            <Image src='/images/homebg.png' alt='error' className="w-80 sm:w-full h-full" />
          </div>
        </div>
      </div>

      {/* new sec */}

      <div className="flex min-h-screen w-full flex-col items-center gap-5 py-20 px-6">
        <h1 className="text-xl font-bold">What we do?</h1>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, unde?
        </p>


        <div className="flex flex-wrap items-center justify-evenly gap-10 py-8 px-4">

          {features.map((data: Feature, index: number) => <FeatureCard key={index} img={data.image} title={data.title} description={data.description} />)}

        </div>

        <div className=" my-10 flex  w-full flex-col gap-3 py-10">
          <div className="text-2xl font-semibold text-center">Best Trips Available</div>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quo
            repellat remrem dolore voluptatem recusandae excepturi iure
            commodi
          </p>
        </div>

        <div className="flex flex-wrap justify-evenly gap-6">
          {price.map((data: PriceCard, index: number) => <PriceCard key={index} title={data.title} description={data.description} price={data.price} link={data.link} image={data.image} />)}
        </div>
      </div>
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <span className="ml-3 text-xl">Travel yatri</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4"> 2024-2025 &copy; Travel Yatri
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </footer>
    </>
  )
}


interface FeatureCardProps {
  img: string;
  title: string;
  description: string;
}

const FeatureCard = (props: FeatureCardProps) => {
  return (
    <>
      <div className="bg-gray-100 w-60 shadow-lg transition-all duration-200  ease-in-out   hover:bg-white hover:shadow-2xl p-4 rounded-md">
        <Image src={props.img} alt='error' className='w-52 h-40 object-cover object-center rounded-md' />
        <div className="pt-3 text-lg font-semibold text-center">{props.title}</div>
        <p className="text-center text-sm">
          {props.description}
        </p>
      </div>
    </>
  );
}

const PriceCard = (props: PriceCard) => {
  return (
    <>
      <div className="p-4 bg-gray-200 shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:bg-white hover:shadow-2xl">
        <div className=''>
          <Image src={props.image} alt='error' className='w-72 h-48 object-cover object-center inline-block'></Image>
        </div>
        <div>
          <p className="font-semibold mt-2 text-lg">Best Trip Available</p>
          <p className="font-normal text-sm">
            For limited Time only join this lovely trip
          </p>
          <div className="flex mt-4 items-center">
            <h1 className="px-3 text-xl font-bold">$6000</h1>
            <div className="grow"></div>
            <button className=" bg-blue-500 py-1 px-4 text-white">See More</button>
          </div>
        </div>
      </div>
    </>
  );
}