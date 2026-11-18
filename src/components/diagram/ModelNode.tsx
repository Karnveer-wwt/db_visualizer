import { memo } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { KeyRound, Fingerprint, Link2, Circle } from "lucide-react";
import type { ModelNodeData } from "../../graph/buildNodes";

function ModelNode({ data, selected }: NodeProps<Node<ModelNodeData>>) {
  const model = data.model;

  return (
    <div className={`model-node ${selected ? "selected" : ""}`}>
      <Handle type="target" position={Position.Left} />

      <div className="model-node-header">
        <div className="model-node-title">
          <span className="table-icon">▤</span>
          {model.name}
        </div>

        <span className="field-count">{model.fields.length}</span>
      </div>

      <div className="model-node-fields">
        {model.fields.map((field) => (
          <div className="model-field" key={field.name}>
            <div className="field-left">
              {field.isId ? (
                <KeyRound size={14} className="primary-icon" />
              ) : field.isUnique ? (
                <Fingerprint size={14} className="unique-icon" />
              ) : field.isRelation ? (
                <Link2 size={14} className="relation-icon" />
              ) : (
                <Circle size={10} className="field-icon" />
              )}

              <span className="field-name">{field.name}</span>
            </div>

            <div className="field-right">
              <span className="field-type">{field.type}</span>
              {field.isList && <span className="modifier">[]</span>}
              {field.isNullable && <span className="modifier">?</span>}
            </div>
          </div>
        ))}
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(ModelNode);