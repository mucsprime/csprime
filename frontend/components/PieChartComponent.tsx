"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChartData } from "../types";

const pieData: PieChartData[] = [
  {
    name: "Algorithms and Programming",
    value: 8,
    color: "#0ea5e9",
    modules: [
      "CS161",
      "CS162",
      "CS130",
      "CS210",
      "CS230",
      "CS211",
      "CS310",
      "CS424",
    ],
  },
  {
    name: "Computer Systems",
    value: 6,
    color: "#10b981",
    modules: ["CS171", "CS172", "CS220", "CS240", "CS433", "CS402"],
  },
  {
    name: "Computing and Theory",
    value: 6,
    color: "#eab308",
    modules: ["CS355", "CS370", "CS430", "CS417", "CS431", "CS434"],
  },
  {
    name: "Experimental or Other",
    value: 5,
    color: "#14b8a6",
    modules: ["CS353", "CS362", "CS363", "MP472", "CS440"],
  },
  {
    name: "Maths",
    value: 5,
    color: "#6366f1",
    modules: ["MT101SC", "MT102SC", "MT113SC", "MT201A", "ST221"],
  },
  {
    name: "Software Engineering",
    value: 5,
    color: "#8b5cf6",
    modules: ["CS265", "CS280", "CS335", "CS264", "CS357"],
  },
  {
    name: "Artificial Intelligence",
    value: 2,
    color: "#f97316",
    modules: ["CS401", "CS404"],
  },
  {
    name: "Computing for the Arts",
    value: 2,
    color: "#a855f7",
    modules: ["CS322", "CS423"],
  },
  {
    name: "Networking and Security",
    value: 2,
    color: "#ef4444",
    modules: ["CS320", "CS416"],
  },
  {
    name: "Robotics and Automation",
    value: 2,
    color: "#64748b",
    modules: ["CS422", "CS427"],
  },
  {
    name: "Signal Processing",
    value: 2,
    color: "#f43f5e",
    modules: ["CS356", "CS425"],
  },
  {
    name: "Vision and Graphics",
    value: 2,
    color: "#ec4899",
    modules: ["CS410", "CS426"],
  },
];

const totalValue = pieData.reduce((acc, entry) => acc + entry.value, 0);

const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: Array<{ payload: PieChartData }>;
}> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = ((data.value / totalValue) * 100).toFixed(0);
    return (
      <div className="bg-slate-700/80 backdrop-blur-sm p-3 border border-slate-600 rounded-md shadow-lg">
        <p className="text-slate-200 font-semibold">{`${data.name} (${percentage}%)`}</p>
        <p className="text-slate-400 text-xs mt-1">{`Modules: ${data.modules.join(
          ", "
        )}`}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend: React.FC<{
  payload?: Array<{ value: string; color: string }>;
}> = (props) => {
  const { payload } = props;
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 mt-4 text-sm">
      {payload?.map((entry, index: number) => {
        const dataItem = pieData.find((item) => item.name === entry.value);
        if (!dataItem) return null;
        const percentage = ((dataItem.value / totalValue) * 100).toFixed(0);
        return (
          <li
            key={`item-${index}`}
            className="flex items-center space-x-2"
            title={`${entry.value} (${percentage}%)`}
          >
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-slate-700 truncate min-w-0 flex-1">
              {entry.value}
            </span>
            <span className="text-slate-500 text-xs flex-shrink-0">
              ({percentage}%)
            </span>
          </li>
        );
      })}
    </ul>
  );
};

const PieChartComponent: React.FC = () => {
  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
          />
          <Pie
            data={pieData}
            cx="50%"
            cy="45%"
            labelLine={false}
            outerRadius="75%"
            fill="#8884d8"
            dataKey="value"
            stroke="none"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ bottom: 0, width: "100%", paddingBottom: "10px" }}
            content={<CustomLegend />}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
