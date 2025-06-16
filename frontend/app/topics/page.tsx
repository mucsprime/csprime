import React from "react";
import module_topic_relations from "../../public/module_topic_relations.json";

interface TopicRelation {
  [courseCode: string]: {
    [topic: string]: string[];
  };
}

function Page() {
  const getTopics = (x: TopicRelation) => {
    const topics: string[] = [];
    Object.entries(x).forEach((entry) => {
      Object.entries(entry[1]).forEach((y) => {
        console.log(y);
        if (!topics.includes(y[0])) {
          topics.push(y[0]);
        }
      });
    });
    return topics;
  };

  const topics = getTopics(module_topic_relations);

  topics.sort((a, b) => {
    if (a > b) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <div>
      {topics.map((topic) => (
        <div key={topic}>{topic}</div>
      ))}
    </div>
  );
}

export default Page;
