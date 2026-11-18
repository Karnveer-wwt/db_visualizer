import { MiniMap as FlowMiniMap } from "@xyflow/react";

export default function MiniMap() {
  return (
    <FlowMiniMap
      pannable
      zoomable
      nodeColor={(node) =>
        node.selected ? "#4779ef" : "#263449"
      }
      maskColor="rgba(11, 14, 20, 0.75)"
      className="diagram-minimap"
    />
  );
}