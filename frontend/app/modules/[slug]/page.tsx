import React from "react";
import Link from "next/link";
import module_info from "../../../../backend/module_info.json";
import module_topic_relations from "../../../../backend/module_topic_relations.json";

type ModuleTopicKey = keyof typeof module_topic_relations;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const moduleKey = slug.toUpperCase() as keyof typeof module_info;

  if (Object.keys(module_info).includes(slug.toUpperCase())) {
    const currentModule = module_info[moduleKey];
    const moduleRelations =
      module_topic_relations[moduleKey as ModuleTopicKey] || null;

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            {currentModule.scrapedModuleCodeFromPage}
          </h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6 text-gray-700">
            {currentModule.title}
          </h2>

          {/* Module Info Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 rounded-lg border border-blue-200">
              <div className="text-xs sm:text-sm font-medium text-blue-800 mb-1">
                Credits
              </div>
              <div className="text-lg sm:text-xl font-bold text-blue-900">
                {currentModule.credits}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 rounded-lg border border-green-200">
              <div className="text-xs sm:text-sm font-medium text-green-800 mb-1">
                Year
              </div>
              <div className="text-lg sm:text-xl font-bold text-green-900">
                {currentModule.year}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 rounded-lg border border-purple-200">
              <div className="text-xs sm:text-sm font-medium text-purple-800 mb-1">
                Semester
              </div>
              <div className="text-lg sm:text-xl font-bold text-purple-900">
                {currentModule.semester}
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 sm:p-4 rounded-lg border border-orange-200">
              <div className="text-xs sm:text-sm font-medium text-orange-800 mb-1">
                Department
              </div>
              <div className="text-sm sm:text-base font-bold text-orange-900 truncate">
                {currentModule.department}
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Overview Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 flex items-center">
              <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
              Overview
            </h3>
            <div className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {currentModule.overview}
            </div>
          </div>

          {/* Learning Outcomes Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 flex items-center">
              <span className="w-2 h-8 bg-green-500 rounded-full mr-3"></span>
              Learning Outcomes
            </h3>
            <ul className="space-y-3">
              {currentModule.learningOutcomes.map(
                (outcome: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 text-sm sm:text-base">
                      {outcome}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Related Modules Section */}
        {moduleRelations && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 mt-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900 flex items-center">
              <span className="w-2 h-8 bg-purple-500 rounded-full mr-3"></span>
              Related Modules by Topic
            </h3>
            <div className="space-y-6">
              {Object.entries(moduleRelations).map((entry) => (
                <div
                  key={entry[0]}
                  className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
                >
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
                    {entry[0]}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {entry[1].map((relatedModule) => (
                      <Link
                        href={`/modules/${relatedModule}`}
                        key={entry[0] + relatedModule}
                        className="px-3 py-2 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 rounded-lg text-sm font-medium text-purple-800 transition-colors duration-200"
                      >
                        {relatedModule}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return <div>Module Not Found</div>;
}
