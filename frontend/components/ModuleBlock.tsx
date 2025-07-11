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

const getYearColor = (year: number) => {
  switch (year) {
    case 1:
      return "bg-blue-100 text-blue-800 border-blue-200";
    case 2:
      return "bg-green-100 text-green-800 border-green-200";
    case 3:
      return "bg-purple-100 text-purple-800 border-purple-200";
    case 4:
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getSemesterColor = (semester: string) => {
  switch (semester) {
    case "1":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "2":
      return "bg-pink-100 text-pink-800 border-pink-200";
    case "Year-Long":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
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
      className="group bg-white/80 backdrop-blur-sm border border-gray-200 p-6 rounded-xl w-full sm:w-[48%] md:w-[32%] lg:w-[31%] xl:w-[30%] min-w-[280px] max-w-[400px] hover:shadow-lg hover:shadow-gray-200/50 hover:scale-[1.02] hover:bg-white/90 transition-all duration-300 relative overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header with module code */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {code}
          </h3>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Module title */}
        <h4 className="text-sm text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">
          {title}
        </h4>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-auto">
          <Badge
            variant="outline"
            className={`text-xs font-medium border ${getYearColor(year)}`}
          >
            {parseYear(year)}
          </Badge>
          <Badge
            variant="outline"
            className={`text-xs font-medium border ${getSemesterColor(
              semester
            )}`}
          >
            {semester !== "Year-Long" ? `Sem ${semester}` : "Year-Long"}
          </Badge>
        </div>
      </div>
    </Link>
  );
}

export default ModuleBlock;
