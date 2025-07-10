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

const tips = [
  "Review your notes after each class to reinforce learning.",
  "Break big problems into smaller, manageable tasks.",
  "Practice coding every day, even if just for 20 minutes.",
  "Ask questions early—don’t wait until you’re stuck!",
  "Use online resources like Stack Overflow and official docs.",
  "Teach a concept to someone else to deepen your understanding.",
  "Join a study group or find a coding buddy.",
  "Work on side projects to apply what you learn.",
  "Keep your code organized and well-commented.",
  "Don’t be afraid to make mistakes—they’re part of learning.",
  "Use version control (like Git) for all your projects.",
  "Take regular breaks to avoid burnout.",
  "Read other people’s code to learn new techniques.",
  "Set specific, achievable goals for each study session.",
  "Stay curious—explore topics outside your curriculum.",
  "Attend workshops, hackathons, or tech meetups.",
  "Keep a list of bugs you’ve solved and how you fixed them.",
  "Use flashcards for memorizing key concepts.",
  "Keep your development environment up to date.",
  "Don’t just memorize—focus on understanding why things work.",
  "Ask for feedback on your code from peers or mentors.",
  "Balance theory with hands-on practice.",
  "Celebrate your progress, no matter how small.",
  "Document your projects and learning journey.",
  "Try to explain complex topics in simple terms.",
  "Use pseudocode to plan before you code.",
  "Stay organized with a calendar or task manager.",
  "Don’t compare your journey to others—everyone learns at their own pace.",
  "Take care of your health: sleep, eat well, and exercise.",
  "Remember: persistence is key to mastering computer science!",
];

function getRandomTip() {
  return tips[Math.floor(Math.random() * tips.length)];
}

function Page() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [tip, setTip] = useState("");

  React.useEffect(() => {
    setTip(getRandomTip());
  }, []);

  return (
    <div className="max-w-4xl mx-auto pt-4 pb-12 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2 mt-10">Resource Center</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Explore essential FAQs, get valuable tips, and access a curated
          toolbox to enhance your CS journey.
        </p>
      </header>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* FAQ Section */}
        <section className="w-full lg:w-[490px]">
          <h2 className="text-2xl font-semibold mb-6 lg:mb-10">
            Frequently Asked Questions
          </h2>
          <SimpleAccordion className="w-full">
            {faqs.map((faq, idx) => (
              <SimpleAccordionItem
                key={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIdx === idx}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full"
                triggerClassName="w-full"
                contentClassName="w-full"
              />
            ))}
          </SimpleAccordion>
        </section>
        {/* Tips & Toolbox */}
        <div className="flex flex-col gap-6 w-full lg:w-[340px]">
          <Card title="Quick Tip" description="Boost your learning">
            <div className="flex items-center gap-2 min-h-[28px]">
              {tip ? (
                <span className="text-base transition-opacity duration-200">
                  {tip}
                </span>
              ) : (
                <span className="text-base text-gray-400 animate-pulse">
                  Loading tip...
                </span>
              )}
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
