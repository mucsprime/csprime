import React from "react";
import Link from "next/link";
import module_info from "../../../../backend/module_info.json";
import module_topic_relations from "../../../../backend/module_topic_relations.json";
import OverviewText from "@/components/OverviewText";

type ModuleTopicKey = keyof typeof module_topic_relations;

// Helper function to format learning outcomes
const formatLearningOutcome = (outcome: string): string => {
  // Remove trailing punctuation and whitespace
  let cleaned = outcome.trim().replace(/[;,.\s]+$/, "");

  // Capitalize first letter
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }

  return cleaned;
};

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
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/modules"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Modules
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            {currentModule.scrapedModuleCodeFromPage}
          </h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6 text-gray-700">
            {currentModule.title}
          </h2>

          {/* Module Info Cards */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 px-2 sm:px-3 py-2 rounded-md border border-blue-200 min-w-0 flex-shrink-0">
              <div className="text-xs font-medium text-blue-800 mb-0.5">
                Credits
              </div>
              <div className="text-sm font-bold text-blue-900">
                {currentModule.credits}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 px-2 sm:px-3 py-2 rounded-md border border-green-200 min-w-0 flex-shrink-0">
              <div className="text-xs font-medium text-green-800 mb-0.5">
                Year
              </div>
              <div className="text-sm font-bold text-green-900">
                {currentModule.year}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 px-2 sm:px-3 py-2 rounded-md border border-purple-200 min-w-0 flex-shrink-0">
              <div className="text-xs font-medium text-purple-800 mb-0.5">
                Semester
              </div>
              <div className="text-sm font-bold text-purple-900">
                {currentModule.semester}
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 px-2 sm:px-3 py-2 rounded-md border border-orange-200 min-w-0 flex-shrink-0">
              <div className="text-xs font-medium text-orange-800 mb-0.5">
                Department
              </div>
              <div className="text-xs font-bold text-orange-900 truncate">
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
              <OverviewText text={currentModule.overview} />
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
                (outcome: string, i: number) => {
                  const formattedOutcome = formatLearningOutcome(outcome);
                  return (
                    <li key={i} className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 text-sm sm:text-base">
                        {formattedOutcome}
                      </span>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>

        {/* Related Modules Section */}
        {moduleRelations && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 mt-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 flex items-center">
              <span className="w-2 h-8 bg-purple-500 rounded-full mr-3"></span>
              Related Modules
            </h3>
            <div className="space-y-4">
              {Object.entries(moduleRelations).map((entry) => (
                <div
                  key={entry[0]}
                  className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0"
                >
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                    {entry[0]}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {entry[1].map((relatedModule) => (
                      <Link
                        href={`/modules/${relatedModule}`}
                        key={entry[0] + relatedModule}
                        className="px-2 py-1 sm:px-2.5 sm:py-1.5 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 rounded-md text-xs font-medium text-purple-800 transition-colors duration-200 whitespace-nowrap"
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
