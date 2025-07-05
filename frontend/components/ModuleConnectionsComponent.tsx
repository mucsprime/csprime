"use client";

import React, { useState, useMemo } from "react";
import { GraphNode, GraphLink } from "../types";

const graphData: { nodes: GraphNode[]; links: GraphLink[] } = {
  nodes: [
    // Year 1
    { id: "CS161", group: 1, color: "#ec4899" },
    { id: "CS171", group: 1, color: "#ec4899" },
    { id: "CS162", group: 1, color: "#ec4899" },
    { id: "CS172", group: 1, color: "#ec4899" },
    { id: "MT101SC", group: 1, color: "#ec4899" },
    { id: "MT102SC", group: 1, color: "#ec4899" },
    { id: "MT113SC", group: 1, color: "#ec4899" },
    // Year 2
    { id: "CS210", group: 2, color: "#3b82f6" },
    { id: "CS264", group: 2, color: "#3b82f6" },
    { id: "CS130", group: 2, color: "#3b82f6" },
    { id: "CS355", group: 2, color: "#3b82f6" },
    { id: "CS211", group: 2, color: "#3b82f6" },
    // Year 3
    { id: "CS310", group: 3, color: "#8b5cf6" },
    { id: "CS370", group: 3, color: "#8b5cf6" },
    // Year 4
    { id: "CS401", group: 4, color: "#10b981" },
    { id: "CS404", group: 4, color: "#10b981" },
    { id: "CS422", group: 4, color: "#10b981" },
    { id: "CS410", group: 4, color: "#10b981" },
    { id: "CS356", group: 4, color: "#10b981" },
    { id: "CS417", group: 4, color: "#10b981" },
    { id: "CS425", group: 4, color: "#10b981" },
    { id: "CS426", group: 4, color: "#10b981" },
    { id: "CS416", group: 4, color: "#10b981" },
    { id: "CS423", group: 4, color: "#10b981" },
    { id: "CS434", group: 4, color: "#10b981" },
  ],
  links: [
    { source: "CS162", target: "CS210" },
    { source: "CS161", target: "CS264" },
    { source: "CS161", target: "CS210" },
    { source: "CS161", target: "CS310" },
    { source: "CS162", target: "CS130" },
    { source: "CS162", target: "CS355" },
    { source: "CS171", target: "CS401" },
    { source: "CS171", target: "CS404" },
    { source: "CS171", target: "CS422" },
    { source: "CS171", target: "CS410" },
    { source: "CS171", target: "CS356" },
    { source: "CS171", target: "CS417" },
    { source: "CS171", target: "CS425" },
    { source: "CS171", target: "CS426" },
    { source: "CS171", target: "CS416" },
    { source: "CS171", target: "CS423" },
    { source: "CS162", target: "CS211" },
    { source: "CS162", target: "CS434" },
    { source: "CS161", target: "CS264" },
    { source: "CS172", target: "CS370" },
    { source: "CS172", target: "CS130" },
    { source: "CS172", target: "CS416" },
    { source: "MT113SC", target: "CS426" },
    { source: "MT113SC", target: "CS422" },
    { source: "MT102SC", target: "CS370" },
    { source: "MT101SC", target: "CS310" },
    { source: "MT101SC", target: "CS210" },
    { source: "MT101SC", target: "CS401" },
  ],
};

const ModuleConnectionsComponent: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState("");

  const { firstYearModules, connectionsMap } = useMemo(() => {
    const nodesById = new Map(graphData.nodes.map((node) => [node.id, node]));
    const connections = new Map<string, GraphNode[]>();

    for (const link of graphData.links) {
      const sourceId =
        typeof link.source === "string" ? link.source : link.source.id;
      const targetNode = nodesById.get(
        typeof link.target === "string" ? link.target : link.target.id
      );
      if (!targetNode) continue;

      if (!connections.has(sourceId)) {
        connections.set(sourceId, []);
      }
      // Avoid duplicates
      if (!connections.get(sourceId)!.find((n) => n.id === targetNode.id)) {
        connections.get(sourceId)!.push(targetNode);
      }
    }

    connections.forEach((value) =>
      value.sort((a, b) => a.id.localeCompare(b.id))
    );

    return {
      firstYearModules: graphData.nodes
        .filter((n) => n.group === 1)
        .sort((a, b) => a.id.localeCompare(b.id)),
      connectionsMap: connections,
    };
  }, []);

  const connectionsForSelected = connectionsMap.get(selectedModule) || [];

  return (
    <div className="flex flex-col gap-6 h-full p-2">
      <div>
        <label
          htmlFor="module-select"
          className="block text-sm font-medium mb-2"
        >
          Select a Foundational Module:
        </label>
        <select
          id="module-select"
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
          className="w-full max-w-sm border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
          aria-label="Select a foundational module"
        >
          <option value="">-- Select a module --</option>
          {firstYearModules.map((module) => (
            <option key={module.id} value={module.id}>
              {module.id}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-grow min-h-[300px] rounded-lg p-6 relative border border-slate-700/50">
        {!selectedModule ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-400 text-lg">
              Select a module above to see the advanced courses it unlocks.
            </p>
          </div>
        ) : (
          <div className="transition-opacity duration-500 ease-in-out">
            <h3 className="text-lg font-bold text-sky-400 mb-4">
              <span className="font-mono bg-pink-500/20 text-pink-400 py-1 px-2 rounded-md">
                {selectedModule}
              </span>{" "}
              is a prerequisite for:
            </h3>
            {connectionsForSelected.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {connectionsForSelected.map((conn) => (
                  <div
                    key={conn.id}
                    className="font-mono text-sm py-2 px-4 rounded-full shadow-md border border-slate-600 flex items-center gap-2"
                    style={
                      {
                        "--tw-shadow-color": conn.color,
                        boxShadow: "0 0 8px 0 var(--tw-shadow-color)",
                      } as React.CSSProperties
                    }
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: conn.color }}
                    ></span>
                    {conn.id}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">
                This module is not a direct prerequisite for any of the advanced
                modules listed.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleConnectionsComponent;
