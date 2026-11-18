import dagre from "dagre";
import type { Edge, Node } from "@xyflow/react";

const NODE_WIDTH = 270;
const NODE_HEIGHT = 220;

export function autoLayout(
  nodes: Node[],
  edges: Edge[],
  direction: "LR" | "TB" = "LR",
) {
  const graph = new dagre.graphlib.Graph();

  graph.setDefaultEdgeLabel(() => ({}));
  graph.setGraph({
    rankdir: direction,
    nodesep: 70,
    ranksep: 120,
    marginx: 40,
    marginy: 40,
  });

  nodes.forEach((node) => {
    const height =
      typeof node.style?.height === "number"
        ? node.style.height
        : NODE_HEIGHT;

    graph.setNode(node.id, {
      width: NODE_WIDTH,
      height,
    });
  });

  edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  dagre.layout(graph);

  return nodes.map((node) => {
    const position = graph.node(node.id);

    if (!position) return node;

    return {
      ...node,
      position: {
        x: position.x - NODE_WIDTH / 2,
        y: position.y - position.height / 2,
        },
    };
  });
}