import { useCallback } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  useReactFlow,
  type NodeTypes,
  type EdgeTypes,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import ModelNode from "./ModelNode";
import RelationEdge from "./RelationEdge";
import DiagramToolbar from "./DiagramToolbar";
import MiniMap from "./MiniMap";

import { useDiagramStore } from "../../store/diagramStore";
// import { autoLayout } from "../../graph/autoLayout";

const nodeTypes: NodeTypes = {
  model: ModelNode,
};

const edgeTypes: EdgeTypes = {
  relation: RelationEdge,
};

function CanvasControls() {
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const nodes = useDiagramStore((state) => state.nodes);
  const edges = useDiagramStore((state) => state.edges);
//   const setNodes = useDiagramStore((state) => state.nodes);
  const applyAutoLayout = useDiagramStore((state) => state.applyAutoLayout);

  const layout = useCallback(() => {
    // const layouted = autoLayout(nodes, edges);
    // Layout action is handled by store in the next iteration.
    applyAutoLayout();
  }, [nodes, edges, applyAutoLayout]);

  return (
    <DiagramToolbar
      onAutoLayout={layout}
      onFitView={() => fitView({ padding: 0.2, duration: 300 })}
      onZoomIn={() => zoomIn({ duration: 200 })}
      onZoomOut={() => zoomOut({ duration: 200 })}
    />
  );
}

export default function DiagramCanvas() {
  const nodes = useDiagramStore((state) => state.nodes);
  const edges = useDiagramStore((state) => state.edges);
  const selectModel = useDiagramStore((state) => state.selectModel);

  return (
    <div className="diagram-canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.15}
        maxZoom={2}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable
        onNodeClick={(_, node) => selectModel(node.id)}
        onPaneClick={() => selectModel(null)}
      >
        <Background gap={24} size={1} color="#252b37" />
        <Controls />
        <MiniMap />
        <CanvasControls />
      </ReactFlow>
    </div>
  );
}