"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm flex justify-between items-center px-6 py-3 w-full">
      <Link
        href="/"
        className="flex items-center gap-3 hover:opacity-80 transition"
      >
        <GraduationCap size={28} className="text-black" />
        <span className="text-xl font-extrabold tracking-tight">CSPrime</span>
      </Link>
      <div>
        <ul className="flex gap-2 hidden md:flex items-center">
          <Link
            href="/"
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              pathname == "/"
                ? "bg-black text-white shadow-sm"
                : "hover:bg-gray-100 text-gray-900"
            }`}
          >
            <li className="hover:cursor-pointer">Home</li>
          </Link>
          <Link
            href="/modules"
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              pathname.includes("modules")
                ? "bg-black text-white shadow-sm"
                : "hover:bg-gray-100 text-gray-900"
            }`}
          >
            <li className="hover:cursor-pointer">Modules</li>
          </Link>
          <Link
            href="/topics"
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              pathname == "/topics"
                ? "bg-black text-white shadow-sm"
                : "hover:bg-gray-100 text-gray-900"
            }`}
          >
            <li className="hover:cursor-pointer">Topics</li>
          </Link>
          <Link
            href="/chat"
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              pathname == "/chat"
                ? "bg-black text-white shadow-sm"
                : "hover:bg-gray-100 text-gray-900"
            }`}
          >
            <li className="hover:cursor-pointer">Chat</li>
          </Link>
          <li className="relative">
            <button
              className="px-4 py-2 rounded-full font-medium transition-all hover:bg-gray-100 flex items-center gap-1 text-gray-900"
              onClick={() => setMoreOpen((prev) => !prev)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              aria-haspopup="true"
              aria-expanded={moreOpen}
              type="button"
            >
              More
              <span className="ml-1">▼</span>
            </button>
            {moreOpen && (
              <ul className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-2">
                <Link
                  href="/analytics"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMoreOpen(false)}
                >
                  <li className="hover:cursor-pointer">Analytics</li>
                </Link>
                <Link
                  href="/faq"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMoreOpen(false)}
                >
                  <li className="hover:cursor-pointer">FAQ</li>
                </Link>
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex justify-end hidden md:flex lg:gap-4 min-w-[160px]">
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
      <button
        className="text-3xl hover:cursor-pointer flex md:hidden p-2"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <CiMenuBurger />
      </button>
      <div
        id="mobile-menu"
        className={`flex md:hidden p-8 ${
          !isOpen && "hidden"
        } fixed justify-between top-0 left-0 w-full border-b-1 border-gray-200 bg-white z-40`}
      >
        <ul className="flex flex-col gap-4 w-full">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <li className="hover:cursor-pointer px-4 py-2 rounded-full font-medium transition-all hover:bg-gray-100">
              Home
            </li>
          </Link>
          <Link href="/modules" onClick={() => setIsOpen(false)}>
            <li className="hover:cursor-pointer px-4 py-2 rounded-full font-medium transition-all hover:bg-gray-100">
              Modules
            </li>
          </Link>
          <Link href="/topics" onClick={() => setIsOpen(false)}>
            <li className="hover:cursor-pointer px-4 py-2 rounded-full font-medium transition-all hover:bg-gray-100">
              Topics
            </li>
          </Link>
          <Link href="/faq" onClick={() => setIsOpen(false)}>
            <li className="hover:cursor-pointer px-4 py-2 rounded-full font-medium transition-all hover:bg-gray-100">
              FAQ
            </li>
          </Link>
          <Link href="/analytics" onClick={() => setIsOpen(false)}>
            <li className="hover:cursor-pointer px-4 py-2 rounded-full font-medium transition-all hover:bg-gray-100">
              Analytics
            </li>
          </Link>
          <Link href="/chat" onClick={() => setIsOpen(false)}>
            <li className="hover:cursor-pointer px-4 py-2 rounded-full font-medium transition-all hover:bg-gray-100">
              Chat
            </li>
          </Link>
          <SignedOut>
            <li className="border-gray-400 border-1 py-2 px-4 text-center rounded-lg">
              <SignInButton />
            </li>
            <li className="bg-black text-white py-2 px-4 rounded-lg">
              <SignUpButton />
            </li>
          </SignedOut>
          <SignedIn>
            <li className="px-4 py-2">
              <UserButton />
            </li>
          </SignedIn>
        </ul>
        <button
          className="text-4xl hover:cursor-pointer p-2"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Close mobile menu"
        >
          <IoIosClose />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
