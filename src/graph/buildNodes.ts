import type { PrismaModel } from "../parser/types";
import type { Node } from "@xyflow/react";

export type ModelNodeData = {
  model: PrismaModel;
  label: string;
};

export function buildNodes(models: PrismaModel[]): Node<ModelNodeData>[] {
  return models.map((model) => ({
    id: model.name,
    type: "model",
    position: { x: 0, y: 0 },
    data: {
      model,
      label: model.name,
    },
  }));
}