"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { getTopics, topicsToModules } from "../../utils/topicFunctions";
import module_topic_relations from "../../module_topic_relations.json";

function Page() {
  const { topics, topicToModulesList } = useMemo(() => {
    const allTopics = getTopics(module_topic_relations);
    allTopics.sort((a, b) => a.localeCompare(b));
    const allTopicModules = topicsToModules(module_topic_relations, allTopics);
    return { topics: allTopics, topicToModulesList: allTopicModules };
  }, []);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleTopicClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    // This is now our single, unified layout container.
    // It's a flex column on mobile and a grid on desktop.
    <div className="w-full max-w-[1100px] p-4 md:p-6 md:grid md:grid-cols-12 md:gap-8">
      {/* --- COLUMN 1 / MOBILE ACCORDION WRAPPER --- */}
      {/* This acts as the left column on desktop. */}
      <div className="md:col-span-4 lg:col-span-3">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">All Topics</h2>

        {/* On desktop, this div provides scrolling. On mobile, it's just a container. */}
        <div className="md:max-h-[75vh] md:overflow-y-auto md:pr-4">
          <ul className="flex flex-col gap-2">
            {topics.map((topic, i) => (
              <li
                key={i}
                // On mobile, this li acts as a container for the accordion item.
                className="border md:border-0 border-gray-300 rounded-lg md:rounded-md overflow-hidden"
              >
                {/* Clickable Trigger Area */}
                <div
                  onClick={() => handleTopicClick(i)}
                  className={`p-4 md:p-2.5 font-medium cursor-pointer transition-all duration-200 ${
                    selectedIndex === i
                      ? "bg-black text-white md:shadow-md"
                      : "bg-gray-50 hover:bg-gray-100 md:bg-transparent md:hover:bg-gray-100 md:hover:translate-x-1"
                  }`}
                >
                  {topic}
                </div>

                {/* --- MOBILE ONLY EXPANDABLE CONTENT --- */}
                {/* This block is only visible on mobile (hidden from 'md' up) and when selected */}
                <div
                  className={`${
                    selectedIndex === i ? "block" : "hidden"
                  } md:hidden`}
                >
                  <div className="p-4 border-t border-gray-300 bg-white">
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">
                      Related Modules
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {topicToModulesList[i].map(
                        (moduleCode: string, j: number) => (
                          <Link
                            key={`${i}-${j}`}
                            href={`/modules/${moduleCode}`}
                            className="bg-gray-100 text-gray-800 p-2 px-3 rounded-md font-mono text-sm"
                          >
                            {moduleCode}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- COLUMN 2 / DESKTOP-ONLY DETAILS PANEL --- */}
      {/* This entire column is hidden on mobile and appears on desktop */}
      <div className="hidden md:block md:col-span-8 lg:col-span-9">
        {selectedIndex === null ? (
          // Placeholder view when no topic is selected
          <div className="flex items-center justify-center h-full min-h-[300px] bg-gray-50 rounded-lg border-2 border-dashed">
            <p className="text-gray-500 text-lg font-medium text-center p-4">
              Select a topic to see related modules.
            </p>
          </div>
        ) : (
          // Detailed view for the selected topic
          <div className="p-6 bg-white rounded-lg border border-gray-300">
            <h3 className="text-3xl font-semibold mb-2">
              {topics[selectedIndex]}
            </h3>
            <p className="text-gray-600 mb-8">
              The following modules are related to the "{topics[selectedIndex]}"
              topic.
            </p>
            <h4 className="text-xl font-semibold mb-4 text-gray-800">
              Related Modules
            </h4>
            <div className="flex flex-wrap gap-3">
              {topicToModulesList[selectedIndex].map(
                (moduleCode: string, j: number) => (
                  <Link
                    key={`${selectedIndex}-${j}`}
                    href={`/modules/${moduleCode}`}
                    className="bg-gray-100 text-gray-800 p-2 px-4 rounded-lg font-mono font-semibold hover:bg-gray-200 hover:scale-105 transition-all duration-200"
                  >
                    {moduleCode}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
