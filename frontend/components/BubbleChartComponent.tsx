"use client";

import React, { useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import { BubbleChartData } from "../types";

const bubbleData: BubbleChartData[] = [
  { name: "Software Engineering", value: 95 },
  { name: "Web Development", value: 80 },
  { name: "Machine Learning", value: 78 },
  { name: "OOP", value: 72 },
  { name: "Version Control (Git)", value: 68 },
  { name: "Database Management", value: 65 },
  { name: "Network Security", value: 58 },
  { name: "Software Testing", value: 52 },
  { name: "Agile Methodologies", value: 48 },
  { name: "Project Management", value: 42 },
];

const colors = [
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f97316",
  "#14b8a6",
  "#0ea5e9",
  "#6366f1",
  "#f43f5e",
  "#eab308",
];

const BubbleChartComponent: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<d3.Simulation<
    d3.SimulationNodeDatum,
    undefined
  > | null>(null);

  const drawChart = useCallback(() => {
    if (!svgRef.current || !containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    if (width === 0 || height === 0) return;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    svg.selectAll("*").remove(); // Clear previous render

    const processedData = bubbleData.map((d) => ({ ...d }));

    const radiusScale = d3
      .scaleSqrt()
      .domain([0, d3.max(processedData, (d: BubbleChartData) => d.value)!])
      .range([width * 0.05, width * 0.11]);

    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    simulationRef.current = d3
      .forceSimulation(processedData as d3.SimulationNodeDatum[])
      .force("charge", d3.forceManyBody().strength(20))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force(
        "collision",
        d3.forceCollide().radius((d: any) => radiusScale(d.value) + 5)
      );

    const colorScale = d3.scaleOrdinal<string, string>().range(colors);

    const node = svg
      .selectAll("g.node")
      .data(processedData)
      .enter()
      .append("g")
      .attr("class", "node")
      .style("cursor", "grab")
      .call(
        d3
          .drag<any, any>()
          .on("start", (event: any, d: any) => {
            if (!event.active)
              simulationRef.current?.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event: any, d: any) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event: any, d: any) => {
            if (!event.active) simulationRef.current?.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    node
      .append("circle")
      .attr("r", (d: BubbleChartData) => radiusScale(d.value))
      .attr("fill", (d: any, i: number) => colorScale(i.toString()))
      .style("stroke", (d: any, i: number) =>
        d3.color(colorScale(i.toString()))!.darker(0.5).toString()
      )
      .style("stroke-width", 2);

    node
      .append("text")
      .text((d: BubbleChartData) => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .style(
        "font-size",
        (d: BubbleChartData) => `${Math.max(10, radiusScale(d.value) / 5.5)}px`
      )
      .style("fill", "#fff")
      .style("font-weight", "600")
      .style("pointer-events", "none");

    simulationRef.current.on("tick", () => {
      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(() => drawChart());
    resizeObserver.observe(containerRef.current);

    drawChart(); // Initial draw

    return () => {
      resizeObserver.disconnect();
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [drawChart]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[450px]">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BubbleChartComponent;
