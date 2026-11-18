import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from "@xyflow/react";

export default function RelationEdge(props: EdgeProps) {
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition,
    targetPosition: props.targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={path}
        id={props.id}
        style={{
          stroke: props.selected ? "#8baaff" : "#64748b",
          strokeWidth: props.selected ? 2 : 1.5,
        }}
      />

      {props.label && (
        <EdgeLabelRenderer>
          <div
            className="relation-label nodrag nopan"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            }}
          >
            {props.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}