import type { Edge } from "@xyflow/react";
import type { PrismaRelation } from "../parser/types";

export function buildEdges(relations: PrismaRelation[]): Edge[] {
  return relations.map((relation) => ({
    id: relation.id,
    source: relation.source,
    target: relation.target,
    type: "relation",
    label: relation.cardinality,
    data: { ...relation },
  }));
}