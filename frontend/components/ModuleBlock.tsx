import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const parseYear = (year: number) => {
  switch (year) {
    case 1:
      return "1st Year";

    case 2:
      return "2nd Year";

    case 3:
      return "3rd Year";

    case 4:
      return "4th Year";

    default:
      break;
  }
};

function ModuleBlock({
  code,
  title,
  year,
  semester,
}: {
  code: string;
  title: string;
  year: number;
  semester: string;
}) {
  return (
    <Link
      href={`/modules/${code}`}
      className="flex flex-col justify-around bg-white/60 border-gray-200 border-1 p-8 mb-8 rounded-2xl w-[32%] min-w-[300px] shadow-lg text-center"
    >
      <div className="flex flex-col items-center">
        <span className="font-bold">{code}</span>
        <p>{title}</p>
        <div className="flex gap-2">
          <Badge variant="outline">{parseYear(year)}</Badge>
          <Badge variant="outline">
            {semester != "Year-Long" ? `Semester ${semester}` : "Year-Long"}
          </Badge>
        </div>
      </div>
    </Link>
  );
}

export default ModuleBlock;
