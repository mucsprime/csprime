"use client";

import React from "react";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";

function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <div
      className={`flex flex-col items-center min-h-screen ${
        pathName == "/chat" ? "max-h-screen" : ""
      }`}
    >
      <Navbar />
      {children}
    </div>
  );
}

export default MainWrapper;
