import React from "react";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="flex justify-between items-center mt-4 mb-16 p-4 max-w-[1100px] w-full">
      <div className="flex items-center w-[200px] gap-2 hover:cursor-pointer text-3xl font-bold">
        <Image src="/download.png" alt="csprime logo" width={50} height={50} />
        CS Prime
      </div>
      <div>
        <ul className="flex gap-4">
          <Link href="/">
            <li className="hover:cursor-pointer">Home</li>
          </Link>
          <Link href="/modules">
            <li className="hover:cursor-pointer">Modules</li>
          </Link>
          <Link href="/topics">
            <li className="hover:cursor-pointer">Topics</li>
          </Link>
          <Link href="/analytics">
            <li className="hover:cursor-pointer">Analytics</li>
          </Link>
        </ul>
      </div>
      <div>
        <ul className="flex justify-around gap-4 w-[200px]">
          <li className="border-gray-400 border-1 py-2 px-4 rounded-lg">
            Login
          </li>
          <li className="bg-black text-white py-2 px-4 rounded-lg">Sign Up</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
