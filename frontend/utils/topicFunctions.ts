interface TopicRelation {
  [courseCode: string]: {
    [topic: string]: string[];
  };
}

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

const topicsToModules = (x: TopicRelation, topics: string[]) => {
  const mainList: string[][] = [];
  let tempList: string[] = [];
  topics.forEach((topic) => {
    Object.entries(x).forEach((entry) => {
      if (Object.keys(entry[1]).includes(topic)) {
        tempList.push(entry[0]);
        entry[1][topic].forEach((withinTopic) => {
          if (!tempList.includes(withinTopic)) {
            tempList.push(withinTopic);
          }
        });
      }
    });
    mainList.push(tempList);
    tempList = [];
  });
  return mainList;
};

export { getTopics, topicsToModules };
