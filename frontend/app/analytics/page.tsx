import React from "react";
import Card from "@/components/Card";
import PieChartComponent from "@/components/PieChartComponent";
import BubbleChartComponent from "@/components/BubbleChartComponent";
import BarChartComponent from "@/components/BarChartComponent";
import TreemapComponent from "@/components/TreemapComponent";
import SkillsMatrixComponent from "@/components/SkillsMatrixComponent";

const Page: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto pt-4 pb-12 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2 mt-10">
          CS Analytics Dashboard
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Comprehensive analysis of your Computer Science curriculum. Explore
          module distributions, internship essentials, and skill hierarchies
          through interactive visualizations.
        </p>
      </header>

      {/* Top Row - Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card
          className="h-full min-h-[500px]"
          title="Module Distribution by Area"
          description="Distribution of modules across different Computer Science specializations. Hover for details."
        >
          <div className="min-h-[480px] flex items-center justify-center">
            <PieChartComponent />
          </div>
        </Card>

        <Card
          className="h-full min-h-[500px]"
          title="CS Internship Essentials"
          description="Key skills and competencies for computer science internships. Bubble size indicates importance."
        >
          <div className="min-h-[480px] flex items-center justify-center">
            <BubbleChartComponent />
          </div>
        </Card>
      </div>

      {/* Middle Row - Comparative Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card
          className="h-full min-h-[450px]"
          title="Module Count by Category"
          description="Bar chart showing the number of modules in each CS specialization area."
        >
          <div className="min-h-[430px] flex items-center justify-center">
            <BarChartComponent />
          </div>
        </Card>

        <Card
          className="h-full min-h-[450px]"
          title="Skill Hierarchy for Internships"
          description="Treemap showing the relative importance of different skills for CS internships."
        >
          <div className="min-h-[430px] flex items-center justify-center">
            <TreemapComponent />
          </div>
        </Card>
      </div>

      {/* Bottom Row - Skills Matrix */}
      <div className="grid grid-cols-1 gap-8">
        <Card
          className="h-full min-h-[450px]"
          title="Skills-Module Matrix"
          description="Detailed breakdown of how each internship skill maps to specific modules."
        >
          <div className="min-h-[430px] p-4">
            <SkillsMatrixComponent />
          </div>
        </Card>
      </div>

      {/* Analytics Insights */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Key Insights
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Algorithms & Programming has the most modules (8)</li>
            <li>• Software Engineering is the top internship skill</li>
            <li>• OOP appears in 5 different modules</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Curriculum Balance
          </h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Well-distributed across 12 areas</li>
            <li>• Strong foundation in core CS</li>
            <li>• Specialized tracks available</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">
            Career Readiness
          </h3>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• 10 essential internship skills covered</li>
            <li>• Modern development practices included</li>
            <li>• Industry-relevant technologies</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
