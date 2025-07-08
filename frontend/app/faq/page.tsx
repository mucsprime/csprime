"use client";

import React, { useState } from "react";
import {
  SimpleAccordion,
  SimpleAccordionItem,
} from "@/components/ui/accordion";
import Card from "@/components/Card";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    question: "How do I transfer into the CSSE course?",
    answer:
      "To transfer, complete CS161, CS162, CS171, CS172, and Maths modules (MT101SC, MT102SC, MT113SC).",
  },
  {
    question: "Which modules are most valuable for internships?",
    answer:
      "Key modules: CS161, CS162, CS211, CS210, CS280, CS130, CS335, CS353.",
  },
  {
    question: "What topics build my programming foundation?",
    answer:
      "Start with basic programming, then progress to data structures, algorithms, web development, and software design.",
  },
  {
    question: "How do intro CS topics help with advanced modules?",
    answer:
      "Intro modules (CS161, CS162, CS171, CS172) teach fundamentals needed for advanced study.",
  },
  {
    question: "How does mathematics relate to CS modules like graphics?",
    answer:
      "Maths (calculus, algebra) from MT101SC, MT113SC is essential for understanding computer graphics and more.",
  },
  {
    question: "What does CSPrime offer to students?",
    answer:
      "CSPrime shows how first-year topics connect to your full degree and career, highlighting their importance.",
  },
];

const toolbox = [
  { label: "IDEs", items: ["IntelliJ IDEA", "VS Code", "Eclipse"] },
  { label: "Version Control", items: ["Git", "GitHub", "GitLab", "Bitbucket"] },
  { label: "Languages", items: ["Java", "C++", "JavaScript"] },
  { label: "Databases", items: ["MySQL", "MongoDB", "PostgreSQL", "SQLite"] },
  { label: "Web Dev", items: ["HTML", "CSS", "React", "Node.js"] },
  { label: "Collab Tools", items: ["Slack", "Teams", "Trello"] },
  { label: "Containerization", items: ["Docker"] },
];

function Page() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="max-w-4xl mx-auto pt-4 pb-12 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2 mt-10">Resource Center</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Explore essential FAQs, get valuable tips, and access a curated
          toolbox to enhance your CS journey.
        </p>
      </header>
      <div className="flex flex-col md:flex-row gap-8">
        {/* FAQ Section */}
        <section className="w-[490px]">
          <h2 className="text-2xl font-semibold mb-10">
            Frequently Asked Questions
          </h2>
          <SimpleAccordion className="w-[490px]">
            {faqs.map((faq, idx) => (
              <SimpleAccordionItem
                key={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIdx === idx}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-[490px]"
                triggerClassName="w-[490px]"
                contentClassName="w-[490px]"
              />
            ))}
          </SimpleAccordion>
        </section>
        {/* Tips & Toolbox */}
        <div className="flex flex-col gap-6 md:w-[340px]">
          <Card title="Quick Tip" description="Boost your learning">
            <div className="flex items-center gap-2">
              <span className="text-base">
                Review your notes after each class to reinforce learning.
              </span>
              <Badge variant="outline">Tip</Badge>
            </div>
          </Card>
          <Card
            title="CS Toolbox"
            description="Handy resources for CS students"
          >
            <ul className="space-y-2">
              {toolbox.map((section, idx) => (
                <li key={idx}>
                  <span className="font-semibold text-gray-800 mr-2">
                    {section.label}:
                  </span>
                  <span className="text-gray-700 text-sm">
                    {section.items.join(", ")}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
