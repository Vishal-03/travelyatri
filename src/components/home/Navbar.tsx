import { backgroundColor } from "@/utils/colors";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="rounded-md py-2 px-6 flex">
            <h2 className="text-white font-semibold text-2xl">Travel Yatri</h2>
            <div className="flex grow justify-center gap-4 items-center text-white text-md font-medium">
                <Link href={"/"}>Home</Link>
                <Link href={"/trips"}>Trips</Link>
                <Link href={"/about"}>About</Link>
                <Link href={"/contact"}>Contact</Link>
            </div>
            <div className="flex items-center gap-2">
                <Link href={"login"} className={`rounded-md border-2 border-white px-6 py-1 text-sm text-white font-medium`}>Login</Link>
                <Link href={"register"} className={`rounded-md border-2 border-white px-6 py-1 text-sm text-white font-medium`}>Register</Link>
            </div>
        </nav>
    )
}

export default Navbar;