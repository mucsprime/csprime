import React from "react";
import Card from "@/components/Card";
import PieChartComponent from "@/components/PieChartComponent";
import BubbleChartComponent from "@/components/BubbleChartComponent";
import ModuleConnectionsComponent from "@/components/ModuleConnectionsComponent";

const Page: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto pt-4 pb-12 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2 mt-10">Analytics & Insights</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Visualize your computer science journey. Explore key pillars,
          internship essentials, and module connections with interactive charts
          and graphs.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <Card
          className="h-full min-h-[340px]"
          title="Key CS Pillars"
          description="See the foundational topics and their importance in your degree. Hover over a slice for details."
        >
          <div className="min-h-[320px] flex items-center justify-center">
            <PieChartComponent />
          </div>
        </Card>
        <Card
          className="h-full min-h-[340px]"
          title="CS Internship Essentials"
          description="Explore the skills and topics that matter most for computer science internships."
        >
          <div className="min-h-[320px] flex items-center justify-center">
            <BubbleChartComponent />
          </div>
        </Card>
        <Card
          className="h-full min-h-[340px]"
          title="CS Foundational Connections"
          description="Select a first-year module to see how it unlocks advanced topics."
        >
          <div className="min-h-[320px] flex items-center justify-center">
            <ModuleConnectionsComponent />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;
