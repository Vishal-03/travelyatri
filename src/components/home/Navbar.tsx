"use client";

import { backgroundColor } from "@/utils/colors";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import {
  MaterialSymbolsCloseSmall,
  MaterialSymbolsMenuRounded,
} from "../icons";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white">
        <nav className="rounded-md py-2 px-6 flex items-center">
          <Image
            src="/favicon.png"
            alt="Travel Yatri"
            className="w-10 h-10 flex-shrink-0 hidden md:block"
          />
          <h2 className="text-gray-700 font-semibold text-2xl w-60 cursor-pointer">
            <Link href={"/"}>Travel Yatri</Link>
          </h2>
          <div className="hidden md:flex grow justify-center gap-4 items-center text-black text-md font-medium transition-all duration-300">
            <Link href={"#home"} className="hover:text-[#1bc48b]">
              Home
            </Link>
            <Link href={"#trips"} className="hover:text-[#1bc48b]">
              Trips
            </Link>
            <Link href={"#about"} className="hover:text-[#1bc48b]">
              About
            </Link>
            <Link href={"#contact"} className="hover:text-[#1bc48b]">
              Contact
            </Link>
          </div>
          <div className="md:flex items-center gap-2 w-60 justify-end hidden">
            <Link
              href={"login"}
              className={`rounded-md border-2 hover:text-white hover:bg-[#1bc48b] border-[#1bc48b] px-6 py-1 text-sm text-[#1bc48b] font-medium`}
            >
              Login
            </Link>
            <Link
              href={"register"}
              className={`rounded-md border-2 border-[#1bc48b] px-6 py-1 hover:text-[#1bc48b] hover:bg-white text-sm text-white bg-[#1bc48b] font-medium`}
            >
              Register
            </Link>
          </div>
          <div className="w-full flex md:hidden justify-end text-2xl">
            {isMenuOpen ? (
              <MaterialSymbolsCloseSmall
                className="cursor-pointer"
                onClick={() => setMenuOpen((val) => !val)}
              />
            ) : (
              <MaterialSymbolsMenuRounded
                className="cursor-pointer"
                onClick={() => setMenuOpen((val) => !val)}
              />
            )}
          </div>
        </nav>
      </div>
      {/* {isMenuOpen && ( */}
      <div
        className={`w-60 h-screen md:hidden fixed top-0 left-0 bg-white p-4 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-60"
        }`}
      >
        <div>
          <p className="text-center text-2xl font-semibold">Travel Yatri</p>
        </div>
        <div className="flex flex-col grow gap-4 text-black text-md font-medium md:hidden py-4 ">
          <Link
            href={"#home"}
            className="hover:text-[#1bc48b]"
            onClick={() => setMenuOpen((val) => !val)}
          >
            Home
          </Link>
          <Link
            href={"#trips"}
            className="hover:text-[#1bc48b]"
            onClick={() => setMenuOpen((val) => !val)}
          >
            Trips
          </Link>
          <Link
            href={"#about"}
            className="hover:text-[#1bc48b]"
            onClick={() => setMenuOpen((val) => !val)}
          >
            About
          </Link>
          <Link
            href={"#contact"}
            className="hover:text-[#1bc48b]"
            onClick={() => setMenuOpen((val) => !val)}
          >
            Contact
          </Link>
          <Link
            href={"login"}
            className={`rounded-md border-2 hover:text-white hover:bg-[#1bc48b] border-[#1bc48b] px-6 py-1 text-sm text-[#1bc48b] font-medium`}
          >
            Login
          </Link>
          <Link
            href={"register"}
            className={`rounded-md border-2 border-[#1bc48b] px-6 py-1 hover:text-[#1bc48b] hover:bg-white text-sm text-white bg-[#1bc48b] font-medium`}
          >
            Register
          </Link>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Navbar;
