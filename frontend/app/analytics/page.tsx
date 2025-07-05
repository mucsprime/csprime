import React from "react";
import Card from "@/components/Card";
import PieChartComponent from "@/components/PieChartComponent";
import BubbleChartComponent from "@/components/BubbleChartComponent";
import ModuleConnectionsComponent from "@/components/ModuleConnectionsComponent";

const Page: React.FC = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <main className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="xl:col-span-2">
            <Card
              title="Key CS Pillars"
              description="Hover over a slice to see the topic, its percentage, and relevant module codes."
            >
              <PieChartComponent />
            </Card>
          </div>
          <div className="xl:col-span-3">
            <Card
              title="CS Internship Essentials"
              description="Illustrates fundamental skills pivotal for thriving in computer science internships."
            >
              <BubbleChartComponent />
            </Card>
          </div>
          <div className="xl:col-span-5">
            <Card
              title="CS Foundational Connections"
              description="Select a first-year module from the dropdown to see how it forms the prerequisite for advanced topics."
            >
              <ModuleConnectionsComponent />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
