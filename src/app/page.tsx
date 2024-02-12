"use client"
import { getUser } from '@/actions/user/getuser'
import Navbar from '@/components/home/Navbar'
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, Image } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Autoplay from "embla-carousel-autoplay"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


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
  const route = useRouter();

  const init = async () => {
    const user = await getUser({ userid: 1 });
  }
  useEffect(() => {
    init();
  }, []);



  const slider: Feature[] = [
    {
      title: "banner one",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, voluptatibus.",
      image: "/images/banner1.jpg"
    },
    {
      title: "banner two",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, voluptatibus.",
      image: "/images/banner2.jpg"
    },
    {
      title: "banner three",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, voluptatibus.",
      image: "/images/banner3.jpg"
    },
    {
      title: "banner four",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, voluptatibus.",
      image: "/images/fea1.jpeg"
    },
    {
      title: "banner five",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, voluptatibus.",
      image: "/images/fea2.jpeg"
    },
  ];
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

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <>
      <div className='grid place-items-center' id='home'>
        <Carousel setApi={setApi} className="w-full"
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >
          <CarouselContent>
            {slider.map((value: Feature, index) => (
              <CarouselItem key={index} className='w-full h-screen relative'>
                <Image src={value.image} alt='error' className='relative object-cover object-center h-screen w-screen'></Image>
                <div className='w-full h-40 absolute bottom-0 left-0 bg-gradient-to-b from-transparent to-slate-700 flex flex-col pb-10'>
                  <div className="grow"></div>
                  <h1 className='text-center text-2xl text-white'>{value.title}</h1>
                  <p className='text-center text-sm w-4/6 mx-auto text-white mb-4'>{value.description}</p>
                </div>
                <CarouselNext className='absolute top-[50%] right-6' />
                <CarouselPrevious className='absolute top-[50%] left-6' />

              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex min-h-screen w-full flex-col gap-6 bg-gray-100" id='about'>
        <div className="flex sm:flex-row flex-col grow">
          <div className="flex-1 sm:grid place-items-center order-2">
            <div className='p-10 sm:p-20'>
              <div className="font-semibold text-4xl">Let&apos;s Find a Home</div>
              <div className="font-semibold text-4xl">That&apos;s Perfect for you</div>
              <div className="flex flex-col gap-4 mt-4">
                <div className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti illo quos laudantium quidem alias minima inventore recusandae ratione voluptatibus. Quasi!</div>
                <div>
                  <Button onClick={() => route.push("/login")} className='bg-[#13c788]' >Lets Discuss Travling</Button>
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

      <div className="min-h-screen w-full flex-col items-center py-20 px-6">
        <h1 className="text-xl font-semibold text-center">What we do?</h1>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, unde?
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-10 py-4 md:w-5/6 lg:w-4/6 mx-auto md:p-0 p-10 mt-6">
          {features.map((data: Feature, index: number) => <FeatureCard key={index} img={data.image} title={data.title} description={data.description} />)}
        </div>
      </div>

      <div className='relative h-full'>
        <div className='w-full h-auto lg:h-screen absolute top-0 left-0 hidden lg:block'>
          <Image src='/images/homebanner.jpg' alt='error' className='w-screen h-full lg:h-screen object-cover inline-block object-center' />
        </div>
        <div className='relative top-0 left-0 h-auto lg:h-screen w-full'>
          <div className=" my-10 w-full py-10" id='trips'>
            <div className="text-2xl font-semibold text-center lg:text-white">Best Trips Available</div>
            <p className="text-center lg;text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quo
              repellat remrem dolore voluptatem recusandae excepturi iure
              commodi
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {price.map((data: PriceCard, index: number) => <PriceCard key={index} title={data.title} description={data.description} price={data.price} link={data.link} image={data.image} />)}
          </div>
        </div>
      </div>

      <div className='py-10 px-6 mt-10'>
        <h1 className="text-xl font-semibold text-center">Testimonial</h1>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, unde?
        </p>
        <div className="flex flex-wrap mt-10">
          <div className="xl:w-1/4 md:w-1/2 p-4">
            <div className="bg-[#bff2e1] p-6 rounded-lg">
              <Image src='/images/user.png' alt='error' className='w-20 h-20 mb-4' ></Image>
              <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Chichen Itza</h2>
              <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
            </div>
          </div>
          <div className="xl:w-1/4 md:w-1/2 p-4">
            <div className="bg-[#bff2e1] p-6 rounded-lg">
              <Image src='/images/user.png' alt='error' className='w-20 h-20 mb-4' ></Image>
              <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Chichen Itza</h2>
              <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
            </div>
          </div>
          <div className="xl:w-1/4 md:w-1/2 p-4">
            <div className="bg-[#bff2e1] p-6 rounded-lg">
              <Image src='/images/user.png' alt='error' className='w-20 h-20 mb-4' ></Image>
              <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Chichen Itza</h2>
              <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
            </div>
          </div>
          <div className="xl:w-1/4 md:w-1/2 p-4">
            <div className="bg-[#bff2e1] p-6 rounded-lg">
              <Image src='/images/user.png' alt='error' className='w-20 h-20 mb-4' ></Image>
              <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Chichen Itza</h2>
              <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-gray-600 body-font" id='contact'>
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
      <Navbar />
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
      <div className="bg-white flex gap-4 shadow-lg transition-all duration-200  ease-in-out hover:bg-gradient-to-t hover:from-[#d3f7eb] hover:to-[#bff2e1]   hover:bg-[#d3f7eb] hover:shadow-2xl p-4 rounded-md">
        <div className=" flex-shrink-0">
          <Image src={props.img} alt='error' className='inline-block  w-36 h-36 object-cover object-center rounded-md' />
        </div>
        <div>

          <div className="pt-3 text-lg font-semibold text-left">{props.title}</div>
          <p className=" text-justify text-sm mt-2">
            {props.description}
          </p>
        </div>
      </div>
    </>
  );
}

const PriceCard = (props: PriceCard) => {
  const router = useRouter();
  return (
    <Card className=' bg-gray-100 w-64 p-2 shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:bg-white hover:shadow-2xl rounded-md'>
      <Image src={props.image} alt='error' className='w-64 h-48 object-cover object-center inline-block rounded-md'></Image>
      <div>
        <p className="font-semibold mt-2 text-lg">Best Trip Available</p>
        <h1 className="text-sm font-normal text-gray-600">$6000</h1>

        <p className="font-normal text-sm">
          For limited Time only join this lovely trip
        </p>
        <Button onClick={() => router.push("/login")} className='bg-[#13c788] w-full mt-4'>See More</Button>
      </div>
    </Card>
  );
}