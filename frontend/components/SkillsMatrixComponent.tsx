"use client";

import React, { useState } from "react";

interface SkillModule {
  skill: string;
  modules: Array<{
    code: string;
    description: string;
  }>;
  importance: number;
}

const skillsData: SkillModule[] = [
  {
    skill: "Software Engineering",
    importance: 95,
    modules: [
      {
        code: "CS335",
        description:
          "Understanding of various Agile frameworks like Scrum, Software Testing",
      },
      { code: "CS264", description: "Software Design" },
    ],
  },
  {
    skill: "OOP",
    importance: 90,
    modules: [
      {
        code: "CS162",
        description: "Advanced Java programming concepts emphasizing OOP",
      },
      {
        code: "CS210",
        description: "OOP approach to data abstraction and structure",
      },
      { code: "CS211", description: "Advanced data structures in OOP context" },
      { code: "CS230", description: "OOP design for web development" },
      { code: "CS264", description: "OOP software design methodologies" },
    ],
  },
  {
    skill: "Web Development",
    importance: 85,
    modules: [{ code: "CS230", description: "Web Information Processing" }],
  },
  {
    skill: "Database Management",
    importance: 80,
    modules: [
      {
        code: "CS130",
        description: "Entity-Relationship Diagrams, SQL, Databases",
      },
      { code: "CS230", description: "MongoDB, HTML, CSS, JavaScript" },
    ],
  },
  {
    skill: "Version Control",
    importance: 75,
    modules: [
      { code: "CS363", description: "Proficiency in using tools like Git" },
      { code: "CS430", description: "Git distributed source control system" },
    ],
  },
  {
    skill: "Machine Learning",
    importance: 70,
    modules: [
      {
        code: "CS401",
        description: "Machine learning algorithms & neural networks",
      },
    ],
  },
  {
    skill: "Agile Methodologies",
    importance: 65,
    modules: [
      { code: "CS335", description: "Software Engineering & Software Process" },
      {
        code: "CS280",
        description: "User Experience (UX), UI and Interaction Design",
      },
    ],
  },
  {
    skill: "Software Testing",
    importance: 60,
    modules: [
      { code: "CS265", description: "Software Testing" },
      {
        code: "CS335",
        description: "Agile frameworks like Scrum, Software Testing",
      },
    ],
  },
  {
    skill: "Network Security",
    importance: 55,
    modules: [{ code: "CS416", description: "Cryptography" }],
  },
  {
    skill: "Project Management",
    importance: 50,
    modules: [
      { code: "CS353", description: "Teamwork, Agile and Project Management" },
      { code: "CS363", description: "Industrial Work Placement" },
    ],
  },
];

const SkillsMatrixComponent: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const getImportanceColor = (importance: number) => {
    if (importance >= 90) return "bg-red-500";
    if (importance >= 80) return "bg-orange-500";
    if (importance >= 70) return "bg-yellow-500";
    if (importance >= 60) return "bg-blue-500";
    return "bg-green-500";
  };

  const getImportanceText = (importance: number) => {
    if (importance >= 90) return "Critical";
    if (importance >= 80) return "Very High";
    if (importance >= 70) return "High";
    if (importance >= 60) return "Medium";
    return "Low";
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Skills Importance Matrix
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {skillsData.map((skill) => (
            <button
              key={skill.skill}
              onClick={() =>
                setSelectedSkill(
                  selectedSkill === skill.skill ? null : skill.skill
                )
              }
              className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedSkill === skill.skill
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="hidden sm:inline">{skill.skill}</span>
              <span className="sm:hidden">{skill.skill.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Skill
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Importance
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Modules
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {skillsData.map((skill) => (
              <tr
                key={skill.skill}
                className={`${
                  selectedSkill === skill.skill
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                } transition-colors`}
              >
                <td className="border border-gray-300 px-4 py-2 font-medium">
                  {skill.skill}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${getImportanceColor(
                        skill.importance
                      )}`}
                    ></div>
                    <span className="text-sm">
                      {getImportanceText(skill.importance)} ({skill.importance}
                      %)
                    </span>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex flex-wrap gap-1">
                    {skill.modules.map((module) => (
                      <span
                        key={module.code}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {module.code}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                  {skill.modules.map((module) => (
                    <div key={module.code} className="mb-1">
                      <span className="font-medium">{module.code}:</span>{" "}
                      {module.description}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="whitespace-nowrap">Critical (90%+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="whitespace-nowrap">Very High (80-89%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="whitespace-nowrap">High (70-79%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="whitespace-nowrap">Medium (60-69%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="whitespace-nowrap">Low (50-59%)</span>
        </div>
      </div>
    </div>
  );
};

export default SkillsMatrixComponent;
