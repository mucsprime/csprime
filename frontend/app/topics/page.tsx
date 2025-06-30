import React from "react";
import module_topic_relations from "../../module_topic_relations.json";
import { getTopics, topicsToModules } from "../../utils/topicFunctions";

function Page() {
  const topics = getTopics(module_topic_relations);

  topics.sort((a, b) => {
    if (a > b) {
      return 1;
    } else {
      return -1;
    }
  });

  const topicToModulesList = topicsToModules(module_topic_relations, topics);

  return (
    <div>
      {topics.map((topic, i) => (
        <div key={topic}>
          {topic}:{" "}
          {topicToModulesList[i].map((innerTopic: string, j: number) => (
            <span key={i + "" + j}>{innerTopic} </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Page;
