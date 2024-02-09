import { backgroundColor } from "@/utils/colors";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 w-full bg-white">
            <nav className="rounded-md py-2 px-6 flex">
                <h2 className="text-black font-semibold text-2xl w-60">Travel Yatri</h2>
                <div className="sm:flex grow justify-center gap-4 items-center text-black text-md font-medium hidden ">
                    <Link href={"#home"}>Home</Link>
                    <Link href={"#trips"}>Trips</Link>
                    <Link href={"#about"}>About</Link>
                    <Link href={"#contact"}>Contact</Link>
                </div>
                <div className="flex items-center gap-2 w-60 justify-end">
                    <Link href={"login"} className={`rounded-md border-2 border-black px-6 py-1 text-sm text-black font-medium`}>Login</Link>
                    <Link href={"register"} className={`rounded-md border-2 border-black px-6 py-1 text-sm text-black font-medium`}>Register</Link>
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