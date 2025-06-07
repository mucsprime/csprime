import React from "react";
import module_info from "@/public/module_info.json";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const moduleKey = slug.toUpperCase() as keyof typeof module_info;

  if (Object.keys(module_info).includes(slug.toUpperCase())) {
    const currentModule = module_info[moduleKey];

    return (
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-center mb-2">
          {currentModule.scrapedModuleCodeFromPage}: {currentModule.title}
        </h2>
        <div className="flex gap-2">
          <div className="bg-gray-100 p-2 rounded-lg">
            Credits: {currentModule.credits}
          </div>
          <div className="bg-gray-100 p-2 rounded-lg">
            Year: {currentModule.year}
          </div>
          <div className="bg-gray-100 p-2 rounded-lg">
            Semester: {currentModule.semester}
          </div>
          <div className="bg-gray-100 p-2 rounded-lg">
            Department: {currentModule.department}
          </div>
        </div>
        <div className="p-8 mt-8 max-w-[1000px] w-full rounded-lg border-1 border-gray-200">
          <h3 className="text-xl mb-2">Overview</h3>
          {currentModule.overview}
        </div>
        <div className="p-8 mt-8 max-w-[1000px] w-full rounded-lg border-1 border-gray-200">
          <h3 className="text-xl mb-2">Learning Outcomes</h3>
          <ul>
            {currentModule.learningOutcomes.map(
              (outcome: string, i: number) => (
                <li key={i}>{outcome}</li>
              )
            )}
          </ul>
        </div>
      </div>
    );
  }

  return <div>Module Not Found</div>;
}
