import { backgroundColor } from "@/utils/colors";
import { Image } from "@nextui-org/react";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 w-full bg-white">
            <nav className="rounded-md py-2 px-6 flex items-center">
                <Image src="/favicon.png" alt="Travel Yatri" className="w-10 h-10 flex-shrink-0" />
                <h2 className="text-gray-700 font-semibold text-2xl w-60">Travel Yatri</h2>
                <div className="sm:flex grow justify-center gap-4 items-center text-black text-md font-medium hidden ">
                    <Link href={"#home"} className="hover:text-[#13c788] hover:scale-110">Home</Link>
                    <Link href={"#trips"} className="hover:text-[#13c788] hover:scale-110">Trips</Link>
                    <Link href={"#about"} className="hover:text-[#13c788] hover:scale-110">About</Link>
                    <Link href={"#contact"} className="hover:text-[#13c788] hover:scale-110">Contact</Link>
                </div>
                <div className="flex items-center gap-2 w-60 justify-end">
                    <Link href={"login"} className={`rounded-md border-2 hover:text-white hover:bg-[#13c788] border-[#13c788] px-6 py-1 text-sm text-[#13c788] font-medium`}>Login</Link>
                    <Link href={"register"} className={`rounded-md border-2 border-[#13c788] px-6 py-1 hover:text-[#13c788] hover:bg-white text-sm text-white bg-[#13c788] font-medium`}>Register</Link>
                </div>
            </nav>
            <div className="flex grow justify-center gap-4 items-center text-black text-md font-medium sm:hidden py-4 ">
                <Link href={"/"}>Home</Link>
                <Link href={"/trips"}>Trips</Link>
                <Link href={"/about"}>About</Link>
                <Link href={"/contact"}>Contact</Link>
            </div>
        </div>
    )
}

export default Navbar;