import { backgroundColor } from "@/utils/colors";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md rounded-md py-2 px-6 flex">
            <h2 className="text-xl font-medium text-slate-800">Travel Yatri</h2>
            <div className="flex grow justify-center gap-4 items-center">
                <Link href={"/"} className="text-sm font-medium text-slate-800">Home</Link>
                <Link href={"/trips"}>Trips</Link>
                <Link href={"/about"}>About</Link>
                <Link href={"/contact"}>Contact</Link>
            </div>
            <div className="flex items-center gap-2">
                <Link href={"login"} className={`rounded-md bg-blue-500 px-6 py-1 text-sm text-white font-medium`}>Login</Link>
                <Link href={"register"} className={`rounded-md bg-blue-500 px-6 py-1 text-sm text-white font-medium`}>Register</Link>
            </div>
        </nav>
    )
}

export default Navbar;