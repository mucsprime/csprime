"use client";

import React, { useState, useEffect } from "react";
import ModuleBlock from "@/components/ModuleBlock";
import module_json from "../../../backend/module_info.json";

const module_entries = Object.entries(module_json);

function Page() {
  const [filter, setFilter] = useState({ keyword: "", year: 0, semester: "0" });
  const [modules, setModules] = useState(module_entries);

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

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex justify-center w-4/5 sm:w-fit mt-10">
        <form className="flex flex-col sm:flex-row flex-wrap px-8 py-2 mb-4 justify-center items-start sm:items-center gap-4 border-1 border-gray-300 shadow-md rounded-3xl">
          <span className="flex flex-col sm:border-r-1">
            <label htmlFor="keyword" className="font-semibold text-xs">
              Keyword
            </label>
            <input
              value={filter.keyword}
              name="keyword"
              type="text"
              className="border-gray-200 outline-none"
              placeholder="Enter keyword"
              onChange={(e) => updateKeyword(e)}
            />
          </span>
          <span className="flex flex-col pr-4 sm:border-r-1">
            <label htmlFor="year" className="font-semibold text-xs">
              Year
            </label>
            <select
              onChange={(e) => updateYear(e)}
              name="year"
              className="w-[100px] outline-none"
              value={filter.year}
            >
              <option value={0}>All</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </span>
          <span className="flex flex-col">
            <label htmlFor="semester" className="font-semibold text-xs">
              Semester
            </label>
            <select
              onChange={(e) => updateSemester(e)}
              name="semester"
              className="w-[100px] outline-none"
              value={filter.semester}
            >
              <option value={"0"}>All</option>
              <option value={"1"}>1</option>
              <option value={"2"}>2</option>
              <option value={"Year-Long"}>Year Long</option>
            </select>
          </span>
        </form>
      </div>
      <div className="flex w-full p-2 sm:p-4 justify-center sm:justify-around flex-wrap gap-4">
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
    </div>
  );
}

export default Page;
