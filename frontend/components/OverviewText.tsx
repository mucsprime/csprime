"use client";

import React, { useState } from "react";

interface OverviewTextProps {
  text: string;
}

const OverviewText: React.FC<OverviewTextProps> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > 800;
  const displayText =
    shouldTruncate && !isExpanded ? text.substring(0, 800) + "..." : text;

  if (!shouldTruncate) {
    return <div>{text}</div>;
  }

  return (
    <div>
      <div>{displayText}</div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
      >
        {isExpanded ? "See Less" : "See More"}
      </button>
    </div>
  );
};

export default OverviewText;
