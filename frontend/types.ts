import * as d3 from "d3";

export interface PieChartData {
  name: string;
  value: number;
  color: string;
  modules: string[];
}

export interface BubbleChartData {
  name: string;
  value: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  color: string;
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}
