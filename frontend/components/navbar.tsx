"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between z-10 items-center mt-4 mb-4 p-4 max-w-[1100px] w-full">
      <Link href="/">
        <div className="flex items-center w-[190px] gap-2 hover:cursor-pointer text-2xl font-bold">
          <Image
            src="/download.png"
            alt="csprime logo"
            width={40}
            height={40}
          />
          CS Prime
        </div>
      </Link>
      <div>
        <ul className="flex gap-2 hidden md:flex">
          <Link href="/" className="p-2 rounded-sm hover:bg-gray-100">
            <li className="hover:cursor-pointer">Home</li>
          </Link>
          <Link href="/modules" className="p-2 rounded-sm hover:bg-gray-100">
            <li className="hover:cursor-pointer">Modules</li>
          </Link>
          <Link href="/topics" className="p-2 rounded-sm hover:bg-gray-100">
            <li className="hover:cursor-pointer">Topics</li>
          </Link>
          <Link href="/analytics" className="p-2 rounded-sm hover:bg-gray-100">
            <li className="hover:cursor-pointer">Analytics</li>
          </Link>
          <Link href="/chat" className="p-2 rounded-sm hover:bg-gray-100">
            <li className="hover:cursor-pointer">Chat</li>
          </Link>
        </ul>
      </div>
      <div>
        <ul className="flex justify-around hidden md:flex lg:gap-4 w-[190px]">
          <SignedOut>
            <li className="border-gray-400 border-1 py-2 px-4 text-center rounded-lg">
              <SignInButton />
            </li>
            <li className="bg-black text-white py-2 px-4 rounded-lg">
              <SignUpButton />
            </li>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </ul>
      </div>
      <div className="text-3xl hover:cursor-pointer flex md:hidden">
        <span onClick={() => setIsOpen((prev) => !prev)}>
          <CiMenuBurger />
        </span>
      </div>
      <div
        className={`flex md:hidden p-8 ${
          !isOpen && "hidden"
        } fixed justify-between top-0 left-0 w-full border-b-1 border-gray-200 bg-white`}
      >
        <ul className="flex flex-col gap-4">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <li className="hover:cursor-pointer">Home</li>
          </Link>
          <Link href="/modules" onClick={() => setIsOpen(false)}>
            <li className="hover:cursor-pointer">Modules</li>
          </Link>
          <Link href="/topics" onClick={() => setIsOpen(false)}>
            <li className="hover:cursor-pointer">Topics</li>
          </Link>
          <Link href="/analytics" onClick={() => setIsOpen(false)}>
            <li className="hover:cursor-pointer">Analytics</li>
          </Link>
          <Link href="/analytics" onClick={() => setIsOpen(false)}>
            <li className="hover:cursor-pointer">Chat</li>
          </Link>
          <li className="border-gray-400 border-1 py-2 px-4 rounded-lg">
            Login
          </li>
          <li className="bg-black text-white py-2 px-4 rounded-lg">Sign Up</li>
        </ul>
        <span
          className="text-4xl hover:cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <IoIosClose />
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
