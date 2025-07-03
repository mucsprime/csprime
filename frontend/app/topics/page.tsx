import React from "react";
import module_topic_relations from "../../module_topic_relations.json";
import { getTopics, topicsToModules } from "../../utils/topicFunctions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

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
        <Accordion key={i} type="single" collapsible>
          <AccordionItem value={`item-${i}`}>
            <AccordionTrigger>{topic}</AccordionTrigger>
            <AccordionContent>
              {topicToModulesList[i].map((innerTopic: string, j: number) => (
                <Link key={i + "" + j} href={`/modules/${innerTopic}`}>
                  <span className="ml-2">{innerTopic} </span>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}

export default Page;
