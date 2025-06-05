import React from "react";
import Link from "next/link";

function ModuleBlock({ code, title }: { code: string; title: string }) {
  return (
    <Link
      href={`/modules/${code}`}
      className="flex flex-col justify-around bg-white/60 border-gray-200 border-1 p-8 mb-8 rounded-2xl w-[32%] shadow-lg text-center"
    >
      <div>
        <span className="font-bold">{code}</span>
        <p>{title}</p>
      </div>
    </Link>
  );
}

export default ModuleBlock;
