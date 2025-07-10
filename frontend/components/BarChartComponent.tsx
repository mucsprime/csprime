"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { BarChartData } from "../types";

const barData: BarChartData[] = [
  { name: "Algorithms & Programming", count: 8, color: "#0ea5e9" },
  { name: "Computer Systems", count: 6, color: "#10b981" },
  { name: "Computing & Theory", count: 6, color: "#eab308" },
  { name: "Software Engineering", count: 5, color: "#8b5cf6" },
  { name: "Maths", count: 5, color: "#6366f1" },
  { name: "Experimental/Other", count: 5, color: "#14b8a6" },
  { name: "Artificial Intelligence", count: 2, color: "#f97316" },
  { name: "Computing for Arts", count: 2, color: "#a855f7" },
  { name: "Networking & Security", count: 2, color: "#ef4444" },
  { name: "Robotics & Automation", count: 2, color: "#64748b" },
  { name: "Signal Processing", count: 2, color: "#f43f5e" },
  { name: "Vision & Graphics", count: 2, color: "#ec4899" },
];

const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: Array<{ payload: BarChartData }>;
  label?: string;
}> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-700/80 backdrop-blur-sm p-3 border border-slate-600 rounded-md shadow-lg">
        <p className="text-slate-200 font-semibold">{label}</p>
        <p className="text-slate-400">{`${data.count} modules`}</p>
      </div>
    );
  }
  return null;
};

const BarChartComponent: React.FC = () => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={barData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 12 }}
            stroke="#64748b"
          />
          <YAxis
            stroke="#64748b"
            tick={{ fontSize: 12 }}
            label={{
              value: "Number of Modules",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]}>
            {barData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
