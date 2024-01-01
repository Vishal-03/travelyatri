import Navbar from '@/components/home/Navbar'
import { backgroundColor } from '@/utils/colors'
import Image from 'next/image'

export default function Home() {
  return (

    <>
      <main className={`bg-[${backgroundColor}] min-h-screen`}>
        <div className='py-6 px-4'>

          <Navbar />
        </div>
      </main>
    </>
  )
}
