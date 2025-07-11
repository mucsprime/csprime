"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import * as d3 from "d3";
import { BubbleChartData } from "../types";

const bubbleData: BubbleChartData[] = [
  {
    name: "Software Engineering",
    value: 95,
    modules: [
      {
        code: "CS335",
        description:
          "Understanding of various Agile frameworks like Scrum, Software Testing",
      },
      { code: "CS264", description: "Software Design" },
    ],
  },
  {
    name: "OOP",
    value: 90,
    modules: [
      {
        code: "CS162",
        description:
          "Explores advanced Java programming concepts emphasizing OOP, including encapsulation and polymorphism.",
      },
      {
        code: "CS210",
        description:
          "Introduction to data structures and algorithms, focusing on the OOP approach to data abstraction and structure.",
      },
      {
        code: "CS211",
        description:
          "Advanced study of data structures in an OOP context, understanding inheritance and generic programming.",
      },
      {
        code: "CS230",
        description:
          "Covers OOP design for web development, applying principles of encapsulation and abstraction to create modular web applications.",
      },
      {
        code: "CS264",
        description:
          "Detailed OOP software design methodologies, applying inheritance and polymorphism to solve complex design challenges.",
      },
    ],
  },
  {
    name: "Web Development",
    value: 85,
    modules: [{ code: "CS230", description: "Web Information Processing" }],
  },
  {
    name: "Database Management",
    value: 80,
    modules: [
      {
        code: "CS335",
        description:
          "Understanding of various Agile frameworks like Scrum, Kanban.",
      },
      {
        code: "CS130",
        description:
          "Entity-Relationship Diagrams and Relations, SQL functions, Databases:mysql,NoSql",
      },
      { code: "CS230", description: "MongoDB, with html,css and javascript" },
    ],
  },
  {
    name: "Version Control",
    value: 75,
    modules: [
      {
        code: "CS353",
        description:
          "Understanding of various Agile frameworks like Scrum, Kanban.",
      },
      { code: "CS363", description: "Proficiency in using tools like Git." },
      {
        code: "CS430",
        description:
          "The git distributed source control system, and the Unix Tools style of shell programming with small tools and pipes.",
      },
    ],
  },
  {
    name: "Machine Learning",
    value: 70,
    modules: [
      {
        code: "CS401",
        description:
          "Knowledge of machine learning algorithms & neural networks",
      },
    ],
  },
  {
    name: "Agile Methodologies",
    value: 65,
    modules: [
      { code: "CS335", description: "Software Engineering & Software Process" },
      {
        code: "CS280",
        description:
          "Introduction to User Experience (UX), UI and Interaction Design",
      },
    ],
  },
  {
    name: "Software Testing",
    value: 60,
    modules: [
      { code: "CS265", description: "Software Testing" },
      {
        code: "CS335",
        description:
          "Understanding of various Agile frameworks like Scrum, Software Testing",
      },
    ],
  },
  {
    name: "Network Security",
    value: 55,
    modules: [{ code: "CS416", description: "Cryptography" }],
  },
  {
    name: "Project Management",
    value: 50,
    modules: [
      { code: "CS353", description: "Teamwork, Agile and Project Management" },
      { code: "CS363", description: "Industrial Work Placement" },
    ],
  },
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
  const [isLoading, setIsLoading] = useState(true);
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

    // Start with bubbles closer to center to reduce initial chaos
    const angleStep = (2 * Math.PI) / bubbleData.length;
    const processedData = bubbleData.map((d, i) => ({
      ...d,
      x: width / 2 + Math.cos(i * angleStep) * (width * 0.15), // smaller radius
      y: height / 2 + Math.sin(i * angleStep) * (height * 0.15), // smaller radius
    }));

    const radiusScale = d3
      .scaleSqrt()
      .domain([0, d3.max(processedData, (d: BubbleChartData) => d.value)!])
      .range([width * 0.05, width * 0.11]);

    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    simulationRef.current = d3
      .forceSimulation(processedData as d3.SimulationNodeDatum[])
      .alphaDecay(0.15) // faster decay for quicker settling
      .velocityDecay(0.7) // more friction to reduce bouncing
      .force("charge", d3.forceManyBody().strength(1)) // even lower repulsion
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.05)) // weaker centering force
      .force("y", d3.forceY(height / 2).strength(0.05)) // weaker centering force
      .force(
        "collision",
        d3
          .forceCollide()
          .radius((d) => radiusScale((d as BubbleChartData).value) + 8) // more padding
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
        (d3.drag() as any)
          .on(
            "start",
            (
              event: d3.D3DragEvent<SVGGElement, BubbleChartData, unknown>,
              d: BubbleChartData
            ) => {
              if (!event.active)
                simulationRef.current?.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            }
          )
          .on(
            "drag",
            (
              event: d3.D3DragEvent<SVGGElement, BubbleChartData, unknown>,
              d: BubbleChartData
            ) => {
              d.fx = event.x;
              d.fy = event.y;
            }
          )
          .on(
            "end",
            (
              event: d3.D3DragEvent<SVGGElement, BubbleChartData, unknown>,
              d: BubbleChartData
            ) => {
              if (!event.active) simulationRef.current?.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            }
          )
      );

    node
      .append("circle")
      .attr("r", (d: BubbleChartData) => radiusScale(d.value))
      .attr("fill", (d: BubbleChartData, i: number) => colorScale(i.toString()))
      .style("stroke", (d: BubbleChartData, i: number) =>
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
      .style("pointer-events", "none")
      .style(
        "text-shadow",
        "1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)"
      );

    simulationRef.current.on("tick", () => {
      node.attr("transform", (d: BubbleChartData) => {
        // Clamp positions to keep bubbles on screen
        const r = radiusScale(d.value);
        const clampedX = Math.max(r, Math.min(width - r, d.x!));
        const clampedY = Math.max(r, Math.min(height - r, d.y!));
        d.x = clampedX;
        d.y = clampedY;
        return `translate(${clampedX},${clampedY})`;
      });
    });

    // Hide loader after simulation settles
    simulationRef.current.on("end", () => {
      setTimeout(() => setIsLoading(false), 500); // Small delay for smooth transition
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
    <div ref={containerRef} className="w-full h-full min-h-[450px] relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-sm text-gray-600">Loading bubble chart...</p>
          </div>
        </div>
      )}
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BubbleChartComponent;
