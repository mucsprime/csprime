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
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-center mb-2">
          {currentModule.scrapedModuleCodeFromPage}: {currentModule.title}
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
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
        <div className="p-8 mt-8 max-w-[1000px] w-full rounded-lg border-1 border-gray-300">
          <h3 className="text-xl mb-2">Overview</h3>
          {currentModule.overview}
        </div>
        <div className="p-8 mt-8 max-w-[1000px] w-full rounded-lg border-1 border-gray-300">
          <h3 className="text-xl mb-2">Learning Outcomes</h3>
          <ul>
            {currentModule.learningOutcomes.map(
              (outcome: string, i: number) => (
                <li key={i}>{outcome}</li>
              )
            )}
          </ul>
        </div>
        {moduleRelations && (
          <div className="px-8 py-4 mt-8 max-w-[1000px] mb-8 rounded-lg border-1 border-gray-300">
            <table>
              <thead>
                <tr>
                  <th className="text-lg font-medium mb-2 pb-2 text-left">
                    Topic
                  </th>
                  <th className="text-lg font-medium mb-2 text-left pl-2 pb-2">
                    Related Modules
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(moduleRelations).map((entry) => (
                  <tr key={entry[0]} className="border-t-1 pb-8">
                    <td className="border-r-1 pr-4">{entry[0]}</td>
                    <td className="flex flex-wrap">
                      {entry[1].map((relatedModule) => (
                        <Link
                          href={`/modules/${relatedModule}`}
                          key={entry[0] + relatedModule}
                          className="p-2 m-2 bg-gray-100 rounded-lg"
                        >
                          <span>{relatedModule}</span>
                        </Link>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return <div>Module Not Found</div>;
}
