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

  console.log(topics);

  const topicsToModules = (x: TopicRelation, topics: string[]) => {
    let mainList = [];
    let tempList = [];
    topics.forEach((topic) => {
      Object.entries(module_topic_relations).forEach((entry) => {
        if (Object.keys(entry[1]).includes(topic)) {
          tempList.push(entry[0]);
          entry[1][topic].forEach((withinTopic) => {
            if (!tempList.includes(withinTopic)) {
              tempList.push(withinTopic);
            }
          });
        }
        console.log(Object.keys(entry[1]));
        console.log(topic);
      });
      mainList.push(tempList);
      tempList = [];
    });
    return mainList;
  };

  const topicToModulesList = topicsToModules(module_topic_relations, topics);

  return (
    <div>
      {topics.map((topic, i) => (
        <div key={topic}>
          {topic}:{" "}
          {topicToModulesList[i].map((innerTopic) => (
            <span>{innerTopic} </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Page;
