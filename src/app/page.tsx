"use client"
import Navbar from '@/components/home/Navbar'
import { backgroundColor } from '@/utils/colors'
import { Image } from '@nextui-org/react'
import Link from 'next/link'

export default function Home() {
  return (

    <>
      <main className={`bg-[${backgroundColor}] min-h-screen `}>
        <div className=''>

          <div className=" min-h-screen w-full">

            <div className='absolute top-6 left-0 w-full px-4'>

              <Navbar />
            </div>
            {/* Welcome */}
            <div className=" flex items-center justify-center h-screen bg-gradient-to-t from-rose-600 to-rose-400">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white3 mx-auto text-white">Welcome to TravelYatri</h1>
                <p className="text-lg font-normal text-white mt-4 md:w-4/6 mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi molestiae nesciunt corporis illo, obcaecati hic vitae ut dolorem vero at, fugit itaque tempore, iste facilis velit ea recusandae! Repellendus eligendi expedita quae consequuntur quam error facilis unde fugiat veritatis, incidunt deleniti </p>
              </div>
            </div>


            {/* <Hometrips></Hometrips> */}



            <div className="flex flex-col min-h-screen w-full justify-center items-center gap-10">
              <div>
                <h1 className="text-rose-500 text-4xl font-extrabold mt-10 ">Our Top Trips</h1>
              </div>

              <div>
                <p className=" text-black font-serif ">We have a few specail permotion for our faithfull trip</p>
              </div>

              <div className="flex gap-20  flex-col lg:flex-row ">

                <Link href='/Trips/items' className="bg-gray-200  w-80 flex flex-col gap-3 p-3 cursor-pointer rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                  <div className="grow">
                    <Image src="/images/banner1.jpg" alt="" className="w-full h-full rounded-lg  " />

                  </div>
                  <div>
                    <h1 className="text-rose-500 font-serif text-2xl">Travel</h1>
                  </div>
                  <div>
                    <p className="text-black font-serif ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi velit iusto quam possimus dolores amet.</p>
                  </div>
                  <div>
                    <p className="text-black font-bold text-lg">5000</p>
                  </div>
                </Link>

                <Link href='/Trips/items' className="  bg-gray-200 w-80 flex flex-col gap-3 p-3 cursor-pointer rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                  <div className="grow ">
                    <Image src="/images/banner2.jpg" alt="" className="w-full h-full rounded-lg  " />
                  </div>
                  <div>
                    <h1 className="text-rose-500 font-serif text-2xl">Beach</h1>
                  </div>
                  <div>
                    <p className="text-black font-serif ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi velit iusto quam possimus dolores amet.</p>
                  </div>
                  <div>
                    <p className="text-black font-bold text-lg">5000</p>
                  </div>
                </Link>

                <Link href='/Trips/items' className="bg-gray-200 w-80 flex flex-col gap-3 p-3 cursor-pointer rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                  <div className="grow ">
                    <Image src="/images/banner3.jpg" alt="" className="w-full h-full rounded-lg  " />
                  </div>
                  <div>
                    <h1 className="text-rose-500 font-serif text-2xl">Mountain</h1>
                  </div>
                  <div>
                    <p className="text-black font-serif ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi velit iusto quam possimus dolores amet.</p>
                  </div>
                  <div>
                    <p className="text-black font-bold text-lg">5000</p>
                  </div>
                </Link>
              </div>

              <div >
                <Link href="Trips" className="block px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-red-500  text-center text-white hover:scale-110 transition-all duration-300 ease-in-out font-semibold">See All</Link>
              </div>
            </div>









            {/* <Service></Service> */}

            <div className="flex flex-col  w-full   justify-center items-center p-10 gap-10 ">
              <div>
                <h1 className="font-extrabold text-rose-500 text-4xl ">Our Services</h1>
              </div>

              <div className="flex lg:gap-56 grow items-center justify-center flex-col-reverse lg:flex-row gap-10">

                <div className="">
                  <div>
                    <h2 className=" font-serif text-black text-lg">Service</h2>
                  </div>
                  <div className=" space-x-3">
                    <h3 className="text-black font-serif text-6xl inline-block">Create </h3>
                    <h4 className="text-rose-500 font-serif text-6xl inline-block"> Trips</h4>
                  </div>
                  <div className="pt-6">
                    <span className="text-black font-serif text-4xl  block">Lorem ipsum, dolor sit amet  </span>
                    <span className="text-black font-serif text-4xl  block">consectetur adipisicing elit.</span>
                    <span className="text-black font-serif text-4xl  block">Amet, cum!</span>
                  </div>
                  <div className="pt-4">
                    <button className="block px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-red-500 text-center text-white hover:scale-110 transition-all duration-300 ease-in-out font-semibold" >Read More</button>
                  </div>
                </div>

                <div className="w-96">
                  <Image src="/images/banner1.jpg" alt="" className="h-full w-full rounded-2xl hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer" />


                </div>

              </div>
            </div>


            <div className="flex flex-col  w-full   justify-center items-center p-10 ">


              <div className="flex lg:gap-56 grow items-center justify-center flex-col lg:flex-row gap-10">


                <div className="w-96">
                  <Image src="/images/banner2.jpg" alt="" className="h-full w-full rounded-2xl hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer" />
                </div>

                <div className="">
                  <div>
                    <h2 className=" font-serif text-black text-lg">Service</h2>
                  </div>
                  <div className="space-x-3">
                    <h3 className="text-black font-serif text-4xl lg:text-6xl inline-block">Buy</h3>
                    <h4 className="text-rose-500 font-serif text-4xl lg:text-6xl inline-block">Trips</h4>
                  </div>
                  <div className="pt-6">
                    <span className="text-black font-serif text-4xl  block">Lorem ipsum, dolor sit   </span>
                    <span className="text-black font-serif text-4xl  block">consectetur adipisicing elit.</span>
                    <span className="text-black font-serif text-4xl  block">Amet, cum!</span>
                  </div>
                  <div className="pt-4">
                    <button className="block px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-red-500 text-center text-white hover:scale-110 transition-all duration-300 ease-in-out font-semibold" >Read More</button>
                  </div>
                </div>



              </div>
            </div>


          </div>






        </div>
      </main>
    </>
  )
}
