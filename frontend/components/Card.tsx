"use client";

import React from "react";

interface CardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div
      className={`rounded-xl shadow-lg shadow-slate-950/20 border-gray-200 border-1 h-full flex flex-col ${
        className ?? ""
      }`}
    >
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-gray-700 mt-1">{description}</p>
      </div>
      <div className="p-4 sm:p-6 flex-grow relative">{children}</div>
    </div>
  );
};

export default Card;
