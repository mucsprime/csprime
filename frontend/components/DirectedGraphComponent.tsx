"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
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

const DirectedGraphComponent: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const width = svgRef.current.parentElement?.clientWidth || 800;
    const height = 500;
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`);

    svg.selectAll("*").remove(); // Clear previous render

    const simulation = d3
      .forceSimulation(graphData.nodes)
      .force(
        "link",
        d3
          .forceLink<GraphNode, GraphLink>(graphData.links)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    svg
      .append("defs")
      .selectAll("marker")
      .data(["end"])
      .enter()
      .append("marker")
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 22)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#9ca3af");

    const link = svg
      .append("g")
      .attr("stroke", "#4b5563")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(graphData.links)
      .join("line")
      .attr("stroke-width", 1.5)
      .attr("marker-end", "url(#end)");

    const node = svg
      .append("g")
      .selectAll("g")
      .data(graphData.nodes)
      .enter()
      .append("g")
      .call(
        d3
          .drag<SVGGElement, GraphNode, unknown>()
          .on(
            "start",
            (
              event: d3.D3DragEvent<SVGGElement, GraphNode, unknown>,
              d: GraphNode
            ) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            }
          )
          .on(
            "drag",
            (
              event: d3.D3DragEvent<SVGGElement, GraphNode, unknown>,
              d: GraphNode
            ) => {
              d.fx = event.x;
              d.fy = event.y;
            }
          )
          .on(
            "end",
            (
              event: d3.D3DragEvent<SVGGElement, GraphNode, unknown>,
              d: GraphNode
            ) => {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            }
          )
      );

    node
      .append("circle")
      .attr("r", 15)
      .attr("fill", (d) => d.color)
      .attr("stroke", "#1f2937")
      .attr("stroke-width", 2.5);

    node
      .append("text")
      .text((d) => d.id)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("fill", "white")
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .style("pointer-events", "none");

    const linkedByIndex: { [key: string]: number } = {};
    graphData.links.forEach((d) => {
      linkedByIndex[`${d.source as string},${d.target as string}`] = 1;
    });

    function isConnected(a: GraphNode, b: GraphNode) {
      return (
        linkedByIndex[`${a.id},${b.id}`] ||
        linkedByIndex[`${b.id},${a.id}`] ||
        a.id === b.id
      );
    }

    node.on("mouseover.fade", (event, d) => {
      if (d.group !== 1) return; // Only trigger for year 1 nodes

      node.style("opacity", (o) => (isConnected(d, o) ? 1 : 0.2));
      link
        .style("stroke-opacity", (o) =>
          (o.source as GraphNode).id === d.id ||
          (o.target as GraphNode).id === d.id
            ? 1
            : 0.1
        )
        .style("stroke", (o) =>
          (o.source as GraphNode).id === d.id ||
          (o.target as GraphNode).id === d.id
            ? "#a78bfa"
            : "#4b5563"
        );
    });

    node.on("mouseout.fade", () => {
      node.style("opacity", 1);
      link.style("stroke-opacity", 0.6).style("stroke", "#4b5563");
    });

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as GraphNode).x!)
        .attr("y1", (d) => (d.source as GraphNode).y!)
        .attr("x2", (d) => (d.target as GraphNode).x!)
        .attr("y2", (d) => (d.target as GraphNode).y!);
      node.attr("transform", (d) => `translate(${d.x!},${d.y!})`);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return <svg ref={svgRef} className="w-full h-full min-h-[500px]"></svg>;
};

export default DirectedGraphComponent;
