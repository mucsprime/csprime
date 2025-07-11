"use client";

import React, { useState, useEffect } from "react";
import ModuleBlock from "@/components/ModuleBlock";
import module_json from "../../../backend/module_info.json";

const module_entries = Object.entries(module_json);

function Page() {
  const [filter, setFilter] = useState({ keyword: "", year: 0, semester: "0" });
  const [modules, setModules] = useState(module_entries);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved filters from localStorage on component mount
  useEffect(() => {
    const savedFilters = localStorage.getItem("moduleFilters");
    if (savedFilters) {
      try {
        const parsedFilters = JSON.parse(savedFilters);
        setFilter(parsedFilters);
      } catch (error) {
        console.error("Error loading saved filters:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("moduleFilters", JSON.stringify(filter));
    }
  }, [filter, isLoaded]);

  useEffect(() => {
    setModules(() => {
      return module_entries.filter((entry) => {
        let inOutcomes = false;
        if (!(filter.keyword == "")) {
          entry[1].learningOutcomes.forEach((outcome) => {
            if (outcome.includes(filter.keyword)) {
              inOutcomes = true;
            }
          });
          if (
            !inOutcomes &&
            !entry[1].overview
              .toLowerCase()
              .includes(filter.keyword.toLowerCase()) &&
            !entry[1].scrapedModuleCodeFromPage
              .toLowerCase()
              .includes(filter.keyword.toLowerCase())
          ) {
            return false;
          }
        }

        if (!(filter.year == 0)) {
          if (!(entry[1].year == filter.year)) {
            return false;
          }
        }

        if (!(filter.semester == "0")) {
          if (!(entry[1].semester == filter.semester)) {
            return false;
          }
        }

        return true;
      });
    });
  }, [filter]);

  const updateKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => {
      return {
        ...prev,
        keyword: e.target.value,
      };
    });
  };

  const updateYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => {
      return {
        ...prev,
        year: parseInt(e.target.value),
      };
    });
  };

  const updateSemester = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => {
      return {
        ...prev,
        semester: e.target.value,
      };
    });
  };

  const clearFilters = () => {
    setFilter({ keyword: "", year: 0, semester: "0" });
    localStorage.removeItem("moduleFilters");
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Modules
              </label>
              <div className="relative flex-1">
                <input
                  value={filter.keyword}
                  type="text"
                  className="w-full h-full px-3 sm:px-4 py-2 sm:py-3 pl-10 sm:pl-12 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
                  placeholder="Search by module code, title, or learning outcomes..."
                  onChange={(e) => updateKeyword(e)}
                />
                <svg
                  className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Year Filter */}
            <div className="w-full sm:w-32 flex flex-col">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Year
              </label>
              <div className="relative">
                <select
                  onChange={(e) => updateYear(e)}
                  className="w-full flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg focus:outline-none transition-all duration-200 text-sm sm:text-base appearance-none cursor-pointer hover:border-gray-300 focus:border-blue-500 pr-8"
                  value={filter.year}
                >
                  <option value={0}>All Years</option>
                  <option value={1}>1st Year</option>
                  <option value={2}>2nd Year</option>
                  <option value={3}>3rd Year</option>
                  <option value={4}>4th Year</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Semester Filter */}
            <div className="w-full sm:w-40 flex flex-col">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Semester
              </label>
              <div className="relative">
                <select
                  onChange={(e) => updateSemester(e)}
                  className="w-full flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg focus:outline-none transition-all duration-200 text-sm sm:text-base appearance-none cursor-pointer hover:border-gray-300 focus:border-blue-500 pr-8"
                  value={filter.semester}
                >
                  <option value={"0"}>All Semesters</option>
                  <option value={"1"}>Semester 1</option>
                  <option value={"2"}>Semester 2</option>
                  <option value={"Year-Long"}>Year Long</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Clear Button */}
            <div className="flex flex-col">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                &nbsp;
              </label>
              <button
                type="button"
                onClick={clearFilters}
                className="w-full sm:w-auto flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 text-sm"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6 max-w-4xl mx-auto">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {modules.length}
            </span>{" "}
            modules
          </p>
          {(filter.keyword || filter.year !== 0 || filter.semester !== "0") && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                />
              </svg>
              Filters applied
            </div>
          )}
        </div>

        {/* Modules Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {modules.map((module, i) => (
            <ModuleBlock
              key={i}
              code={module[0]}
              title={module[1].title}
              year={module[1].year}
              semester={module[1].semester}
            />
          ))}
        </div>

        {/* Empty State */}
        {modules.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No modules found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-black hover:bg-gray-900 text-white font-semibold rounded-full transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
