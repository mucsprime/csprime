"use client";

import React from "react";
import { Treemap, Tooltip, ResponsiveContainer } from "recharts";

const treemapData = [
  {
    name: "Software Engineering",
    size: 25,
    color: "#22c55e",
  },
  {
    name: "OOP",
    size: 20,
    color: "#3b82f6",
  },
  {
    name: "Web Development",
    size: 15,
    color: "#8b5cf6",
  },
  {
    name: "Database Management",
    size: 12,
    color: "#ec4899",
  },
  {
    name: "Version Control",
    size: 10,
    color: "#f97316",
  },
  {
    name: "Machine Learning",
    size: 8,
    color: "#14b8a6",
  },
  {
    name: "Agile Methodologies",
    size: 6,
    color: "#0ea5e9",
  },
  {
    name: "Software Testing",
    size: 4,
    color: "#6366f1",
  },
];

const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: Array<{ payload: { name: string; size: number } }>;
}> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-700/80 backdrop-blur-sm p-3 border border-slate-600 rounded-md shadow-lg">
        <p className="text-slate-200 font-semibold">{data.name}</p>
      </div>
    );
  }
  return null;
};

const TreemapComponent: React.FC = () => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={treemapData}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};

export default TreemapComponent;
